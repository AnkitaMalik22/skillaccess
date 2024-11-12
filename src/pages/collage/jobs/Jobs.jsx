import React,{useEffect} from "react";
import Header from "../../../components/company/JobsHeader";
import { BsGeoAlt } from 'react-icons/bs';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from "react-redux";
import { getAllJobs } from "../../../redux/collage/jobs/collegeJobSlice";


const JobsPage = () => {
    const navigate = useNavigate() ;
    const dispatch = useDispatch();
    const { user } = useSelector(
      (state) => state.collageAuth
    );
      const { jobs } = useSelector((state) => state.collegeJobs);
   

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
  const handleFilterJobs = (e) => {
  }

  useEffect(() => {
    console.log(jobs , "jobs");
    dispatch(getAllJobs( user?._id));

  }, []);


  return (
 
     <>
    <div className="flex w-full mx-auto justify-between mb-6">
        <div className="flex gap-3">
          <button
            className="self-center object-center rounded-lg h-10 w-10 "
            // onClick={() => navigate('collage/companies')}
          >
            <img src="../../images/icons/sales.jpg" alt="icon" />
          </button>
          <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
           Jobs
          </h2>
        </div>
        <div className=" rounded-xl w-full sm:h-12 h-10 flex">
          <span className="w-fit mx-auto flex self-center bg-[#F8F8F9] rounded-xl px-5 py-3 gap-3">
            <IoIosSearch className="self-center w-6 h-6 bg-gray-100 rounded-s-lg text-gray-400 " />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleFilterJobs}
              className="placeholder p-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 md:gap-10 md:gap-y-[30px] gap-y-4 ">

{
    jobs && jobs?.map((job) => (
      <div className=" w-[40%] 2xl:w-1/3 h-auto bg-[#f8f8f9] my-3 text-start font-bold text-black rounded-2xl  font-dmSans p-5 "  key={job.id}>
      <div className="logo flex ">
        <div className="w-24 h-24 flex items-center ">
          <img
            src="../../images/companyLogo.png"
            alt=""
            className=" rounded-2xl "
          />
        </div>
        <h2 className="mb-2 ml-2 line-clamp-2 break-words self-center">
            {job?.companyName}
        </h2></div>

      <div className='flex flex-row items-start justify-between'>
        <span className="self-center">
        {job?.JobTitle}

        </span>
        <span className='text-gray-400 font-medium text-sm font-dmSans  self-center'> {
        job?.createdAt}
        </span>

        <div className='flex items-start justify-between   h-full my-2'>
        jobs
        </div>
      </div>
      <div className="location flex flex-row items-start my-3 ">
        <BsGeoAlt className="w-6  h-6 mr-3 " />
        <h2 className='text-gray-400 font-medium text-base font-dmSans sm:mb-2'>Greater Bengaluru, Bengaluru Area</h2>
      </div>

      <h2 className="my-6  line-clamp-2 break-words self-center">Google Analytics

      </h2>
   
        <p className="text-sm py-2 text-gray-400 ">
           Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae….
        </p>
      <div className="flex flex-row items-start justify-between my-3">
      <p className="text-[#e45b39] text-sm">Final Date 05/12/22</p>

        <button className="bg-blued text-white rounded-2xl text-xs font-bold flex gap-2 px-7 py-2 "
          onClick={() => navigate(`/collage/job/overview/${job?._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
    ))
}
     </div>
     
     </>
  
  );
};

export default JobsPage;
