const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
};

const getById = (id) => {
  return db('cars').where('car_id', id).first();
};

const getByVin = (vin) => {
  return db('cars').where('vin', vin).first();
};

const create = async (car) => {
  const [car_id] = await db('cars').insert(car, ['car_id', 'vin', 'make', 'model', 'mileage', 'car_title', 'transmission']);
  return getById(car_id);
};

module.exports = {
  getAll,
  getById,
  getByVin,
  create
};
