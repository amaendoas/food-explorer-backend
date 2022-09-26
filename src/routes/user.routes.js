const { Router } = require("express");
const UsersController = require("../controller/UsersController");
const authentication = require("../middlewares/authentication")

const usersRoutes = Router();
const usersController = new UsersController;

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", authentication,  usersController.update)
usersRoutes.delete("/:id", usersController.delete)

module.exports = usersRoutes