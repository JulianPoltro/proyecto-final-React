import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./Style/style.css";


const root = document.getElementById("root");
const app = createRoot(root);

app.render(<App />);
