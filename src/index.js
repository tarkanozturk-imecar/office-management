import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";

import setupInterceptors from "./services/setupInterceptors";
import { ConfigProvider } from "./contexts/ConfigContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ConfigProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);

setupInterceptors(store);

serviceWorker.unregister();
