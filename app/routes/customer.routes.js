module.exports = app => {
    const Customer = require('../controllers/customer.controller');

    var router = require("express").Router();

    // Route for finding a customer by ID
    router.get("/:id", Customer.findOne);

    router.get("/:id/rentals", Customer.findAllRentals);

    router.put("/:id", Customer.update);

    //Route for deleting a customer
    router.delete("/:id", Customer.delete);

    // Route for creating a new customer
    router.post("/", Customer.create);

    // Route for finding all customer
    router.get("/", Customer.findAll);

    app.use('/api/customer', router);
};