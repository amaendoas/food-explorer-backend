const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class DishesController {
  async create(req, res) {
    const { name, description, price, ingredients, category } = req.body

    if (!name) {
      throw new AppError('Escolha um nome para o prato!')
    }
    if (!description) {
      throw new AppError('Adicione uma descrição.')
    }
    if (!price) {
      throw new AppError('O preço é obrigatório!')
    }
    if(!category) {
      throw new AppError('A categoria é obrigatória!')
    }
    if(ingredients.length === 0) {
      throw new AppError('Os ingredientes são obrigatórios')
    }
      const dish_id = await knex('dishes').insert({
        name,
        description,
        price,
        category
      })

      const IngredientsInsert = ingredients.map(ingredient => {
        return {
          name: ingredient,
          dish_id
        }
      })
      
    await knex('ingredients').insert(IngredientsInsert)

    const dish = await knex('dishes').where({id: dish_id})

    return res.status(201).json(dish)
  }

  async show(req, res) {
    const { id } = req.params
    const [dish] = await knex('dishes').where({ id })

    if (!dish) {
      throw new AppError('Prato não encontrado!')
    }

    return res.json(dish)
  }

  async index(req, res) {
    const { name } = req.query
    const dishes = await knex('dishes').whereLike("name", `%${name}%` )

    if (!dishes) {
      throw new AppError('Nenhum prato cadastrado!')
    }

    return res.json(dishes)
  }

  async update(req, res) {
    const { name, description, price, ingredients } = req.body
    const { id } = req.params

    const [dishes] = await knex('dishes').where({ id })

    if (!dishes) {
      throw new AppError('Prato não encontrado')
    }
    
      await knex('dishes')
        .update({
          name,
          description,
          price
        })
        .where({ id })

      await knex('ingredients').where({ dish_id: id }).del()

      const IngredientsUpdate = ingredients.map(ingredient => {
        return {
          name: ingredient,
          dish_id: id
        }
      })
      
      await knex('ingredients').insert(IngredientsUpdate).where({ dish_id: id })

    return res.json()
  }

  async delete(req, res) {
    const { id } = req.params
    const [dishes] = await knex('dishes').where({ id })

    if (!dishes) {
      throw new AppError('Prato não encontrado')
    }
    await knex('dishes').where({ id }).delete()
    await knex('ingredients').where({ dish_id: id }).delete()

    return res.json()
  }
}

module.exports = DishesController
