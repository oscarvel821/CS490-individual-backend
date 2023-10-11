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
        // console.log("customer : ", rows);
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

Customer.updateById = async (id, customer) => {
    try{
        const sql = `update customer 
        set first_name = ?, last_name = ?, email = ?, active = ?
        where customer_id = ?;`

        const [rows] = await pool.query(sql, [customer.first_name, customer.last_name, customer.email, customer.active, id])
        if(rows){
            console.log("Updated Customer with id : ", id)
        }
        else{
            throw {kind  : "not found"}
        }
    }
    catch(error){
        console.error("error updating Customer by ID: ", error);
        throw error;
    }
}

Customer.remove = async (customerId) => {
    try{
        const sql = `DELETE FROM customer
        WHERE customer_id = ?`
        const [rows] = await pool.query(sql, [customerId]);
        if (!rows.affectedRows) {
            throw { kind: "not found" };
        }

        console.log("Deleted Customer with id: ", customerId);
    }
    catch(error){
            console.error("error deleting Customer by ID: ", error);
            throw error;
    }
}

Customer.getAllRentals = async (customerId) => {
    try {
        const sql = `SELECT
            rental.rental_id,
            customer.customer_id,
            customer.first_name,
            customer.last_name,
            film.title AS rented_movie,
            rental.return_date as return_status
            FROM
                customer
            JOIN
                rental ON customer.customer_id = rental.customer_id
            JOIN
                inventory ON rental.inventory_id = inventory.inventory_id
            JOIN
                film ON inventory.film_id = film.film_id
            where
                customer.customer_id = ?
            order by
                return_status;`
        const [rows] = await pool.query(sql, [customerId]);
        if(rows){
            console.log("Customer found: ", rows);
            return rows;
        }
        else {
            throw { kind: "not found" };
        }
    } catch (error) {
        console.error("Error retrieving customer : ", error);
        throw error;
    }
}

module.exports = Customer