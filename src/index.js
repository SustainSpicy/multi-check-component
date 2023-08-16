import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import MultiCheckContextProvider from "./providers/multiCheck/MulticheckProvider";

const rootElement = document.createElement("div");
rootElement.setAttribute("id", "root");
document.body.appendChild(rootElement);

ReactDOM.render(
  <MultiCheckContextProvider>
    <App />
  </MultiCheckContextProvider>,
  document.getElementById("root")
);
