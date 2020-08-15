const Utils = {
  capitalizeString,
  createExistingTag,
  createNewTag,
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