import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/form.scss";
import "./styles/header.scss";
import "./styles/footer.scss";

// import { checkForName } from "./js/nameChecker";

import { handleSubmit } from "./js/formHandler";

document.getElementById("form").addEventListener("click", handleSubmit);

// alert("READY");
