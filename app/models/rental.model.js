const pool = require('./db.js');

// Define the Film model object
const Rental = function (rental) {
  this.customer_id = rental.customer_id;
  this.film_id = rental.film_id;
  this.return_date = rental.return_date
  this.staff_id = rental.staff_id;
};

Rental.create = async (newRental) => {
    try{
        const sql = `INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, staff_id)
        VALUES (CURRENT_TIMESTAMP, 
                (SELECT inventory_id FROM inventory WHERE film_id = ? limit 1), 
                ?, 
                NULL, 
                1); `

        const [result] = await pool.query(sql, [newRental.film_id, newRental.customer_id])
        console.log("Created rental : ", { id: result.insertId, ...newRental });
        return { id: result.insertId, ...newRental };
    }
    catch(error){
        console.error("Error creating Film : ", error);
        throw error;
    }
}

Rental.getAll = async () => {
    try{
        const [rows] = await pool.query("select * from rental");
        console.log("rentals : ", rows);
        return rows;
    }
    catch(erro){
        console.error("Error retrieving rental : ", error);
        throw error;
    }
}

Rental.findById = async (rentalId) => {
    try {
      const [rows] = await pool.query("SELECT * from rental WHERE rental_id = ?", rentalId);
      if (rows.length) {
        console.log("rental found: ", rows[0]);
        return rows;
      } else {
        throw { kind: "not found" };
      }
    } catch (error) {
      console.error("Error retrieving rental by ID : ", error);
      throw error;
    }
  };


module.exports = Rental;