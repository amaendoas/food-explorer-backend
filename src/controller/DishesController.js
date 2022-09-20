const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(req, res) {
    const { name, description, price, ingredients } = req.body;

    if(!name) {
      throw new AppError("Escolha um nome para o prato!")
    }
    if(!description) {
      throw new AppError("Adicione uma descrição.")
    }
    if(!price) {
      throw new AppError("o preço é obrigatório!")
    }

    try {
      const dish_id = await knex("dishes").insert({
        name,
        description,
        price
      })

      const IngredientsInsert = ingredients.map(ingredient => {
        return {
          name: ingredient,
          dish_id
        }
      })

      await knex("ingredients").insert(IngredientsInsert)

    } catch {
      throw new AppError("Não foi possível cadastrar!")
    }

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params;
    const dish = await knex('dishes').where({id});

    if(dish.length === 0) {
      throw new AppError("Prato não encontrado!")
    };

    return res.json(dish)
  }

  async index(req, res) {
    const dishes = await knex('dishes');

    if(dishes.length === 0) {
      throw new AppError("Nenhum prato cadastrado!")
    };

    return res.json(dishes)
  }

  async update(req, res) {
    const { name, description, price, ingredients } = req.body;
    const { id } = req.params;

    try {
      await knex("dishes").update({
        name,
        description,
        price
      }).where({id})

      await knex("ingredients").where({dish_id: id}).del()

      const IngredientsUpdate = ingredients.map(ingredient => {
        return {
          name: ingredient,
          dish_id: id
        }
      })

      await knex("ingredients").insert(IngredientsUpdate).where({dish_id: id})

    } catch {
      throw new AppError("Não foi possível atualizar!")
    }

    return res.json()
  }
}

module.exports = DishesController