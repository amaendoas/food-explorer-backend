const { Router } = require("express")

const routes = Router();
const usersRoutes = require("./user.routes");

routes.use("/users", usersRoutes)

module.exports = routes;