const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs")

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 8)

    const checkUserExists = await knex('users').where({email});

    if(checkUserExists.length !== 0) {
      throw new AppError("Este e-mail já está em uso")
    }

    await knex('users').insert({
      name,
      email,
      password: hashedPassword
    })
  
    res.status(201).json();
  }

  async update(req, res) {
    const { name, email, old_password, password } = req.body;
    const { id } = req.params;

    const user = await knex('users').where({id});

    if(user.length === 0) {
      throw new AppError("Usuário não encontrado!")
    }

    const userWithUpdatedEmail = await knex('users').where({email});

    if(userWithUpdatedEmail.length !== 0 && userWithUpdatedEmail[0].id !== user[0].id) {
      throw new AppError("Este e-mail já esta em uso")
    }

    user[0].name = name ?? user[0].name;
    user[0].email = email ?? user[0].email;

    if(password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir nova senha")
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user[0].password)

      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere!")
      }

      user[0].password = await hash(password, 8)
    }

    await knex('users').update({
      name: user[0].name,
      email: user[0].email,
      password: user[0].password,
      updated_at: knex.fn.now()
    }).where({id})

   return res.json();

  }
}

module.exports = UsersController