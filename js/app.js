function setFocusLinkInput() {
  document.getElementById("link-input").focus();
}

function setFocusTitleInput() {
  document.getElementById("tile-title").focus();
}

function setTagged(button) {
  button.classList.toggle("tagged");
}

function join(event) {
  const previousTag = event.target.previousSibling;
  const nextTag = event.target.nextSibling;
  let nextTagText = event.target.nextSibling.textContent;
  previousTag.innerHTML += " " + nextTagText;
  nextTag.parentNode.removeChild(nextTag);
  event.target.parentNode.removeChild(event.target);
  document.getElementById("undo-img").style.display = "block";
}

const linkInput = document.querySelector("input#link-input");
const titleInput = document.querySelector("input#tile-title");
const tagsParent = document.getElementById("tags");

linkInput.addEventListener("paste", (event) => {
  let url = event.clipboardData.getData("text");
  removeAllChildNodes(tagsParent);
  createTags(url);
  document.getElementById("submit-btn").style.display = "block";
  document.getElementById("clear").style.display = "flex";
  document.getElementById("title-input").style.display = "flex";
  setFocusTitleInput();
});

function createTags(paste) {
  let re = /\w+/g;
  regArray = paste.match(re);
  for (var i = 0; i < regArray.length; i++) {
    tagDiv =
      '<div class="tag" onclick="setTagged(this)">' + regArray[i] + "</div>";
    plusses = '<div class="plus">' + "+" + "</div>";
    document.getElementById("tags").innerHTML += tagDiv;
    if (i !== regArray.length - 1) {
      document.getElementById("tags").innerHTML += plusses;
    }
  }
  document.querySelectorAll(".plus").forEach((plusElm) => {
    plusElm.addEventListener("click", (e) => {
      join(e);
    });
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function undo() {
  removeAllChildNodes(tagsParent);
  inputValue = linkInput.value;
  createTags(inputValue);
  document.getElementById("undo-img").style.display = "none";
}

function clearFields() {
  removeAllChildNodes(tagsParent);
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("clear").style.display = "none";
  linkInput.value = "";
  setFocusLinkInput();
  document.getElementById("title-input").style.display = "none";
  if ((document.getElementById("undo-img").style.display = "block")) {
    document.getElementById("undo-img").style.display = "none";
  }
}

function createTile() {
  urlValue = linkInput.value;
  titleValue = titleInput.value;
  tileDiv =
    '<div class="tile-container"><a href="' +
    urlValue +
    '" target="_blank"><div class="tile"></div></a><div class="title"><a href=" ' +
    urlValue +
    '" target="_blank"><p>' +
    titleValue +
    "</p></a></div></div>";
  document.getElementById("tiles").innerHTML += tileDiv;
}

function submit() {
  createTile();
  clearFields();
  titleInput.value = "";
  document.getElementById("title-input").style.display = "none";
}
