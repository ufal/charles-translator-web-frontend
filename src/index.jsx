import bootstrapInternacionalization from "./i18n";
import { createRoot } from "react-dom/client";
import { Application } from "./Application";
import { bootstrapAnalytics } from "./bootstrapAnalytics";

/**
 * Starts up the entire translator frontend app
 */
async function bootstrapApplication() {
  
  // register the page view analytics event
  bootstrapAnalytics();

  // the detected language has to be loaded, before the app starts
  await bootstrapInternacionalization();

  // create the React application
  const appElement = document.getElementById("app");
  const root = createRoot(appElement);
  root.render(<Application />);
}

// this is the main entrypoint to everything
bootstrapApplication();
