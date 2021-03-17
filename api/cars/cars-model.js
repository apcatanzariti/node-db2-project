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

const update = async (id, changes) => {
  await db('cars').where('car_id', id).update(changes);
  return getById(id);
};

const remove = async (id) => {
  const data = await db('cars').where('car_id', id).delete();
  return(data);
};

module.exports = {
  getAll,
  getById,
  getByVin,
  create,
  update,
  remove
};
