const Rental = require('../models/rental.model.js');


exports.create = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: "Content can not be empty"
        });
      }
  
      const newRental = {
        customer_id : req.body.customer_id,
        film_id : req.body.film_id,
        return_date : null,
        staff_id : 1
      };
  
      const createdRental = await Rental.create(newRental);
      res.send(createdRental);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the rental"
      });
    }
  };

exports.findAll = async (req, res) => {
  try {
    const rentals = await Rental.getAll();
    res.send(rentals);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving rentals"
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).send({
        message: `Not found Rental with id ${req.params.id}`
      });
    }
    res.send(rental);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error retrieving rental with id ${req.params.id}`
    });
  }
};
