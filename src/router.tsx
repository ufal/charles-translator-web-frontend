import { createBrowserRouter } from "react-router-dom";
import { TranslatorPage } from "./ui/TranslatorPage";
import { LegalRoot } from "./ui/LegalRoot";

export const router = createBrowserRouter([
  {
    index: true,
    element: <TranslatorPage />,
  },
  {
    element: <LegalRoot />,
    children: [
      {
        path: "privacy-policy",
        element: <div>Privacy policy page!</div>,
      },
    ],
  },
]);
