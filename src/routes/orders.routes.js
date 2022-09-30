const { Router } = require('express')
const OrdersController = require('../controller/OrdersController')
const authentication = require('../middlewares/authentication')
const isAdmin = require('../middlewares/isAdmin')

const ordersRoutes = Router()
const ordersController = new OrdersController()

ordersRoutes.use(authentication)

ordersRoutes.post('/', ordersController.create)
ordersRoutes.patch('/:code', isAdmin, ordersController.updateStatus)
ordersRoutes.put('/:code', isAdmin, ordersController.update)
ordersRoutes.delete('/:code', isAdmin, ordersController.delete)

module.exports = ordersRoutes
