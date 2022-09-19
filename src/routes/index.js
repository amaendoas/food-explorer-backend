const { Router } = require("express")

const routes = Router();
const usersRoutes = require("./user.routes");
const dishesRoutes = require("./dishes.routes")
const ingredientsRoutes = require("./ingredients.routes")

routes.use("/users", usersRoutes)
routes.use("/dishes", dishesRoutes)
routes.use("/ingredients", ingredientsRoutes)

module.exports = routes;