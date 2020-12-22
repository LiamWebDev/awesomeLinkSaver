/* globals Utils */
const STATE = {
  config: {
    order: "descending",
  },
  domains: {
    "www.reddit.co.uk": {
      domain: "www.reddit.co.uk",
      tiles: ["a", "b", "tile3", "tile1", "tile4", "tile5"],
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
      tiles: ["tile1"],
    },
    loops: {
      tiles: ["tile2", "tile3"],
    },
    arrays: {
      tiles: ["tile3"],
    },
    javascript: {
      tiles: ["tile2", "tile1"],
    },
  },
  exceptions: ["to", "the", "best"],
  tiles: {
    tile1: {
      id: "tile1",
      domain: "www.reddit.co.uk",
      url: "https://www.reddit.co.uk/example",
      title: "Reddit Article",
      tags: ["https"],
      timestamp: 1603235293104,
      favourite: false,
    },
    tile2: {
      id: "tile2",
      domain: "medium.com",
      url:
        "https://medium.com/@js_tut/the-complete-guide-to-loops-cfa6522157e9",
      title: "The Complete Guide To Loops",
      tags: ["loops", "guide", "javascript"],
      timestamp: 1603235293105,
      favourite: true,
    },
    tile3: {
      id: "tile3",
      domain: "www.youtube.com",
      url: "https://www.youtube.com/video-example",
      title: "YouTube Video Article",
      tags: ["https", "arrays"],
      timestamp: 1603235293106,
      favourite: false,
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
const favIcon = document.getElementById("fav-img");
const tagTotalsDiv = document.querySelector(".tag-totals");
let favouriteValue = false;

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
  tileDatasetEventListerner();
  favIconEventListener();
  tagInput.addEventListener("keydown", tagEnterKey);
  linkInput.addEventListener("keydown", backspaceClear);
}

function pasteEventListener() {
  linkInput.addEventListener("paste", (event) => {
    const urlFull = event.clipboardData.getData("text");
    removeAllChildNodes(tagsParent);
    Utils.toggleElementVisibility("clear", true);
    if (checkURL(urlFull)) {
      Utils.alertErrorMsg("Duplicate URL Detected!");
      Utils.toggleElementVisibility("submit-div", false);
    } else {
      Utils.toggleElementVisibility("submit-div", true);
      Utils.toggleElementVisibility("error-msg", false);
      Utils.toggleFavouriteStatus("true", favIcon);
      titleInput.value = "";
      try {
        const urlDomain = new URL(urlFull).hostname;
        const urlPath = new URL(urlFull).pathname;
        createAllTags(urlDomain, urlPath);
        Utils.toggleElementVisibility("submit-btn", true, "block");
        Utils.toggleElementVisibility("title-input", true);
        Utils.toggleElementVisibility("new-tag-input", true);
        Utils.toggleElementVisibility("fav-img", true);
        pathIntoTitleInput(urlPath);
        setFocusLinkInput();
      } catch (error) {
        let { message } = error;
        if (message === "Failed to construct 'URL': Invalid URL") {
          message = "Please provide a proper URL";
        }
        console.error("[catched] error : ", error);
        Utils.alertErrorMsg(`Ups! I didn't like that!: ${message}`);
      }
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
 * Event listener for tile elements that reads dataset containing URL and opens it in a new window when clicked
 */
function tileDatasetEventListerner() {
  document.querySelectorAll(".tile-container").forEach((tile) => {
    tile.addEventListener("click", (e) => {
      e.preventDefault();
      const { url } = e.currentTarget.dataset;
      window.open(url, "_blank");
    });
  });
}

/**
 * Event listerner for star image elements for updating the image and tile object when clicked
 */
function favIconEventListener() {
  document.querySelectorAll(".favs-icon").forEach((star) => {
    star.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      const { favourite } = star.dataset;
      const { id } = star.dataset;

      Utils.toggleFavouriteStatus(favourite, star);
      favStatusUpdate(id, Boolean(favourite));
    });
  });
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

function addFav() {
  const icon = document.getElementById("fav-img");
  favouriteValue = !favouriteValue;
  icon.src = favouriteValue
    ? "./assets/img/star-filled-icon.png"
    : "./assets/img/star-empty-icon.png";
}

function clearFields() {
  removeAllChildNodes(tagsParent);
  removeAllChildNodes(existTagsParent);
  removeAllChildNodes(domainTagDiv);
  removeAllChildNodes(tagTotalsDiv);
  Utils.toggleElementVisibility("submit-btn", false);
  Utils.toggleElementVisibility("clear", false);
  Utils.toggleElementVisibility("error-msg", false);
  Utils.toggleElementVisibility("domain-tag", false);
  Utils.toggleElementVisibility("fav-img", false);
  Utils.toggleElementVisibility("submit-div", true);
  Utils.toggleFavouriteStatus(false, favIcon);
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
function createTile(title, url, favourite, id) {
  if (favourite) {
    favImg =
      '<img class="favs-icon" src="./assets/img/star-filled-icon.png" data-favourite="true" data-id="' +
      id +
      '">';
  } else {
    favImg =
      '<img class="favs-icon" src="./assets/img/star-empty-icon.png" data-favourite="" data-id="' +
      id +
      '">';
  }

  binImg =
    '<img class="bin" src="./assets/img/bin-icon.webp" data-id="' + id + '">';

  tileDiv =
    '<div class="tile-container" data-url="' +
    url +
    '"><div class="tile">' +
    favImg +
    binImg +
    '</div><div class="title"><a href=" ' +
    url +
    '" target="_blank"><p>' +
    title +
    "</p></a></div></div>";
  // document.getElementById("tiles").innerHTML += tileDiv;
  const insertAt =
    STATE.config.order === "descending" ? "afterbegin" : "beforeend";
  document.getElementById("tiles").insertAdjacentHTML(insertAt, tileDiv);
  // afterbegin
}

function submit() {
  const tileId = storeTags();
  createTile(titleInput.value, linkInput.value, favouriteValue, tileId);
  clearFields();
  Utils.toggleElementVisibility("title-input", false);
  setFocusLinkInput();
  tileDatasetEventListerner();
  favIconEventListener();
  showTagsByTotal();
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

/**
 * @returns {string} - The id of thew new tile for UI purpsoses
 */
function storeTags() {
  const currentDomain = document.getElementById("domain-tag").innerHTML;
  const url = linkInput.value;
  const title = titleInput.value;
  let newTags = document.getElementsByClassName("tagged");
  let existTags = document.getElementsByClassName("exist-tagged");

  let tileNo = Object.keys(STATE.tiles).length + 1;
  let newTile = "tile" + tileNo;
  const now = new Date().getTime();

  // new tile object
  STATE.tiles[newTile] = {
    id: newTile,
    domain: currentDomain,
    url: url,
    title: title,
    tags: [],
    timestamp: now,
    favourite: favouriteValue,
  };

  const allTags = mergeArrays(Array.from(newTags), Array.from(existTags));

  for (var i = 0; i < allTags.length; i++) {
    newTagProp = allTags[i].textContent;
    if (!STATE.tags[newTagProp]) {
      STATE.tags[newTagProp] = { tiles: [] };
    }
    STATE.tags[newTagProp].tiles.push(newTile);
    STATE.tiles[newTile].tags.push(newTagProp);
  }
  // creates or updates domain object in state
  updateDomainInState(currentDomain, newTile);
  return newTile;
}

/**
 * Retrieves the tiles from STATE and prints them on the UI on startup
 */
function printLatestTiles() {
  // Loop over all the STATE.tiles values
  const orderedTiles = Object.values(STATE.tiles).sort(
    (a, b) => b.timestamp - a.timestamp
  );
  for (const tile of orderedTiles) {
    const { title, url, favourite, id } = tile;
    createTile(title, url, favourite, id);
  }
  tileDatasetEventListerner();
  favIconEventListener();
}
printLatestTiles();

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

const showTagsByTotal = () => {
  const totalsArray = Object.entries(STATE.tags)
    .reduce((acc, [tag, value]) => {
      return acc.concat({ Tag: tag, Qty: value.tiles.length });
    }, [])
    .sort((a, b) => b.Qty - a.Qty);

  for (const tag of totalsArray) {
    const tagEntry =
      '<div class="tile-container"><div class="tile"><div class="tag-qty">' +
      tag.Qty +
      '</div></div><div class="title"><p>' +
      tag.Tag +
      "</p></div></div>";
    const tagContainer = document.querySelector(".tag-totals");
    tagContainer.insertAdjacentHTML("beforeend", tagEntry);
    // document.getElementById("tag-totals-container").appendChild(tagEntry);
    // document
    //   .getElementById("tag-totals-container")
    //   .insertAdjacentHTML("beforeend", tagEntry);
  }
};
showTagsByTotal();

/**
 * Updates the favourite property in tile objects
 * @param {string} id - The data-id value refering to the tile object key, against a star icon
 * @param {boolean} currFav - The current value refering to favourite status of a tile
 */
function favStatusUpdate(id, currFav) {
  STATE.tiles[id].favourite = currFav ? false : true;
}

const mergeArrays = (arrA, arrB) => [
  ...arrA,
  ...arrB.filter((el) => !arrA.includes(el)),
];

/**
 * Deletes the tile reference from the appropriate objects
 * @param {string} tileRef - The data-id value refering to tile object id
 */
function deleteTile(obj, tileRef) {
  console.log("tileRef: ", tileRef);

  // Show UI changes
  const tileContainer = obj.parentNode.parentNode;
  const prevDisplay = tileContainer.style.display;
  tileContainer.style.display = "none";

  try {
    const tile = STATE.tiles[tileRef];

    // Delete STATE domains
    let index = STATE.domains[tile.domain].tiles.indexOf(tile.id);
    STATE.domains[tile.domain].tiles.splice(index, 1);

    // Delete STATE tags
    tile.tags.forEach((tag) => {
      if (STATE.tags[tag]) {
        index = STATE.tags[tag].tiles.indexOf(tile.id);
        STATE.tags[tag].tiles.splice(index, 1);
      }
    });

    // Delete STATE Tile
    delete STATE.tiles[tileRef];

    // Delete UI
    tileContainer.remove();
  } catch (error) {
    console.log("errror happened: ", error);
    tileContainer.style.display = prevDisplay;
  }
}

/**
 * Event listener for bin icon that deletes relevant objects and properties
 */
function deleteEventListener() {
  document.querySelectorAll(".bin").forEach((bin) => {
    bin.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      const { id } = bin.dataset;
      deleteTile(bin, id);
    });
  });
}
deleteEventListener();
