import React, { useEffect, useState } from "react";

function useTranslate() {
  const reloadPage = () => {
    window.location.reload();
  };
  const [currentLanguage, setCurrentLanguage] = useState(
    document.documentElement.lang
  );
  console.log(currentLanguage);
  React.useEffect(() => {
    let scriptLoaded = false;
    const currentPageLanguage = document.documentElement.lang;
    console.log(currentPageLanguage + " " + navigator.language);
    setCurrentLanguage(currentPageLanguage);

    let script = document.createElement("script");
    const loadGoogleTranslateScript = async () => {
      console.log("called again");
      if (!scriptLoaded) {
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.onload = () => {
          window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: currentLanguage,
                includedLanguages: "en-US,en,hi,bn,ta,te,mr,gu,kn,ur,pa,ml,or", // Add more languages as needed
              },
              "google_translate_element"
            );
          };
        };

        document.body.appendChild(script);
        scriptLoaded = true;
      }
    };

    if (navigator.language !== navigator.currentLanguage) {
      console.log("Language is different");
      // document.body.removeChild(script);

      loadGoogleTranslateScript();
    }

    // loadGoogleTranslateScript();

    return () => {
      // Clean up script when component unmounts
      if (scriptLoaded) {
        document.body.removeChild(script);
        scriptLoaded = false;
      }
    };
  }, [, currentLanguage]);
  return null;
}

export default useTranslate;
