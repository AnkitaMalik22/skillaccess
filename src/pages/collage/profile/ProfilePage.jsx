import React from "react";
import Profile from "../../../components/collage/profile/home/Profile";
import CollageLayout from "../../../layout/Collage";
import { getCreditDetails } from "../../../redux/collage/dummySlice";
import { useDispatch ,useSelector} from "react-redux";


const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn, logoutError, USER_LOADING } = useSelector(
    (state) => state.collageAuth
  );


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
      <button onClick={()=>dispatch(getCreditDetails(user._id))}>click</button>
      <Profile />
    </CollageLayout>
  );
};

export default ProfilePage;
