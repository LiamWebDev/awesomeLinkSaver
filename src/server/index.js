const express = require("express");
const app = express();

app.use(express.static("src/client"));

// try to serve at root URL the file stored in client views index html
// __dirname: env variable that tells the absolute path containing current path
app.get("/", (req, res) => {
  res.sendFile("/client/views/index.html", { root: __dirname + "/.." });
});

// return json data from the URL
app.get("/test", (req, res) =>
  res.send({
    title: "test json response",
    message: "this is a message",
    time: "now",
  })
);

app.listen(8080, () => console.log("Example app listening on port 8080!"));
