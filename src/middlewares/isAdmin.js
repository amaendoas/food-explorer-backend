const knex = require('../database/knex')
const AppError = require('../utils/AppError')

async function isAdmin(req, res, next) {
  const user_id = req.user.id

  const [user] = await knex('users').where({ id: user_id })

  if (!user.isAdmin) {
    throw new AppError('Usuário não autorizado, por favor faça login como administrador', 401)
  }

  return next()
}

module.exports = isAdmin
