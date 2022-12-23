const { hash } = require("bcryptjs");

exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      name: "Adm",
      email: "adm@foodexplorer.com",
      password: await hash("040566", 8),
      isAdmin: true,
    }
  ]);

  
};
