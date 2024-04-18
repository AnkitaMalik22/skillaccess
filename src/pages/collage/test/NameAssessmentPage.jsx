import React from "react";
import { useSearchParams } from "react-router-dom";

import Name from "../../../components/collage/test/nameAssessment/Name";
import NameAdaptive from "../../../components/collage/test/nameAssessment/NameAdaptive";
import CollageLayout from "../../../layout/Collage";

const NameAssessmentPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("level");




   React.useEffect(() => {
   
    let scriptLoaded = false;
    const currentPageLanguage = document.documentElement.lang;
    console.log(currentPageLanguage + " " + navigator.language);

    let script = document.createElement("script");
    const loadGoogleTranslateScript = () => {
      if (!scriptLoaded) {
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.onload = () => {
          window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: currentPageLanguage,
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


if(navigator.language !== navigator.currentPageLanguage) {
  console.log("Language is different");
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
}, []);
  return (
    <CollageLayout>
   {type !== "adaptive" ? <Name /> : <NameAdaptive />}
    </CollageLayout>
  );
};

export default NameAssessmentPage;
