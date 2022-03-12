import * as React from "react";
import AboutUs from "../src/components/about-us";

export default function HelpOutline() {
  const handleChange = (event) => {
    localStorage.setItem(
      "collectDataConsentValue",
      JSON.stringify(event.target.checked)
    );
  };

  return <AboutUs handleChange={handleChange} />;
}
