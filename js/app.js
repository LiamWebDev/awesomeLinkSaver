// Define main variables

const DOM_ELEMENTS = {
  form: null,
  link: null,
  analyzeBtn: null,
}
// let form = null;

const getDOMElements = () => {
  DOM_ELEMENTS.form = document.getElementById("newUrlForm");
  DOM_ELEMENTS.link = document.getElementById("link");
  DOM_ELEMENTS.analyzeBtn = document.getElementById("js-analyze-btn");
}

function addEventListeners() {
  // TODO: check to make this work on HTML tags
  DOM_ELEMENTS.form.addEventListener("submit", (e) => onSubmit(e));
  DOM_ELEMENTS.link.addEventListener("input", (e) => onLinkInput(e))
}

const init = () => {
  getDOMElements()
  addEventListeners()
  console.log("App.js launched!")
}

init();

// OTHER FUNCTION:
function onSubmit(event) {
  event.preventDefault();
  console.log("on Submit: ", event);
  const linkValue = DOM_ELEMENTS.link.value;
  const isValid = isValidURL(linkValue);
  if (!isValid) {
    console.log(`The text ${linkValue} is NOT a proper URL`);
  } else {
    console.log(`The text ${linkValue} is a proper URL`);
  }

  // TODO: 1 get the text introduced on the input
  // TODO: 2 - split into tags 
  //  TODO: 3 - showing "fields": title and "save".
  //  Suggest a title?
  // TODO: 4 - manage the tags. 


}

const onLinkInput = event => {
  event.preventDefault();

  const linkValue = DOM_ELEMENTS.link.value;
  const isValid = isValidURL(linkValue);

  DOM_ELEMENTS.analyzeBtn.disabled = !isValid;
  DOM_ELEMENTS.link.classList.remove('error');
  if (!isValid) {
    DOM_ELEMENTS.link.classList.add('error');
    console.log(`The text ${linkValue} is NOT a proper URL`);
  }
}


