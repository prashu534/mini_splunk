import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

// ROOT ELEMENT

const rootElement =
  document.getElementById("root");

// CREATE ROOT

const root =
  ReactDOM.createRoot(rootElement);

// RENDER APP

root.render(

  <React.StrictMode>

    <App />

  </React.StrictMode>

);