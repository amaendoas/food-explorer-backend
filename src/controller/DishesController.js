const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(req, res) {
    const { name, description, price, ingredients } = req.body;

    //continuar depois

  }
}

module.exports = DishesController