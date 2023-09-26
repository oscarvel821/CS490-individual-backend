module.exports = app => {
    const Actor = require('../controllers/actor.controller');

    var router = require("express").Router();

    // Route for finding the top 5 actors
    router.get("/top5", Actor.findTop5);

    // Route for finding a actors by ID
    router.get("/:id", Actor.findOne);

    router.get('/:id/details', Actor.findTopFilmById);

    // Route for creating a new actor
    router.post("/", Actor.create);

    // Route for finding all actors
    router.get("/", Actor.findAll);

    app.use('/api/actor', router);
};