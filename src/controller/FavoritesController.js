const knex = require('../database/knex');
const AppError = require('../utils/AppError')

class FavoritesController {

  async create(req, res) {
    const { dish_id } = req.body;
    const user_id = req.user.id;

    const [user] = await knex('users').where({ id: user_id })
    const [dish] = await knex('dishes').where({ id: dish_id })
    const favorites = await knex('favorites').where({ dish_id })

    if(favorites.length !== 0) {
      throw new AppError('O prato adicionado já é favorito')
    }

    if(user.isAdmin) {
      throw new AppError("O usuário Administrador não pode ter favoritos")
    }

    if(!dish) {
      throw new AppError("Prato não encontrado!")
    }

      await knex('favorites').insert({
        dish_id,
        user_id
      })
      const newFav = await knex('favorites').where({dish_id,
        user_id})

    res.json(newFav)
  }

  async show(req, res) {
    const user_id = req.user.id
    const favs = await knex('favorites').where({ user_id })

    return res.json(favs)
  }

  async delete(req, res) {
    const { dish_id } = req.params;
    const user_id = req.user.id;
    await knex('favorites').where({ dish_id, user_id }).delete()

    const newFavs = await knex('favorites').where({user_id})

    return res.json(newFavs)
  }
}

module.exports = FavoritesController