module.exports = app => {
    const Rental = require('../controllers/rental.controller.js');

    var router = require("express").Router();

    // Route for finding a rental by ID
    router.get("/:id", Rental.findOne);

    // Route for creating a new rental
    router.post("/", Rental.create);

    // Route for finding all film
    router.get("/", Rental.findAll);

    app.use('/api/rental', router);
};