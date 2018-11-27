// Dependencies
// =============================================================
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

<<<<<<< HEAD

=======
>>>>>>> 6afe7cdc1456060fd8d9c461ee25ba36ce8d8074
const db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

<<<<<<< HEAD
=======

>>>>>>> 6afe7cdc1456060fd8d9c461ee25ba36ce8d8074
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require('./sockets/todo-sockets.js')(io);
// require("./routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
}); 














