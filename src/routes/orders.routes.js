const { Router } = require("express");
const OrdersController = require("../controller/OrdersController");

const ordersRoutes = Router();
const ordersController = new OrdersController;

ordersRoutes.post("/:id", ordersController.create)
ordersRoutes.patch("/:id", ordersController.updateStatus)
ordersRoutes.put("/:id", ordersController.update)
ordersRoutes.delete("/:id", ordersController.delete)

module.exports = ordersRoutes