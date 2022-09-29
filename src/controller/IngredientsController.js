const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class IngredientsController {

  async index(req, res) {
    const ingredients = await knex('ingredients');

    if(ingredients.length === 0) {
      throw new AppError("Nenhum ingrediente encontrado!")
    }

    return res.json(ingredients)
  }

  async show(req, res ){
    const { id } = req.params;
    const ingredients = await knex('ingredients').where({dish_id: id});

    if(ingredients.length === 0) {
      throw new AppError("Nenhum ingrediente encontrado!")
    }

    return res.json(ingredients)
  }
}

module.exports = IngredientsController