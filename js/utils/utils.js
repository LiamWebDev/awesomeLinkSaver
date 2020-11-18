const Utils = {
  capitalizeString,
  createExistingTag,
  createNewTag,
  toggleElementVisibility,
  alertErrorMsg,
  toggleFavouriteStatus,
};

function capitalizeString(str) {
  return str[0].toUpperCase() + str.substr(1);
}

function createExistingTag(existingTag) {
  tagDiv =
    '<div class="exist-tag" onclick="setExistTagged(this)">' +
    existingTag +
    "</div>";
  document.getElementById("exist-tags").innerHTML += tagDiv;
}

function createNewTag(newTag) {
  tagDiv = '<div class="tag" onclick="setTagged(this)">' + newTag + "</div>";
  plusses = '<div class="plus">' + "+" + "</div>";
  document.getElementById("tags").innerHTML += tagDiv;
}

function toggleElementVisibility(elemId, show, prop = "flex") {
  document.getElementById(elemId).style.display = show ? prop : "none";
}

function alertErrorMsg(message) {
  errorDiv.innerHTML = message;
  toggleElementVisibility("error-msg", true);
}

function toggleFavouriteStatus(status, element) {
  status
    ? (element.src = "./assets/img/star-empty-icon.png")
    : (element.src = "./assets/img/star-filled-icon.png");

  element.dataset.icon = !status;
}
