const Customer = require("../models/customer.model.js");

exports.create = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: "Content can not be empty"
            });
        }

        // this.store_id = null;
        // this.first_name = customer.first_name;
        // this.last_name = customer.last_last;
        // this.email = customer.email;
        // this.address_id = null;
        // this.active = 1;
        // this.create_data = null;

        console.log(req.body)

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
        console.log(newCustomer)
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
        const customer = await Customer.getAll();
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
