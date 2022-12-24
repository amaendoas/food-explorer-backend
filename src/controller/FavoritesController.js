const knex = require('../database/knex');
const AppError = require('../utils/AppError')

class FavoritesController {

  async create(req, res) {
    const { dish_id } = req.body;
    const user_id = req.user.id;

    const [user] = await knex('users').where({ id: user_id })
    const [dish] = await knex('dishes').where({ id: dish_id })

    if(user.isAdmin) {
      throw new AppError("O usuário Administrador não pode ter favoritos")
    }

    if(!dish) {
      throw new AppError("Prato não encontrado!")
    }

    try {
      await knex('favorites').insert({
        dish_id,
        user_id
      })
    } catch {
      throw new AppError('Não foi possível adicionar esse prato aos seus favoritos, tente novamente mais tarde')
    }

    res.json()
  }
}

module.exports = FavoritesController