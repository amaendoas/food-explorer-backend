const { Router } = require('express')
const IngredientsController = require('../controller/IngredientsController')

const ingredientsRoutes = Router()
const ingredientsController = new IngredientsController()

ingredientsRoutes.get('/', ingredientsController.index)
ingredientsRoutes.get('/:id', ingredientsController.show)

module.exports = ingredientsRoutes
