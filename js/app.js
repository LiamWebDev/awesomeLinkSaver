/* globals Utils */
const STATE = {
  tags: {
    https: {
      tiles: ["tile1", "tile3"],
    },
    loops: {
      tiles: ["tile2"],
    },
    arrays: {
      tiles: ["tile2", "tile3"],
    },
  },
  exceptions: ["to", "the", "best"],
  tiles: {
    tile1: {
      id: 1,
      url: "www.reddit.co.uk/example",
      title: "Reddit Article",
      tags: ["https"],
    },
    tile2: {
      id: 2,
      url: "www.medium.com/example",
      title: "Medium Article",
      tags: ["loops", "arrays"],
    },
    tile3: {
      id: 3,
      url: "www.youtube.com/video-example",
      title: "YouTube Video Article",
      tags: ["https", "arrays"],
    },
  },
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
const tagInput = document.querySelector("input#new-tag-name");
const tagsParent = document.getElementById("tags");
const existTagsParent = document.getElementById("exist-tags");

function init() {
  addEventListeners();
}
init();

/**************************************************
      EVENT LISTENERS
***************************************************/

function addEventListeners() {
  pasteEventListener();
  tagPlussesEventListener();
  tagInput.addEventListener("keydown", tagEnterKey);
  linkInput.addEventListener("keydown", backspaceClear);
}

function pasteEventListener() {
  linkInput.addEventListener("paste", (event) => {
    let url = event.clipboardData.getData("text");
    removeAllChildNodes(tagsParent);
    titleInput.value = "";
    createAllTags(url);
    document.getElementById("submit-btn").style.display = "block";
    document.getElementById("clear").style.display = "flex";
    document.getElementById("title-input").style.display = "flex";
    document.getElementById("new-tag-input").style.display = "flex";
    pathIntoTitleInput(url);
    setFocusTitleInput();
  });
}

function tagPlussesEventListener() {
  document.querySelectorAll(".plus").forEach((plusElm) => {
    plusElm.addEventListener("click", (e) => {
      join(e);
    });
  });
}

/**
 * Creates a new user-generated tag upon enter key press
 * @param {event} key - A keydown event
 */
function tagEnterKey(key) {
  if (key.code === "Enter" || key.code === "NumpadEnter") {
    if (tagInput.value !== "") {
      document.getElementById("tags").innerHTML += plusses;
      Utils.createNewTag(tagInput.value);
      tagInput.value = "";
      document.getElementById("undo-img").style.display = "block";
      tagPlussesEventListener();
    }
  }
}

/**
 * Clears the linkInput field upon backspace key press
 * @param {event} key - A keydown event
 */
function backspaceClear(key) {
  if (key.code === "Backspace") {
    clearFields();
  }
}

function createAllTags(paste) {
  let re = /\w+/g;
  regArray = paste.match(re);
  let i = 0;
  for (const tag of regArray) {
    if (STATE.tags[tag]) {
      Utils.createExistingTag(tag);
      regArray.splice(i, 1, "");
    } else if (STATE.exceptions.includes(tag)) {
      regArray.splice(i, 1, "");
    } else {
      Utils.createNewTag(tag);
      if (i !== regArray.length - 1) {
        document.getElementById("tags").innerHTML += plusses;
      }
    }
    i++;
  }
  tagPlussesEventListener();
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
  createAllTags(inputValue);
  document.getElementById("undo-img").style.display = "none";
}

function clearFields() {
  removeAllChildNodes(tagsParent);
  removeAllChildNodes(existTagsParent);
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("clear").style.display = "none";
  linkInput.value = "";
  titleInput.value = "";
  tagInput.value = "";
  setFocusLinkInput();
  document.getElementById("title-input").style.display = "none";
  document.getElementById("new-tag-input").style.display = "none";
  if ((document.getElementById("undo-img").style.display = "block")) {
    document.getElementById("undo-img").style.display = "none";
  }
}

/**
 * Adds a tile into the UI
 * @param {string} title - The title of the tile
 * @param {string} url - The URL of the tile
 */
function createTile(title, url) {
  tileDiv =
    '<div class="tile-container"><a href="' +
    url +
    '" target="_blank"><div class="tile"></div></a><div class="title"><a href=" ' +
    url +
    '" target="_blank"><p>' +
    title +
    "</p></a></div></div>";
  document.getElementById("tiles").innerHTML += tileDiv;
}

function submit() {
  storeTags();
  createTile(titleInput.value, linkInput.value);
  clearFields();
  document.getElementById("title-input").style.display = "none";
  setFocusLinkInput();
}

function pathIntoTitleInput(paste) {
  let reg1 = /\/([^\/]+)\/?$/;
  pathArr = paste.match(reg1);
  let reg2 = /\w+/g;
  titleArray = pathArr[1].match(reg2);
  for (var i = 0; i < titleArray.length; i++) {
    titleCapitalWord = Utils.capitalizeString(titleArray[i]);
    titleInput.value += titleCapitalWord + " ";
  }
}

function storeTags() {
  const url = linkInput.value;
  const title = titleInput.value;
  let newTags = document.getElementsByClassName("tagged");
  let existTags = document.getElementsByClassName("exist-tagged");
  //let largerArray = Math.max(newTags.length, existTags.length);
  let tileNo = Object.keys(STATE.tiles).length + 1;
  let newTile = "tile" + tileNo;

  STATE.tiles[newTile] = { id: tileNo, url: url, title: title, tags: [] };

  for (var i = 0; i < newTags.length; i++) {
    newTagProp = newTags[i].textContent;
    STATE.tags[newTagProp] = { tiles: [] };
    STATE.tags[newTagProp].tiles.push(newTile);
    STATE.tiles[newTile].tags.push(newTagProp);
  }

  for (var i = 0; i < existTags.length; i++) {
    existTagProp = existTags[i].textContent;
    STATE.tags[existTagProp].tiles.push(newTile);
    STATE.tiles[newTile].tags.push(existTagProp);
  }
}

/**
 * Retrieves the tiles from STATE and prints them on the UI on startup
 */
function printExistingTiles() {
  // Loop over all the STATE.tiles values
  for (const tile of Object.values(STATE.tiles)) {
    const { title, url } = tile;
    createTile(title, url);
  }
}
printExistingTiles();
