// DO YOUR MAGIC
exports.up = function(knex) {
    // does the structural changes to the db
    return knex.schema
      .createTable('cars', table  => {
          table.increments('car_id');
          table.text('vin').unique().notNullable();
          table.text('make').notNullable();
          table.text('model').notNullable();
          table.decimal('mileage').notNullable();
          table.text('car_title');
          table.text('transmission');
      })
  };
  
  exports.down = function(knex) {
    // undoes those changes
    // the table drops should occur in the OPPOSITE order as they are created above. First created, last dropped.
    return knex.schema.dropTableIfExists('cars');
  };