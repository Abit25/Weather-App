const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;
//Set up path for Express Config
const publicDir = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../views/partials");

//Configure hbs
app.use(express.static(publicDir));
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

//Routing
app.get("", (req, res) => {
  res.render("index", { title: "Index", name: "Abheet Shaju" });
});

app.get("/about", (req, res) => {
  res.render("about", { name: "Abheet Shaju" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide a valid address" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      // res.send({ location, latitude, longitude });
      var coords = { lat: latitude, long: longitude };
      forecast(coords, (error, { currentTemp, humidity }) => {
        if (error) {
          return res.send({ error });
        }
        res.send({ location, currentTemp, humidity });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("pageNotFound", {
    errMessage: "Help Page Not Found",
    name: "Abheet Shaju"
  });
});

app.get("*", (req, res) => {
  res.render("pageNotFound", {
    errMessage: "404 Page Not Found",
    name: "Abheet Shaju"
  });
});

//Start up express
app.listen(port, () => {
  console.log("Server Running on Port " + port);
});
