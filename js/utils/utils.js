//  "URL" utils
const isValidURL = (urlString) => {
    try {
        const url = new URL(urlString);
        return true;
    } catch (error) {
        return !(error instanceof TypeError);
        // return false;
    }
}

/**
 * Retrieves an array of words from a valid URL as string
 * 
 * Input Example: "https://developerjas.medium.com/the-15-advance-vs-code-extensions-for-react-angular-node-asp-net-f78875d92f27"
 * Output Example:  ["developerjas", "medium", "com", "the", "15", "advance", "vs", "code", "extensions", "for", "react", "angular", "node", "asp", "net", "f78875d92f27"]
 * 
 * @param {string} urlStr - The URL string to be searched for
 * @returns {array} - The words/tags found * 
 */
const getTagsFromURL = (urlStr) => {
    let { hostname, pathname } = new URL(urlStr);
    // let { hostname, pathname } = getHostAndPathnameFromURL(urlStr);
    let tags = [];

    // domain analysis
    if (hostname && hostname.length) {
        tags = tags.concat(getWordsFromString(hostname));
    }
    // pathname analysis
    if (pathname && pathname.length) {
        pathname = pathname.slice(1)
        tags = tags.concat(getWordsFromString(pathname));
    }
    return tags;
}

// the-15-advance-vs-code-extensions-for-react-angular-node-asp-net-f78875d92f27"

//  get some "urled" string -> pathname and retreive "english"
const getWordsFromString = (str) => {
    const reWords = /\w+/g;
    return str.match(reWords)
}

function capitalizeString(str) {
    return str[0].toUpperCase() + str.substr(1);
}

// const getHostAndPathnameFromURL = (urlStr) => {
//     let { hostname, pathname } = new URL(urlStr);
//     return { hostname, pathname }
// }