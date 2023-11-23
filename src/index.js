import { createRoot } from "react-dom/client";
import { Application } from "./Application";

import '../i18n'

const appElement = document.getElementById("app");
const root = createRoot(appElement);
root.render(<Application />);
