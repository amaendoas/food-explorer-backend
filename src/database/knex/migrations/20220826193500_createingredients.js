
exports.up = (knex) => knex.schema.createTable('ingredients', table => {
  table.increments('id'),
  table.text('name').notNullable(),
  table.text('image').nullable(),
  table.integer('dish_id').references('id').inTable('dishes')
});


exports.down = (knex) => knex.schema.dropTable('ingredients');
