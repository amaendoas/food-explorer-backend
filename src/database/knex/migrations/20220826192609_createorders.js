
exports.up = (knex) => knex.schema.createTable('orders', table => {
  table.increments('id'),
  table.integer('code'),
  table.enu('status', ['pendente', 'preparando', 'entregue']),
  table.timestamp('created_at').default(knex.fn.now()),
  table.integer('user_id').references('id').inTable('users'),
  table.integer('dish_id').references('id').inTable('dishes'),
  table.integer('dish_quant')
});

exports.down = (knex) => knex.schema.dropTable('orders');
