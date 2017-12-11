import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WebcamComponent from "./components/WebcamComponent";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<WebcamComponent />, document.getElementById("root"));
registerServiceWorker();
