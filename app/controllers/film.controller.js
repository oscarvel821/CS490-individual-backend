const Film = require('../models/film.model.js');

exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty"
      });
    }

    const newFilm = {
      title: req.body.title,
      description: req.body.description,
      release_year: req.body.release_year,
      language_id: req.body.language_id,
      original_language_id: req.body.original_language_id,
      rental_duration: req.body.rental_duration,
      rental_rate: req.body.rental_rate,
      length: req.body.length,
      replacement_cost: req.body.replacement_cost,
      rating: req.body.rating,
      special_features: req.body.special_features
    };

    const createdFilm = await Film.create(newFilm);
    res.send(createdFilm);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Film"
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const title = req.query.title;
    const actor = req.query.actor;
    const genre = req.query.genre;
    const films = await Film.getAll(title, actor, genre);
    res.send(films);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Films"
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res.status(404).send({
        message: `Not found Film with id ${req.params.id}`
      });
    }
    res.send(film);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error retrieving Film with id ${req.params.id}`
    });
  }
};

exports.findTop5 = async (req, res) => {
    try{
        const films = await Film.getTop5();
        res.send(films);
    } catch (error) {
        res.status(500).send({
            message : error.message || "Error retrieving top 5 films"
        });
    }
};