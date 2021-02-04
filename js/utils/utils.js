const isValidURL = (urlString) => {
    try {
        const url = new URL(urlString);
        return true;
    } catch (error) {
        return !(error instanceof TypeError);
        // return false;
    }
}
