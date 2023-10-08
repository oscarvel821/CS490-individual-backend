const pool = require('./db.js');

// Define the Film model object
const Film = function (film) {
  this.title = film.title;
  this.description = film.description;
  this.release_year = film.release_year;
  this.language_id = film.language_id;
  this.original_language_id = film.original_language_id;
  this.rental_duration = film.rental_duration;
  this.rental_rate = film.rental_rate;
  this.length = film.length;
  this.replacement_cost = film.replacement_cost;
  this.rating = film.rating;
  this.special_features = film.special_features;
};

Film.create = async (newFilm) => {
  try {
    const [result] = await pool.query("INSERT INTO film SET ?", [newFilm]);
    console.log("Created film : ", { id: result.insertId, ...newFilm });
    return { id: result.insertId, ...newFilm };
  } catch (error) {
    console.error("Error creating Film : ", error);
    throw error;
  }
};

Film.getAll = async (title, actor, genre) => {
  try {
    sql = "SELECT * from film"

    if(title){
        sql += ` WHERE title LIKE '%${title}%'`;
    }
    else if(actor){
      sql += ` inner join film_actor on film.film_id = film_actor.film_id
      inner join actor on film_actor.actor_id = actor.actor_id
      where CONCAT(actor.first_name, " ", actor.last_name) like '%${actor}%'`
    }
    else if(genre){
      sql += ` inner join film_category on film.film_id = film_category.film_id
      inner join category on film_category.category_id = category.category_id
      where category.name like '%${genre}%'`
    }

    sql += " LIMIT 50";
    const [rows] = await pool.query(sql, [100]);
    console.log("films : ", rows);
    return rows;
  } catch (error) {
    console.error("Error retrieving films : ", error);
    throw error;
  }
};

Film.findById = async (filmId) => {
  try {
    const [rows] = await pool.query("SELECT * from film WHERE film_id = ?", filmId);
    if (rows.length) {
      console.log("Film found: ", rows[0]);
      return rows;
    } else {
      throw { kind: "not found" };
    }
  } catch (error) {
    console.error("Error retrieving film by ID : ", error);
    throw error;
  }
};

Film.getTop5 = async () => {
    try{
        sql = `SELECT film.film_id as id, film.title as title, count(film.film_id) as descript
        FROM film
        INNER JOIN inventory
        ON inventory.film_id = film.film_id
        INNER JOIN rental
        ON rental.inventory_id = inventory.inventory_id
        GROUP BY id, title
        ORDER BY descript DESC
        LIMIT 5;`
        const [rows] = await pool.query(sql);
        console.log(rows);
        return rows;
    } catch(error){
        console.log("Error retrieving top 5 films : ", error);
        throw error;
    }
};

module.exports = Film;