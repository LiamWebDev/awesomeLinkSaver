function setFocusLinkInput(){
    document.getElementById("link-input").focus();
}

function setTagged(button){
    button.classList.toggle('tagged');
}

function join(element) {
    console.log("element: ", element.target);
    const previousTagText = element.target.previousSibling.textContent;
    let nextTagText = null;
    if (element.target.nextSibling) {
      nextTagText = element.target.nextSibling.textContent;
    }
    console.log("previous tag value: ", previousTagText);
    console.log("next tag value: ", nextTagText);
  }



const LinkInput = document.querySelector('input#link-input');

LinkInput.addEventListener("paste", (event) => {
    let paste = event.clipboardData.getData("text");
    let re = /\w+/g;
    regArray = paste.match(re);
    for (var i = 0; i < regArray.length; i++) {
      tagDiv = '<div class="tag" onclick="setTagged(this)">' + regArray[i] + '</div>';
      plusses = '<div class="plus">' + '+' + '</div>';
      document.getElementById("tags").innerHTML += tagDiv;
      document.getElementById("tags").innerHTML += plusses;
    }
    document.querySelectorAll(".plus").forEach((plusElm) => {
      plusElm.addEventListener("click", (e) => {
        join(e);
      });
    });
  });