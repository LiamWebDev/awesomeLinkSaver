/* globals Utils */
const STATE = {
  domains: {
    "www.reddit.co.uk": {
      domain: "www.reddit.co.uk",
      tiles: ["tile1"],
    },
    "medium.com": {
      domain: "medium.com",
      tiles: ["tile2"],
    },
    "www.youtube.com": {
      domain: "www.youtube.com",
      tiles: ["tile3"],
    },
  },
  tags: {
    https: {
      tiles: ["tile1", "tile3"],
    },
    loops: {
      tiles: ["tile2"],
    },
    arrays: {
      tiles: ["tile3"],
    },
    javascript: {
      tiles: ["tile2"],
    },
  },
  exceptions: ["to", "the", "best"],
  tiles: {
    tile1: {
      id: 1,
      domain: "www.reddit.co.uk",
      url: "https://www.reddit.co.uk/example",
      title: "Reddit Article",
      tags: ["https"],
    },
    tile2: {
      id: 2,
      domain: "medium.com",
      url:
        "https://medium.com/@js_tut/the-complete-guide-to-loops-cfa6522157e9",
      title: "The Complete Guide To Loops",
      tags: ["loops", "guide", "javascript"],
    },
    tile3: {
      id: 3,
      domain: "www.youtube.com",
      url: "https://www.youtube.com/video-example",
      title: "YouTube Video Article",
      tags: ["https", "arrays"],
    },
  },
};

/**
 * creates or updates domain object in state
 * @param {string} domainURL - The current URL's domain
 * @param {string} tile - The new tile being created
 */
const updateDomainInState = (domainURL, tile) => {
  const domainExists = STATE.domains[domainURL];
  if (domainExists) {
    STATE.domains[domainURL].tiles.push(tile);
  } else {
    STATE.domains[domainURL] = {
      domain: domainURL,
      tiles: [tile],
    };
  }
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
  Utils.toggleElementVisibility("undo-img", true, "block");
}

const linkInput = document.querySelector("input#link-input");
const titleInput = document.querySelector("input#tile-title");
const tagInput = document.querySelector("input#new-tag-name");
const tagsParent = document.getElementById("tags");
const existTagsParent = document.getElementById("exist-tags");
const errorDiv = document.querySelector("div#error-msg");
const domainTagDiv = document.querySelector("div#domain-tag");

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
    let urlFull = event.clipboardData.getData("text");
    removeAllChildNodes(tagsParent);
    Utils.toggleElementVisibility("clear", true);
    if (checkURL(urlFull)) {
      Utils.alertErrorMsg("Duplicate URL Detected!");
    } else {
      titleInput.value = "";
      const urlDomain = new URL(urlFull).hostname;
      const urlPath = new URL(urlFull).pathname;
      createAllTags(urlDomain, urlPath);
      Utils.toggleElementVisibility("submit-btn", true, "block");
      Utils.toggleElementVisibility("title-input", true);
      Utils.toggleElementVisibility("new-tag-input", true);
      pathIntoTitleInput(urlPath);
      setFocusTitleInput();
    }
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
      Utils.toggleElementVisibility("undo-img", true, "block");
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

/**
 * Creates the tags in the UI
 * @param {string} domain - The domain of the pasted URL
 * @param {string} path - The path of the pasted URL
 */
function createAllTags(domain, path) {
  domainTagDiv.innerHTML = domain;
  Utils.toggleElementVisibility("domain-tag", true);
  let re = /\w+/g;
  let tagArray = path.match(re);
  let i = 0;
  for (const tag of tagArray) {
    if (STATE.tags[tag]) {
      Utils.createExistingTag(tag);
      tagArray.splice(i, 1, "");
    } else if (STATE.exceptions.includes(tag)) {
      tagArray.splice(i, 1, "");
    } else {
      Utils.createNewTag(tag);
      if (i !== tagArray.length - 1) {
        document.getElementById("tags").innerHTML += plusses;
      }
    }
    i++;
  }
  tagPlussesEventListener();
}

/**
 * Creates the tags in the UI
 * @param {object} parent - The DOM element for removing children
 */
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function undo() {
  removeAllChildNodes(tagsParent);
  removeAllChildNodes(existTagsParent);
  inputValue = linkInput.value;
  const urlDomain = new URL(inputValue).hostname;
  const urlPath = new URL(inputValue).pathname;
  createAllTags(urlDomain, urlPath);
  Utils.toggleElementVisibility("undo-img", false);
}

function clearFields() {
  removeAllChildNodes(tagsParent);
  removeAllChildNodes(existTagsParent);
  removeAllChildNodes(domainTagDiv);
  Utils.toggleElementVisibility("submit-btn", false);
  Utils.toggleElementVisibility("clear", false);
  Utils.toggleElementVisibility("error-msg", false);
  Utils.toggleElementVisibility("domain-tag", false);
  linkInput.value = "";
  titleInput.value = "";
  tagInput.value = "";
  setFocusLinkInput();
  Utils.toggleElementVisibility("title-input", false);
  Utils.toggleElementVisibility("new-tag-input", false);
  if ((document.getElementById("undo-img").style.display = "block")) {
    Utils.toggleElementVisibility("undo-img", false);
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
  Utils.toggleElementVisibility("title-input", false);
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
  const currentDomain = document.getElementById("domain-tag").innerHTML;
  const url = linkInput.value;
  const title = titleInput.value;
  let newTags = document.getElementsByClassName("tagged");
  let existTags = document.getElementsByClassName("exist-tagged");
  let tileNo = Object.keys(STATE.tiles).length + 1;
  let newTile = "tile" + tileNo;

  // new tile object
  STATE.tiles[newTile] = {
    id: tileNo,
    domain: currentDomain,
    url: url,
    title: title,
    tags: [],
  };

  // adds new tags to tags object
  // and adds new tags to new tile object
  for (var i = 0; i < newTags.length; i++) {
    newTagProp = newTags[i].textContent;
    STATE.tags[newTagProp] = { tiles: [] };
    STATE.tags[newTagProp].tiles.push(newTile);
    STATE.tiles[newTile].tags.push(newTagProp);
  }

  // adds new tile to existing tag object
  // and adds tag to new tile object
  for (var i = 0; i < existTags.length; i++) {
    existTagProp = existTags[i].textContent;
    STATE.tags[existTagProp].tiles.push(newTile);
    STATE.tiles[newTile].tags.push(existTagProp);
  }

  // creates or updates domain object in state
  updateDomainInState(currentDomain, newTile);
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

/**
 * Checks whether the pasted URL already exists in the tiles object
 */
function checkURL(link) {
  for (const existLink of Object.values(STATE.tiles)) {
    if (existLink.url === link) {
      return true;
    }
  }
  return false;
}
