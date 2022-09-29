const { Router } = require("express");
const DishesController = require("../controller/DishesController");
const authentication = require('../middlewares/authentication')

const dishesRoutes = Router();
const dishesController = new DishesController;

dishesRoutes.post("/", authentication, dishesController.create)
dishesRoutes.get("/:id", dishesController.show)
dishesRoutes.get("/", dishesController.index)
dishesRoutes.put("/:id", authentication, dishesController.update)
dishesRoutes.delete("/:id", authentication, dishesController.delete)

module.exports = dishesRoutes
