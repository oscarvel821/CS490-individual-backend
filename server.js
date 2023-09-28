const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const http = require('http');
const cors = require('cors');

const port = process.env.PORT | 3001

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

app.get("/api", (req, res) => {
    res.json({"title" : "Hello world"});
})

require("./app/routes/film.routes.js")(app);
require("./app/routes/actor.routes.js")(app);
require("./app/routes/customer.routes.js")(app);

server.listen(port, () => {
    console.log("server is running");
});

module.exports = app;
