exports.up = function (knex) {
  return knex.schema
    .createTable('commentRate', function (table) {
      table.increments('id').primary();

      table.string('comment');

      table.integer('driver_id');
      table.foreign('driver_id').references('id').inTable('drivers');

    })
};

exports.down = function (knex) {
  return knex.schema
  .dropTable('commentRate');
};
