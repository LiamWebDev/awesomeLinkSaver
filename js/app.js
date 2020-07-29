const STATE = {
  tags: {
    https: {
      urls: "",
    },
    loops: {
      urls: "",
    },
    arrays: {
      urls: "",
    },
  },
  exceptions: ["to", "the", "best"],
  tiles: [
    {
      0: {
        id: 1,
        url: "www.reddit.co.uk/example",
        title: "Reddit Article",
        tags: ["1", "4", "5"],
      },
      1: {
        id: 2,
        url: "www.medium.com/example",
        title: "Medium Article",
        tags: ["1", "4", "5"],
      },
    },
  ],
};

function setFocusLinkInput() {
  document.getElementById("link-input").focus();
}

function setFocusTitleInput() {
  document.getElementById("tile-title").focus();
}

function setTagged(button) {
  button.classList.toggle("tagged");
}

function setExistTagged(button) {
  button.classList.toggle("exist-tagged");
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
const existTagsParent = document.getElementById("exist-tags");

linkInput.addEventListener("paste", (event) => {
  let url = event.clipboardData.getData("text");
  removeAllChildNodes(tagsParent);
  titleInput.value = "";
  createTags(url);
  document.getElementById("submit-btn").style.display = "block";
  document.getElementById("clear").style.display = "flex";
  document.getElementById("title-input").style.display = "flex";
  pathIntoTitleInput(url);
  setFocusTitleInput();
});

function createTags(paste) {
  let re = /\w+/g;
  regArray = paste.match(re);
  let i = 0;
  for (const tag of regArray) {
    if (STATE.tags[tag]) {
      tagDiv =
        '<div class="exist-tag" onclick="setExistTagged(this)">' +
        tag +
        "</div>";
      document.getElementById("exist-tags").innerHTML += tagDiv;
      regArray.splice(i, 1, "");
    } else if (STATE.exceptions.includes(tag)) {
      regArray.splice(i, 1, "");
    } else {
      tagDiv =
        '<div class="tag" onclick="setTagged(this)">' + regArray[i] + "</div>";
      plusses = '<div class="plus">' + "+" + "</div>";
      document.getElementById("tags").innerHTML += tagDiv;
      if (i !== regArray.length - 1) {
        document.getElementById("tags").innerHTML += plusses;
      }
    }
    i++;
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
  removeAllChildNodes(existTagsParent);
  inputValue = linkInput.value;
  createTags(inputValue);
  document.getElementById("undo-img").style.display = "none";
}

function clearFields() {
  removeAllChildNodes(tagsParent);
  removeAllChildNodes(existTagsParent);
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
  storeTags();
  createTile();
  clearFields();
  titleInput.value = "";
  document.getElementById("title-input").style.display = "none";
  setFocusLinkInput();
}

function pathIntoTitleInput(paste) {
  let reg1 = /\/([^\/]+)\/?$/;
  pathArr = paste.match(reg1);
  let reg2 = /\w+/g;
  titleArray = pathArr[1].match(reg2);
  for (var i = 0; i < titleArray.length; i++) {
    titleCapitalWord = titleArray[i][0].toUpperCase() + titleArray[i].substr(1);
    titleInput.value += titleCapitalWord + " ";
  }
}

function storeTags() {
  const url = linkInput.value;
  let newTags = document.getElementsByClassName("tagged");
  let existTags = document.getElementsByClassName("exist-tag");

  for (var i = 0; i < newTags.length; i++) {
    newProp = newTags[i].textContent;
    STATE.tags[newProp] = { urls: `${url}` };
    console.log(STATE);
  }

  for (var i = 0; i < existTags.length; i++) {
    existProp = existTags[i].textContent;
    STATE.tags[existProp] = { urls: `${url}` };
    console.log(STATE);
  }
}
