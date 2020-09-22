const connection = require('../database/connection');

module.exports = {

  //insert
  async store(req, res) {
    const { filename } = req.file;
    const { first_name, last_name, email, password, phone, document, number_stars, push_id } = req.body;

    console.log('tentando criar conta de motorista');

    try {
      const response = await connection('drivers').insert({
        first_name,
        last_name,
        email,
        phone,
        document,
        number_stars,
        push_id,
        password,
        avatar_path: filename
      });

      console.log(response)

      return res.send(response);

    }
    catch (error) {
      return res.send(error)
    }
  },

  async listAll(req, res) {

    try {
      const response = await connection('drivers').select('*');
      return res.send({ response: response });
    }
    catch (error) {
      return res.send(error)
    }
  },

  async listData(req, res) {
    const { driver_id } = req.body;

    try {
      const response = await connection('drivers').where({ id: driver_id }).select('*');
      if (response.length > 0) {
        return res.send({ response, messageCode: '200' });
      }
      return res.send({ message: 'Motorista não encontrado', messageCode: '404' });
    }
    catch (error) {
      return res.send(error)
    }

  },


  async updateDriver(req, res) {
    const { driverData } = req.body;


    try {
      const response = await connection('drivers').where({ id: driverData.id }).update(driverData);

      console.log(response)
      if (response === 1) {
        const newData = await connection('drivers').where({ id: driverData.id }).select('*');

        return res.send({ message: 'Dados atualizados com sucesso', response: newData, messageCode: '200' });

      }
      return res.send({ message: 'Erro ao atualizar dados', messageCode: '500' });
    }
    catch (error) {
      return res.send(error)
    }

  },


  async updateDriverPhoto(req, res) {
    const { filename } = req.file;
    const { id } = req.body;
    console.log('imagem do driver aqui')


    try {
      const response = await connection('drivers').where({ id: id }).update({ avatar_path: filename });

      console.log('====resultado de tentar salvar no banco')
      console.log(response)
      if (response === 1) {
        const newData = await connection('drivers').where({ id: id }).select('*');

        return res.send(newData);

      }
      return res.send({ message: 'Erro ao atualizar dados' });
    }
    catch (error) {
      console.log('====erro ao tentar salvar imagem no banco de dados.')
      console.log(error)
      return res.send(error)
    }

  },


}