const { Router } = require("express");
const IngredientsController = require("../controller/IngredientsController");

const ingredientsRoutes = Router();
const ingredientsController = new IngredientsController;

ingredientsRoutes.post("/", ingredientsController.create)
ingredientsRoutes.get("/", ingredientsController.index)
ingredientsRoutes.put("/:id", ingredientsController.update)
ingredientsRoutes.delete("/:id", ingredientsController.delete)

module.exports = ingredientsRoutes