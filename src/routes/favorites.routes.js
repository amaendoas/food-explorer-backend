const { Router } = require('express');

const FavoritesController = require('../controller/FavoritesController')
const authentication = require('../middlewares/authentication')

const favoritesRoutes = Router();
const favoritesController = new FavoritesController();

favoritesRoutes.use(authentication)

favoritesRoutes.post('/', favoritesController.create)

module.exports = favoritesRoutes
