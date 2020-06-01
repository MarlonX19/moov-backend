
exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email').notNullable();
      table.string('phone').notNullable();
      table.string('document').notNullable();
      table.integer('number_starts');
      table.string('push_id');
      table.string('password').notNullable();
      table.string('avatar_path');
    })
};

exports.down = function (knex) {
  return knex.schema
  .dropTable("users");
};
