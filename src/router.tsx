import { createHashRouter } from "react-router-dom";
import { TranslatorPage } from "./ui/TranslatorPage";
import { NewTranslatorPage } from "./ui/NewTranslatorPage";
import { LegalRoot } from "./ui/LegalRoot";
import { PrivacyPolicyPage } from "./ui/PrivacyPolicyPage";

export const router = createHashRouter([
  {
    index: true,
    element: <NewTranslatorPage />,
  },
  {
    element: <LegalRoot />,
    children: [
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
      },
    ],
  },
]);
