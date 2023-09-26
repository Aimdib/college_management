const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http");

const app = express();
const server = http.createServer(app);

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for the root URL
app.get("/", (req, res) => {
  res.json({
    message: "Welcome buddy!!!! .",
  });
});

// Import routes from the routes folder
require("./routes/auth.routes")(app);
require("./routes/admin.routes")(app);


// Set the port and listen for requests
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
