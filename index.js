const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');


app.use(cors());

const server = http.createServer(app);

app.get("/api", (req, res) => {
    res.json({"title" : "Hello world"});
})

server.listen(3001, () => {
    console.log("server is running");
});
