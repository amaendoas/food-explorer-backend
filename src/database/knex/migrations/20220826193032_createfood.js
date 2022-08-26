const { default: knex } = require("knex");

exports.up = (knex) => knex.schema.createTable('food', table => {
  table.increments('id'),
  table.text('name'),
  table.integer('ingredients_id').references('id').inTable('ingredients')
});

exports.down = (knex) => knex.schema.dropTable('food');
