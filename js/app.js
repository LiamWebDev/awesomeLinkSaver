function setFocusLinkInput() {
  document.getElementById("link-input").focus();
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
}

const LinkInput = document.querySelector("input#link-input");

LinkInput.addEventListener("paste", (event) => {
  let paste = event.clipboardData.getData("text");
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
});
