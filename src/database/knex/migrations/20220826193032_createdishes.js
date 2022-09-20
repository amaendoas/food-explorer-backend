const { knex } = require("knex");

exports.up = (knex) => knex.schema.createTable('dishes', table => {
  table.increments('id'),
  table.text('name').notNullable(),
  table.text('image').nullable(),
  table.text('description').notNullable(),
  table.text('price').notNullable()
});

exports.down = (knex) => knex.schema.dropTable('food');
