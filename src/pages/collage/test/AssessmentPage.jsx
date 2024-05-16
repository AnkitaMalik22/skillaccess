import React, { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "../../../components/ErrorBoundry";
const Assessment = lazy(() =>
  import("../../../components/collage/test/assessment/Assessment")
);
const CollageLayout = lazy(() => import("../../../layout/Collage"));

const AssessmentPage = () => {
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
    <ErrorBoundary FallbackComponent={Fallback} onReset={() => {}}>
      <Suspense fallback={<>loading</>}>
        <CollageLayout>
          <Assessment />
        </CollageLayout>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AssessmentPage;
