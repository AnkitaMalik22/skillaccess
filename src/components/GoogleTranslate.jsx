import React, { useEffect } from "react";
const loadGoogleTranslateScript = () => {
  return new Promise((resolve) => {
    if (
      !document.querySelector(
        'script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
      )
    ) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onload = resolve;
      document.body.appendChild(script);
    } else {
      resolve();
    }
  });
};
const initializeGoogleTranslate = (currentLanguage) => {
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: currentLanguage,
        includedLanguages: "en,hi,bn,ta,te,mr,gu,kn,ur,pa,ml,or", // Add more languages as needed
      },
      "google_translate_element"
    );
  };
  if (window.google && window.google.translate) {
    window.googleTranslateElementInit();
  }
};
function GoogleTranslate({ currentLanguage }) {
  useEffect(() => {
    setTimeout(() => {
      loadGoogleTranslateScript().then(() => {
        initializeGoogleTranslate(currentLanguage);
      });
    }, 10);
  }, [currentLanguage]);
  return <div id="google_translate_element" className="google-div"></div>;
}
export default GoogleTranslate;
