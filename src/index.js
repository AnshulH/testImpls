import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.js";
import store from "./store/store.js";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);