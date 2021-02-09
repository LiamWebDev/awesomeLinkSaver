const DOM_ELEMENTS = {
  form: null,
  link: null,
  analyzeBtn: null,
  extraInfoForm: null,
  title: null,
}

const getDOMElements = () => {
  DOM_ELEMENTS.form = document.getElementById("newUrlForm");
  DOM_ELEMENTS.link = document.getElementById("link");
  DOM_ELEMENTS.analyzeBtn = document.getElementById("js-analyze-btn");
  DOM_ELEMENTS.extraInfoForm = document.getElementById("js-form__extra-info-container");
  DOM_ELEMENTS.title = document.getElementById("title");
}

function addEventListeners() {
  DOM_ELEMENTS.form.addEventListener("submit", (e) => onSubmit(e));
  DOM_ELEMENTS.link.addEventListener("input", (e) => onLinkInput(e))
}

const init = () => {
  getDOMElements()
  addEventListeners()
  console.log("App.js launched!")
}

init();

function getRecommendTitle(urlStr) {
  const { pathname } = new URL(urlStr);
  let wordsArr = getWordsFromString(pathname);
  wordsArr = wordsArr.map(word => capitalizeString(word))
  return wordsArr.join(' ');
}

// OTHER FUNCTION:
function onSubmit(event) {
  event.preventDefault();

  // document.getElementById("form__extra-info-container").style.display = "none";

  // 1 get the text introduced on the input
  const linkValue = DOM_ELEMENTS.link.value;
  const isValid = isValidURL(linkValue);
  if (!isValid) {
    console.log(`The text ${linkValue} is NOT a proper URL`);
    return;
  } else {
    console.log(`The text ${linkValue} is a proper URL`);
  }

  // 2 - split into tags
  const tags = getTagsFromURL(linkValue)

  // 3 - showing "fields": title and "save".
  const title = getRecommendTitle(linkValue);

  // 4 Suggest a title?
  DOM_ELEMENTS.title.value = title;
  DOM_ELEMENTS.extraInfoForm.classList.remove("hidden");

  // TODO: 5 - manage the tags. 
  console.log("tags: ", tags)

}

const onLinkInput = event => {
  event.preventDefault();

  const linkValue = DOM_ELEMENTS.link.value;
  const isValid = isValidURL(linkValue);

  DOM_ELEMENTS.extraInfoForm.classList.add("hidden");

  DOM_ELEMENTS.analyzeBtn.disabled = !isValid;
  DOM_ELEMENTS.link.classList.remove('error');
  if (!isValid) {
    DOM_ELEMENTS.link.classList.add('error');
    console.log(`The text ${linkValue} is NOT a proper URL`);
  }
}


