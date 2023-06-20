import React from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
import UserList from "./UserList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserList />
  </React.StrictMode>
);
