const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UserController');
const DriverController = require('./controllers/DriverController');
const DeliveryController = require('./controllers/DeliveryController');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();
const uploads = multer(uploadConfig);

routes.get('/drivers', DriverController.listAll);
routes.post('/driver', DriverController.listData);
routes.post('/drivers', uploads.single('driverphoto'), DriverController.store);
routes.put('/driverPhoto', uploads.single('driverphoto'), DriverController.updateDriverPhoto);
routes.put('/drivers', DriverController.updateDriver);


routes.get('/users', UserController.listAll);
routes.post('/user', UserController.listData);
routes.post('/users', uploads.single('userphoto'), UserController.store);
routes.put('/users', UserController.updateUser);
routes.put('/userPhoto',  uploads.single('userphoto'), UserController.updateUserPhoto);


routes.post('/delivery', DeliveryController.store);
routes.get('/deliveries', DeliveryController.listAll);
routes.put('/delivery', DeliveryController.update);
routes.post('/user/deliveries', DeliveryController.listDelivery);
routes.post('/rate', DeliveryController.setCommentRate);
routes.post('/user/rate', DeliveryController.getCommentRate);


routes.post('/login', AuthController.Login);
routes.post('/driverlogin', AuthController.LoginDriver);
routes.post('/checkEmail', AuthController.checkEmail);
routes.post('/forgot', AuthController.forgot);
routes.post('/reset', AuthController.reset);


module.exports = routes;
