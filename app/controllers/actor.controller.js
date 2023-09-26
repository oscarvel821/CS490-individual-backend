const Actor = require("../models/actor.model.js");

exports.create = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: "Content can not be empty"
            });
        }

        const newFilm = {
            first_name : req.body.first_name,
            last_name : req.body.last_name
        };

        const createdActor = await Actor.create(newActor);
        res.send(createdActor);
    } catch (error) {
        res.status(500).send({
        message: error.message || "Some error occurred while creating the Actor"
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const actors = await Actor.getAll();
        res.send(actors);
    } catch (error) {
        res.status(500).send({
        message: error.message || "Some error occurred while retrieving Actors"
        });
    }
};

exports.findOne = async (req, res) => {
    try {
      const actor = await Actor.findById(req.params.id);
      if (!actor) {
        return res.status(404).send({
          message: `Not found Actor with id ${req.params.id}`
        });
      }
      res.send(actor);
    } catch (error) {
      res.status(500).send({
        message: error.message || `Error retrieving Actor with id ${req.params.id}`
      });
    }
  };

exports.findTop5 = async (req, res) => {
    try{
        const actors = await Actor.getTop5();
        res.send(actors);
    } catch (error) {
        res.status(500).send({
            message : error.message || "Error retrieving top 5 films"
        });
    }
};

exports.findTopFilmById = async (req, res) => {
    try{
        const details = await Actor.getTopFilmById(req.params.id);
        if(!details){
            return res.status(404).send({
                message : `Not found Actor with id ${req.params.id}`
            });
        }
        res.send(details);
    } catch (error) {
        res.status(500).send({
            message : error.message || `Error retrieving Actor with id ${req.parama.id}`
        });
    }
};