const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    // const database = await sqliteConnection();

    // const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    const checkUserExists = await knex('users').where({email});

    if(checkUserExists.length !== null) {
      console.log(checkUserExists)
      throw new AppError("Este e-mail já está em uso")
    }

    // await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password])

    await knex('users').insert({
      name,
      email,
      password
    })
  
    res.status(201).json();
  }
}

module.exports = UsersController