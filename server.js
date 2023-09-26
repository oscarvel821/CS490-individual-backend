const express = require('express');
const app = express();
const http = require('http');
//const mysql = require('mysql2')
const cors = require('cors');

const port = process.env.PORT | 3001

app.use(cors());

const server = http.createServer(app);

app.get("/api", (req, res) => {
    res.json({"title" : "Hello world"});
})

// app.get('/api/top5movies', (req, res) => {
    // const sql = `SELECT film.film_id as id, film.title as title, count(film.film_id) as descript
    // FROM film
    // INNER JOIN inventory
    // ON inventory.film_id = film.film_id
    // INNER JOIN rental
    // ON rental.inventory_id = inventory.inventory_id
    // GROUP BY id, title
    // ORDER BY descript DESC
    // LIMIT 5;`
//     db.query(sql, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     })
// })

// app.get('/api/top5actors', (req, res) => {
    // const sql = `select actor.actor_id as id, CONCAT(actor.first_name, ' ', actor.last_name) as title, count(actor.actor_id) as descript
    // from actor
    // inner join film_actor on actor.actor_id = film_actor.actor_id
    // inner join film on film_actor.film_id = film.film_id
    // inner join inventory on film.film_id = inventory.film_id
    // group by id
    // order by descript desc
    // limit 5;`

//     db.query(sql, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     })
// })

// app.get('/api/film/:film_id', (req, res) => {
//     const film_id = req.params.film_id;

//     const sql = `select title, description, release_year, rental_rate, rating, special_features
//     from film 
//     where film_id = ${film_id}`

//     db.query(sql, (err, data) => {
//         if(err) return res.json(err);

//         return res.json(data);
//     })
// })

require("./app/routes/film.routes.js")(app);
require("./app/routes/actor.routes.js")(app);

server.listen(port, () => {
    console.log("server is running");
});
