import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/ReactToastify.min.css";
import App from "./App.tsx";
import "./index.css";
import ReduxProvider from "./providers/ReduxProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </BrowserRouter>
  </>
);
