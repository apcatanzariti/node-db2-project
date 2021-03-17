const express = require('express');
const Cars = require('./cars-model');
const router = require('express').Router();
const { checkCarId, checkCarPayload, checkVinNumberUnique } = require('./cars-middleware');

module.exports = router;

router.get('/', (req, res) => {
    Cars.getAll()
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong fetching all cars' });
    })
});

router.get('/:id', checkCarId, (req, res) => {
    res.json(req.car);
});

router.post('/', checkCarPayload, checkVinNumberUnique, async (req, res) => {
    try {
        const data = await Cars.create(req.body);
        res.status(200).json(data);
    } catch {
        res.status(500).json({ message: 'something went wrong adding this car' });
    }
});

router.put('/:id', checkCarPayload, async (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    try {
        const data = await Cars.update(id, changes);
        res.status(200).json(data);
    } catch {
        res.status(500).json({ message: 'something went wrong updating this car' });
    }
});

router.delete('/:id', (req, res) => {
    Cars.remove(req.params.id)
    .then(car => {
        res.status(200).json(car);
    })
    .catch(err => {
        res.status(500).json({ message: 'something went wrong deleting this car' });
    })
});
