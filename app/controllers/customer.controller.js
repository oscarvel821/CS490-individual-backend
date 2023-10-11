const Customer = require("../models/customer.model.js");

exports.create = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: "Content can not be empty"
            });
        }

        const newCustomer = {
            store_id : req.body.store_id,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            address_id : req.body.address_id,
            active : req.body.active,
            create_date : req.body.create_date
        };

        const createdCustomer = await Customer.create(newCustomer);
        res.send(createdCustomer);
    } catch (error) {
        console.log(error)
        res.status(500).send({
        message: error.message || "Some error occurred while creating the Customer"
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const store_id = req.query.store_id;

        const customer = await Customer.getAll(store_id);
        res.send(customer);
    } catch (error) {
        res.status(500).send({
        message: error.message || "Some error occurred while retrieving Customer"
        });
    }
};

exports.findOne = async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).send({
          message: `Not found Customer with id ${req.params.id}`
        });
      }
      res.send(customer);
    } catch (error) {
      res.status(500).send({
        message: error.message || `Error retrieving Customer with id ${req.params.id}`
      });
    }
  };

  exports.findAllRentals = async (req, res) => {
    try{
      const rentals = await Customer.getAllRentals(req.params.id);
      if (!rentals){
        return res.status(404).send({
          message : `Not Found Customer with id ${req.params.id}`
        })
      }
      res.send(rentals);
    } catch(error){
      res.status(500).send({
        message : error.message || `Error Retrieving Customer's rentals with id ${req.params.id}`
      });
    }
  }

  exports.delete = async (req, res) => {
    const customerId = req.params.id;
  
    try {
      await Customer.remove(customerId);
      res.status(204).send(); // Respond with a 204 (No Content) status to indicate successful deletion.
    } catch (error) {
      if (error.kind === 'not found') {
        res.status(404).json({ message: 'Customer not found' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };

  exports.update = async (req, res) => {
    try{
      if (!req.body) {
          return res.status(400).send({
              message: "Content can not be empty"
          });
      }

      const existingCustomer = {
          first_name : req.body.first_name,
          last_name : req.body.last_name,
          email : req.body.email,
          active : req.body.active,
      };

      updatedCustomer = await Customer.updateById(req.params.id, existingCustomer);
      res.send(updatedCustomer);
    }catch(error){
      console.log(error)
      res.status(500).send({
      message: error.message || "Some error occurred while updating the Customer"
      });
    }
  }
