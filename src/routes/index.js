const { Router } = require("express")

const routes = Router();
const usersRoutes = require("./user.routes");
const dishesRoutes = require("./dishes.routes")
const ingredientsRoutes = require("./ingredients.routes")
const ordersRoutes = require("./orders.routes")
const sessionRoutes = require('./session.routes')

routes.use("/users", usersRoutes)
routes.use("/session", sessionRoutes)
routes.use("/dishes", dishesRoutes)
routes.use("/ingredients", ingredientsRoutes)
routes.use("/orders", ordersRoutes)

module.exports = routes;