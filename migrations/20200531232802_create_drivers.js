
exports.up = function (knex) {
  return knex.schema
    .createTable('drivers', function (table) {
      table.increments('id').primary();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('phone');
      table.string('email');
      table.string('latitude');
      table.string('longitude');
      table.string('document');
      table.string('description');
      table.string('push_id');
      table.integer('number_stars');
      table.string('password');
      table.string('avatar_path');
      table.string('passwordResetToken').nullable();
      table.string('passwordResetExpires').nullable();
    })
};

exports.down = function (knex) {
  return knex.schema
  .dropTable('drivers');
};
