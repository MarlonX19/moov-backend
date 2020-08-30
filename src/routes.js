const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UserController');
const DriverController = require('./controllers/DriverController');
const DeliveryController = require('./controllers/DeliveryController');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();
const uploads = multer(uploadConfig);


routes.get('/users', UserController.listAll);
routes.get('/user', UserController.listData);
routes.post('/users', uploads.single('userphoto'), UserController.store);
routes.put('/users', UserController.updateUser);


routes.get('/drivers', DriverController.listAll);
routes.get('/driver', DriverController.listData);
routes.post('/drivers', uploads.single('driverphoto'), DriverController.store);


routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries', DeliveryController.listAll);
routes.get('/delivery', DeliveryController.listConsult);


routes.post('/login', AuthController.Login);
routes.post('/checkEmail', AuthController.checkEmail);


module.exports = routes;
