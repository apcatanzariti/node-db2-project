const Cars = require('./cars-model');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if (!car) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found` });
    } else {
      req.car = car;
      next();
    }
  } catch {
    res.status(500).json({ message: 'something went wrong checking the id' });
  }
}

const checkCarPayload = (req, res, next) => {
  const vin = req.body.vin;
  const make = req.body.make;
  const model = req.body.model;
  const mileage = req.body.mileage;

  if (!vin) {
    res.status(400).json({ message: 'car vin number is missing' });
  } else if (!make) {
    res.status(400).json({ message: 'car make is missing' });
  } else if (!model) {
    res.status(400).json({ message: 'car model is missing' });
  } else if (!mileage) {
    res.status(400).json({ message: 'car mileage is missing' });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const car = await Cars.getByVin(req.body.vin);

    if (car) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch {
    res.status(500).json({ message: `something went wrong checking the vin` });
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
};