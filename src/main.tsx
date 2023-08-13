import ReactDOM from "react-dom/client";
import App from "./App";
import "index.css";

// eslint-disable-next-line import/prefer-default-export
export const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(<App />);
