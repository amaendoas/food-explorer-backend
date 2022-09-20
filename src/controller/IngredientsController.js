const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class IngredientsController {

  async index(req, res) {
    const ingredients = await knex('ingredients');

    if(ingredients.length === 0) {
      throw new AppError("Nenhum ingrediente cadastrado!")
    }

    return res.json(ingredients)
  }

  async update(req, res) {
    const { name } = req.body
    const { id } = req.params

    const ingredient = await knex('ingredients').where({id});

    if(!name) {
      throw new AppError("Digite o nome do ingrediente")
    }

    if(ingredient.length === 0) {
      throw new AppError("Ingrediente não encontrado!")
    }

    try {
    await knex('ingredients').update({
      name,
    }).where({id})
    } catch {
      throw new AppError("Não foi possível cadastrar")
    }

    return res.json()

  }

  async delete(req, res) {
    const { id } = req.params

    const ingredient = await knex('ingredients').where({id});

    if(ingredient.length === 0) {
      throw new AppError("Ingrediente não encontrado!")
    }

    try {
      await knex('ingredients').where({id}).del()
    } catch {
      throw new AppError("Não foi possível cadastrar")
    }

    return res.json()
  }
}

module.exports = IngredientsController