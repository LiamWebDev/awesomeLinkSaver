// TODO: check to make this work on HTML tags
function onSubmit(event) {
  event.preventDefault();
  console.log("on Submit: ", event);
}

const form = document.getElementById("newUrlForm");

form.addEventListener("submit", (e) => onSubmit(e));
