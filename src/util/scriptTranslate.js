// const scriptTranslate = () => {
//   // let scriptLoaded = false;
//   const currentPageLanguage = document.documentElement.lang;
//   //console.log(currentPageLanguage + " " + navigator.language);

//   let script = document.createElement("script");
//   const loadGoogleTranslateScript = () => {
//     if (!scriptLoaded) {
//       script.src =
//         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       script.onload = () => {
//         window.googleTranslateElementInit = () => {
//           new window.google.translate.TranslateElement(
//             {
//               pageLanguage: currentPageLanguage,
//               includedLanguages: "en-US,en,hi,bn,ta,te,mr,gu,kn,ur,pa,ml,or", // Add more languages as needed
//             },
//             "google_translate_element"
//           );
//         };
//       };

//       document.body.appendChild(script);
//       // scriptLoaded = true;
//     }
//   };

//   if (navigator.language !== navigator.currentPageLanguage) {
//     //console.log("Language is different");
//     loadGoogleTranslateScript();
//   }
// };

// export default scriptTranslate;
