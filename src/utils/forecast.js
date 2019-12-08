const request = require("request");

const forecast = (coords, callback) => {
  const url =
    "https://api.darksky.net/forecast/583c71fb0ae8cbb0cf46c3df3eacc43c/" +
    coords.lat +
    "," +
    coords.long +
    "?units=si";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log("Please Check Your Network Connectivity");
    } else if (response.body.error) {
      console.log(response.body.error);
    } else {
      const currentTemp = response.body.currently.temperature;
      const humidity = response.body.currently.humidity;
      callback(error, { currentTemp, humidity });
    }
  });
};

module.exports = forecast;
