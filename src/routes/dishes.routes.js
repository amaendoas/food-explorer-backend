const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const DishesController = require('../controller/DishesController')
const DishesImageController = require("../controller/DishesImageController")

const authentication = require('../middlewares/authentication')
const isAdmin = require('../middlewares/isAdmin')

const dishesRoutes = Router()
const dishesController = new DishesController()
const dishesImageController = new DishesImageController()

const upload = multer(uploadConfig.MULTER)

dishesRoutes.use(authentication)

dishesRoutes.post('/', isAdmin, dishesController.create)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.put('/:id', isAdmin, dishesController.update)
dishesRoutes.delete('/:id', isAdmin, dishesController.delete)
dishesRoutes.patch('/image/:id', isAdmin, upload.single('image'), dishesImageController.update)

module.exports = dishesRoutes
