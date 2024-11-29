import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/company/JobsHeader";
import JobCard from "../../../components/company/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../../redux/company/jobs/jobSlice";
import { LoaderIcon } from "react-hot-toast";
import Loader from "../../../components/CircularLoader"

const JobsPage = () => {
  const dispatch = useDispatch();
  const { data: userDetails } = useSelector((state) => state.companyAuth);
  const { jobs, cursor } = useSelector((state) => state.job);
const [loading, setLoading] = useState(false);
const LoadMoreRef = useRef();

  React.useEffect(() => {
    let scriptLoaded = false;
    const currentPageLanguage = document.documentElement.lang;
    //console.log(currentPageLanguage + " " + navigator.language);

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

    if (navigator.language !== navigator.currentPageLanguage) {
      //console.log("Language is different");
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

  useEffect(() => {
    if (userDetails?._id) {
      // console.log(userDetails._id);
      dispatch(getJobs({ companyId: userDetails._id, cursor, limit: 10 }));
      // dispatch(getJobs(userDetails._id));
    }
  }, [dispatch, userDetails?._id]);


  return (

    <>

      <Header />
      <div className="flex flex-wrap gap-5 md:gap-10 md:gap-y-[30px] gap-y-4  h-[70vh] overflow-y-scroll" onScroll={(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;

        // Check if the user has scrolled to the bottom
        if (scrollTop + clientHeight >= scrollHeight) {

        cursor!==null &&  LoadMoreRef.current.click();
        }
      }}>
        {
          jobs && jobs?.map((job, index) => {

            return (
              <JobCard job={job} key={job._id} />
            )
          })
        }
        <button ref={LoadMoreRef} onClick={async () => {
          !loading && await  dispatch(getJobs({ companyId: userDetails._id, cursor, limit: 10 }));
        
        }}>{loading ? <Loader />:""  }  </button>
      </div>

    </>

  );
};

export default JobsPage;
