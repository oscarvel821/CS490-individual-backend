module.exports = app => {
    const Film = require('../controllers/film.controller.js');

    var router = require("express").Router();

    // Route for finding the top 5 films
    router.get("/top5", Film.findTop5);

    // Route for finding a film by ID
    router.get("/:id", Film.findOne);

    // Route for creating a new film
    router.post("/", Film.create);

    // Route for finding all film
    router.get("/", Film.findAll);

    app.use('/api/film', router);
};