import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./assets/global.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
    </PersistGate>
  </Provider>
);