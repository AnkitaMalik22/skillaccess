// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const loadGoogleTranslateScript = () => {
//   return new Promise((resolve) => {
//     if (
//       !document.querySelector(
//         'script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
//       )
//     ) {
//       const script = document.createElement("script");
//       script.src =
//         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       script.onload = resolve;
//       document.body.appendChild(script);
//     } else {
//       resolve();
//     }
//   });
// };

// const initializeGoogleTranslate = (currentLanguage) => {
//   if (!window.googleTranslateElementInit) {
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: currentLanguage,
//           includedLanguages: "en-US,en,hi,bn,ta,te,mr,gu,kn,ur,pa,ml,or", // Add more languages as needed
//         },
//         "google_translate_element"
//       );
//     };
//   }
//   if (window.googleTranslateElementInit) {
//     window.googleTranslateElementInit();
//   }
// };

// function //useTranslate() {
//   const location = useLocation();
//   const [currentLanguage, setCurrentLanguage] = useState(
//     document.documentElement.lang
//   );

//   useEffect(() => {
//     loadGoogleTranslateScript().then(() => {
//       initializeGoogleTranslate(currentLanguage);
//     });
//   }, [currentLanguage]);

//   useEffect(() => {
//     const handleLanguageChange = () => {
//       const newLanguage = document.documentElement.lang;
//       if (newLanguage !== currentLanguage) {
//         setCurrentLanguage(newLanguage);
//       }
//     };

//     handleLanguageChange(); // Initial call to set the language on mount
//     const observer = new MutationObserver(handleLanguageChange);
//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["lang"],
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, [currentLanguage]);

//   return null;
// }

// export default useTranslate;

import { useEffect, useState } from "react";

function useTranslate() {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("preferredLanguage") || document.documentElement.lang
  );
  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = document.documentElement.lang;
      if (newLanguage !== currentLanguage) {
        setCurrentLanguage(newLanguage);
        localStorage.setItem("preferredLanguage", newLanguage);
      }
    };
    handleLanguageChange(); // Initial call to set the language on mount
    const observer = new MutationObserver(handleLanguageChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    return () => {
      observer.disconnect();
    };
  }, [currentLanguage]);
  return currentLanguage;
}
export default useTranslate;
