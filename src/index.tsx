import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import 'semantic-ui-css/semantic.min.css';

const rootElement = document.createElement("div");
rootElement.id = "frontdoor-app";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
    position: fixed;
    color: #fff;
    left: 0;
    top: 0;
    width: 400px;
    box-shadow: rgba(70, 70, 70, 0.314) 2px 2px 3px 3px;
    color: rgb(255, 255, 255);
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: start;
  }
`;
document.body.appendChild(rootElement);
// document.body.appendChild(globalStyles);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);