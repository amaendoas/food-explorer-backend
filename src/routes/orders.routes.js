const { Router } = require("express");
const OrdersController = require("../controller/OrdersController");
const authentication = require('../middlewares/authentication');

const ordersRoutes = Router();
const ordersController = new OrdersController;

ordersRoutes.post("/", authentication, ordersController.create)
ordersRoutes.patch("/:code", authentication, ordersController.updateStatus)
ordersRoutes.put("/:code", authentication, ordersController.update)
ordersRoutes.delete("/:code", authentication, ordersController.delete)

module.exports = ordersRoutes