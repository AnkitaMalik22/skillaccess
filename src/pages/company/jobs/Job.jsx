import React,{useEffect} from "react";
import Header from "../../../components/company/JobsHeader";
import JobCard from "../../../components/company/JobCard";
import { useDispatch , useSelector } from "react-redux";
import { getJobs } from "../../../redux/company/jobs/jobSlice";

const JobsPage = () => {
    const dispatch = useDispatch();
    const {data: userDetails }= useSelector((state) => state.companyAuth);
    const {jobs} = useSelector((state) => state.job);
   

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
    console.log(jobs , "jobs");
    dispatch(getJobs( userDetails?._id));

  }, [dispatch,userDetails]);


  return (
 
     <>
     <Header />
     <div className="flex flex-wrap mx-1 w-fit justify-center gap-4 ">
{
    jobs && jobs?.map((job) => (
        <JobCard job={job} key={job._id} />
    ))
}
     </div>
     
     </>
  
  );
};

export default JobsPage;
