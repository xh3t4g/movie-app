import { createRoot } from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";

createRoot(document.querySelector('#root')).render(
    <HashRouter>
        <App />
    </HashRouter>
)
