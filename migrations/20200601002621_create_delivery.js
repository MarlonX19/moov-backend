exports.up = function (knex) {
  return knex.schema
    .createTable('delivery', function (table) {
      table.increments('id').primary();

      table.boolean('accepted');
      table.boolean('delivered');
      table.float('value');
      table.string('observation');
      table.string('from');
      table.string('to');
      table.string('fromTown');
      table.string('toTown');
      table.timestamp('delivered_at');
      table.timestamp('date');
      table.integer('user_id');
      table.foreign('user_id').references('id').inTable('users');

      table.integer('driver_id');
      table.foreign('driver_id').references('id').inTable('drivers');

    })
};

exports.down = function (knex) {
  return knex.schema
  .dropTable('delivery');
};
