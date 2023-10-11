const createServer = require("./app");
const http = require('http');

app = createServer();

const port = process.env.PORT | 3001;

const server = http.createServer(app);

app.get("/api", (req, res) => {
    res.json({"title" : "Hello world"});
})

server.listen(port, () => {
    console.log("server is running");
});

