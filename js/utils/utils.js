console.log("utils")

const isValidURL = (urlString) => {
    try {
        const url = new URL(urlString);
        return true;
    } catch (error) {
        return !(error instanceof TypeError);
        // return false;
    }
}

// try {
//     const urlDomain = new URL(urlFull).hostname;
//     const urlPath = new URL(urlFull).pathname;
//     createAllTags(urlDomain, urlPath);
//     Utils.toggleElementVisibility("submit-btn", true, "block");
//     Utils.toggleElementVisibility("title-input", true);
//     Utils.toggleElementVisibility("new-tag-input", true);
//     Utils.toggleElementVisibility("fav-img", true);
//     pathIntoTitleInput(urlPath);
//     setFocusLinkInput();
// } catch (error) {
//     let { message } = error;
//     if (message === "Failed to construct 'URL': Invalid URL") {
//         message = "Please provide a proper URL";
//     }
//     console.error("[catched] error : ", error);
//     Utils.alertErrorMsg(`Ups! I didn't like that!: ${message}`);
// }