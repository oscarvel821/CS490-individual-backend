const pool = require("./db.js");

// Define the Customer model object
const Customer = function (customer) {
    this.store_id = null;
    this.first_name = customer.first_name;
    this.last_name = customer.last_last;
    this.email = customer.email;
    this.address_id = null;
    this.active = null;
    this.create_date = null;
  };

Customer.create = async (newCustomer) => {
    try {
        const [result] = await pool.query("INSERT INTO customer SET ?", newCustomer);
        console.log("Created Customer : ", { id: result.insertId, ...newCustomer });
        return { id: result.insertId, ...newCustomer };
    } catch (error) {
        console.error("Error creating Customer : ", error);
        throw error;
    }
};

Customer.getAll = async () => {
    try {
        const [rows] = await pool.query("SELECT * from customer");
        console.log("customer : ", rows);
        return rows;
    } catch (error) {
        console.error("Error retrieving customer : ", error);
        throw error;
    }
};

Customer.findById = async (customerId) => {
    try {
        const [rows] = await pool.query("SELECT * from customer WHERE customer_id = ?", customerId);
        if (rows.length) {
        console.log("Customer found: ", rows[0]);
        return rows;
        } else {
        throw { kind: "not found" };
        }
    } catch (error) {
        console.error("Error retrieving Customer by ID : ", error);
        throw error;
    }
};

module.exports = Customer