const pool = require("./db.js");

// Define the Actor model object
const Actor = function (film) {
    this.first_name = film.first_name;
    this.last_name = film.last_last;
  };

Actor.create = async (newActor) => {
    try {
        const [result] = await pool.query("INSERT INTO actor SET ?", newActor);
        // console.log("Created actor : ", { id: result.insertId, ...newActor });
        return { id: result.insertId, ...newActor };
    } catch (error) {
        console.error("Error creating Actor : ", error);
        throw error;
    }
};

Actor.getAll = async () => {
    try {
        const [rows] = await pool.query("SELECT * from actor LIMIT ?", [100]);
        // console.log("actor : ", rows);
        return rows;
    } catch (error) {
        console.error("Error retrieving actors : ", error);
        throw error;
    }
};

Actor.findById = async (actorId) => {
    try {
        const [rows] = await pool.query("SELECT * from actor WHERE actor_id = ?", actorId);
        if (rows.length) {
        // console.log("Actor found: ", rows[0]);
        return rows;
        } else {
        throw { kind: "not found" };
        }
    } catch (error) {
        console.error("Error retrieving actor by ID : ", error);
        throw error;
    }
};

Actor.getTop5 = async () => {
    try{
        sql = `select actor.actor_id as id, CONCAT(actor.first_name, ' ', actor.last_name) as title, count(actor.actor_id) as descript
        from actor
        inner join film_actor on actor.actor_id = film_actor.actor_id
        inner join film on film_actor.film_id = film.film_id
        inner join inventory on film.film_id = inventory.film_id
        group by id
        order by descript desc
        limit 5;`
        const [rows] = await pool.query(sql);
        // console.log(rows);
        return rows;
    } catch (error){
        console.log("Error retrieving top 5 actors : ", error);
        throw error;
    }
}

Actor.getTopFilmById = async (id) => {
    try{
        sql = `select actor.actor_id, actor.first_name, actor.last_name, count(rental.rental_id) as rental_count, film.title as film_title 
        from actor 
        inner join film_actor on actor.actor_id = film_actor.actor_id 
        inner join film on film_actor.film_id = film.film_id 
        inner join inventory on film.film_id = inventory.film_id 
        inner join rental on inventory.inventory_id = rental.inventory_id 
        where actor.actor_id = ? 
        group by actor.actor_id, actor.first_name, actor.last_name, film.title 
        order by rental_count desc 
        limit 5;`
        const [rows] = await pool.query(sql, [id]);
        // console.log(rows);
        return rows;
    } catch (error) {
        console.log("Error retrieving actor's details : ", error);
        throw error;
    }
} 

module.exports = Actor