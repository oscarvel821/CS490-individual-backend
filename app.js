const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


function createServer() {
    const app = express();

    app.use(cors());

    // parse requests of content-type - application/json
    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    require("./app/routes/film.routes.js")(app);
    require("./app/routes/actor.routes.js")(app);
    require("./app/routes/customer.routes.js")(app);
    require("./app/routes/rental.routes.js")(app);

    return app;
};

module.exports = createServer;