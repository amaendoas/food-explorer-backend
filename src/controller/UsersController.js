const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { hash, compare } = require('bcryptjs');

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body
    const hashedPassword = await hash(password, 8)

    const checkUserExists = await knex('users').where({ email })

    if(!name || !email || !password) {
      throw new AppError('Preencha dos os campos!')
    }

    if (checkUserExists.length !== 0) {
      throw new AppError('Este e-mail já está em uso')
    }

    if(password.length < 6) {
      throw new AppError('A senha tem que conter pelo menos 6 caracteres')
    }

      await knex('users').insert({
        name,
        email,
        password: hashedPassword
      })

    res.status(201).json()
  }

  async update(req, res) {
    const { name, email, old_password, password, favorites } = req.body
    const user_id = req.user.id

    const [user] = await knex('users').where({ id: user_id })

    if (!user) {
      throw new AppError('Usuário não encontrado!')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.favorites = favorites ?? user.favorites

    if (email) {
      const [userWithUpdatedEmail] = await knex('users').where({ email })

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError('Este e-mail já esta em uso')
      }
    }

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir nova senha'
      )
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere!')
      }

      user.password = await hash(password, 8)
    }

    await knex('users')
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.fn.now(),
        favorites: user.favorites
        })
      .where({ id: user_id })

    return res.json()
  }

  async delete(req, res) {
    const { id } = req.params
    await knex('users').where({ id }).delete()

    return res.json()
  }
}

module.exports = UsersController
