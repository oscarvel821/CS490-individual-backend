module.exports = app => {
    const Customer = require('../controllers/customer.controller');

    var router = require("express").Router();

    // Route for finding a customer by ID
    router.get("/:id", Customer.findOne);

    // Route for creating a new customer
    router.post("/", Customer.create);

    // Route for finding all customer
    router.get("/", Customer.findAll);

    app.use('/api/customer', router);
};