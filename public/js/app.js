console.log("Client Side JS Loaded");

const form = document.getElementById("form");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

form.addEventListener("submit", e => {
  e.preventDefault();
  const loc = document.getElementById("loc");
  p1.textContent = "Loading....";
  p2.textContent = "";
  fetch("/weather?address=" + loc.value).then(response => {
    response.json().then(data => {
      if (data.error) {
        p1.textContent = "Error : " + data.error.error;
      } else {
        p1.textContent = data.location;
        p2.textContent =
          "The average temperature for the day is " +
          data.currentTemp +
          " C . The relative humidity is at " +
          data.humidity * 100 +
          "%";
      }
    });
  });
});
