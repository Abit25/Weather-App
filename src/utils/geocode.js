const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?limit=2&access_token=pk.eyJ1IjoiYWJpdDI1IiwiYSI6ImNrM25kMDJ1dTB2aG0zY3Q1ZWR1NnZtOHIifQ.n4kMvcoegbpeC-Dio5P-jA";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log("Please Check Your Network Connectivity");
      callback(error, {});
    } else if (response.body.features.length == 0) {
      console.log("Please provide correct location details");
      callback({ error: "Please provide correct location details" }, {});
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
