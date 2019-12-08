console.log("Client Side JS Loaded");

const form = document.getElementById("form");

form.addEventListener("submit", e => {
  e.preventDefault();
  const loc = document.getElementById("loc");

  fetch("http://localhost:3000/weather?address=" + loc.value).then(response => {
    response.json().then(data => {
      console.log("Data ", data.error);
    });
  });
});
