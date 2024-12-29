// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./src/Components/App/App.tsx";

const rootElement = document.getElementById("root");

if(!rootElement) {
  throw new Error("Root element not found");
}

const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
