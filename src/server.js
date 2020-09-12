const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, 'files')));
app.use(routes);

const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Namespaces
const usuarios = io.of('/usuarios');
const motoristas = io.of('/motoristas');


usuarios.on('connection', (socket) => {
  console.log('a user connected to usuarios');

  socket.on('continue', (data) => {
    motoristas.emit('hello', data)
  })

  usuarios.emit('connected', socket.client.conn.server.clientsCount)

});


motoristas.on('connection', (socket) => {
  console.log('a user connected to motoristas');
  const newNamespace = socket.nsp;

  newNamespace.emit('connected', socket.client.conn.server.clientsCount)
  //io.emit('connected', socket.client.conn.server.clientsCount)


  socket.on('accepted', (data) => {
    motoristas.emit('accepted', data)
  })

  socket.on('watchedPosition', (data) => {
    motoristas.emit('watchedPosition', data)
  })
});



http.listen(process.env.PORT || 3000, function () {
  console.log('Backend Moov is listening!');
});
