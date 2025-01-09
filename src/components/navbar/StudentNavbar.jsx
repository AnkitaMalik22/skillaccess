import React from "react";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const navigate = useNavigate();
  const goToProfile = () => {
    // Function to navigate to profile page
    navigate("/student/profile"); // Use navigate function to navigate to desired URL
  };
  const userDetails = useSelector((state) => state.studentAuth);

  // //console.log(userDetails)

  //   let scriptLoaded = false;

  //   const loadGoogleTranslateScript = () => {
  //     if (!scriptLoaded) {
  //       const script = document.createElement('script');
  //       script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  //       script.async = true;

  //       // Use a closure to maintain access to the script variable
  //       script.onload = () => {
  //         window.googleTranslateElementInit = () => {
  //           new window.google.translate.TranslateElement(
  //             {
  //               pageLanguage: 'en',
  //               includedLanguages: 'en,hi,bn,ta,te,mr,gu,kn,ur,pa,ml,or', // Add more languages as needed
  //             },
  //             'google_translate_element'
  //           );
  //         };
  //       };

  //       document.body.appendChild(script);
  //       scriptLoaded = true;
  //     }
  //   };

  //   loadGoogleTranslateScript();

  //   return () => {
  //     // Clean up script when component unmounts
  //     if (scriptLoaded) {
  //       // document.body.removeChild(script);
  //       scriptLoaded = false;
  //     }
  //   };
  // }, []);

  return (
    <div className="border border-y-1 sorder border-gray-500 bg-white w-full z-[9999] m-0 fixed top-0">
      <div className="navbar flex justify-between ">
        {/* left */}
        <div>
          {/* mobile only */}
          <button
            className="btn btn-primary sm:hidden "
            onClick={() => props.setOpen(!props.open)}
          >
            hamb
          </button>

          <div className="">
            {" "}
            <img src="/images/logo.png" alt="" />
          </div>
        </div>

        {/* right */}
        <div className="flex gap-3">
          {/* noifiaction */}
          <button className="border-2 border-gray-400  text-gray-400 rounded-md p-2 relative">
            <FiBell className="text-lg" />{" "}
            <div className="rounded-full h-2 w-2 bg-lightBlue absolute top-1 right-2"></div>
          </button>

          {/* noifiaction */}
          <button
            className="border-2 border-gray-400  rounded-md p-1 relative flex gap-2 "
            style={{ marginRight: "12rem" }}
            onClick={goToProfile}
          >
            <img
              src={userDetails?.user?.avatar?.url}
              alt=""
              className="h-7 w-7"
            />{" "}
            <h2 className="pr-2 text-sm font-bold self-center font-dmSans italic">
              Hello {userDetails?.user?.FirstName}
            </h2>
          </button>

          {/* noifiaction */}

          {/* noifiaction */}
          {/* <button className="border-none   rounded-md p-2 relative"> */}
          {/* <div className="border-2 border-gray-400  text-gray-400 rounded-md p-1 relative">
            <div className="rounded-full h-7 w-7 bg-gradient-to-b from-red-600 to-slate-800 "
            style={{backgroundImage: `url(${languages[language].image})`}}
            >
              <img src={languages[language].image} alt="" className="h-7 w-7" />
            </div>
          </div> */}

          {/* <FaAngleDown className="" /> */}
          <div id="google_translate_element" className="google-div"></div>
          {/* <select
            
              className="border-none bg-transparent"
              onChange={(e) => changeLanguage(e.target.value)}
            >
              {languages.map((lang, index) => (
                <option key={index} value={index}>
                  <img src={lang.image} alt="" className="w-6 h-6" />
                  {lang.name}
                </option>
              ))}
            </select>

          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
