
exports.up = (knex) => knex.schema.createTable('orders', table => {
  table.increments('id'),
  table.text('status'),
  table.timestamp('created_at').default(knex.fn.now()),
  table.integer('user_id').references('id').inTable('users'),
  table.integer('food_id').references('id').inTable('food')
});

exports.down = (knex) => knex.schema.dropTable('orders');
