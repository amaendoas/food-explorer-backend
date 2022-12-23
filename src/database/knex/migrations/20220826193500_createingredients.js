
exports.up = (knex) => knex.schema.createTable('ingredients', table => {
    table.increments('id'),
    table.enu('name', [
      'alface',
      'ameixa',
      'amêndoas',
      'aniz',
      'café',
      'camarão',
      'canela',
      'canela',
      'claras',
      'damasco',
      'farinha',
      'limão',
      'maçã',
      'maracujá',
      'massa',
      'pão',
      'pão naan',
      'pepino',
      'pêssego',
      'pesto',
      'presunto',
      'rabanete',
      'rúcula',
      'tomate',
      'whiskey'
      ]).notNullable(),
    table.integer('dish_id').references('id').inTable('dishes').onDelete("CASCADE")})

exports.down = (knex) => knex.schema.dropTable('ingredients');
