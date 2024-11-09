import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getAllTests } from "../../../../redux/collage/test/thunks/test";
import Skeleton from "../../../loaders/Skeleton";
import { TbFileDownload } from "react-icons/tb";
import toast from "react-hot-toast";


const List = ({ FilterdStudents, isLoading }) => {
  // const arr = [2, 1, 1, 1, 1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assessments = useSelector((state) => state.test.assessments);
  const beginner = useSelector((state) => state.test.assessments.beginner);


  // asessments ={beginner: Array(2), intermediate: Array(0), advanced: Array(0)} write in one array

  let arr = assessments.beginner.concat(
    assessments.intermediate,
    assessments.advanced,
    assessments.adaptive
  );

  let totalStudentsAppeared = 0;
  let totalStudentsSelected = 0;
  let overallPerformance = 0;
  // //console.log(FilterdStudents);
  useEffect(() => {
    // dispatch(getCollege());
    dispatch(getAllTests());
  }, [dispatch]);

  // const getProgressBarColor = (percentage) => {
  //   if (percentage === 0) {
  //     return ""; // Return empty string for transparent
  //   } else if (percentage > 0 && percentage < 33.33) {
  //     return "bg-red-600"; // Red color
  //   } else if (percentage >= 33.33 && percentage < 66.66) {
  //     return "bg-blue-600"; // Blue color
  //   } else {
  //     return "bg-green-600"; // Green color
  //   }
  // };
  // //console.log(getProgressBarColor);

  const percentageData = FilterdStudents?.map((item) => {
    return item.avgPercentage;
  });

  let colors = [];
  if (percentageData) {
    percentageData.forEach((percentage) => {
      let color = "";
      if (percentage === 0) {
        color = "transparent";
      } else if (percentage > 0 && percentage < 33.33) {
        color = "#F44336";
      } else if (percentage >= 33.33 && percentage < 66.66) {
        color = "#FFC107";
      } else {
        color = "#4CAF50";
      }
      colors.push(color);
    });
  }

  const handleResultsDownload = async(assessmentId) => {
    try {
      // Replace the URL with your API endpoint
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assessments/download/${assessmentId}`, {
          method: 'GET',
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'data.xlsx'; // Set the file name for download

      // Append the link to the body
      document.body.appendChild(a);

      // Programmatically click the link to trigger the download
      a.click();

      // Clean up and remove the link
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Download successful');
  } catch (error) {
    toast.error('Download failed');
      console.error('Download failed:', error);
  }
}

  return (
    <div className="w-full mx-auto bg-[#8F92A1] bg-opacity-5 rounded-2xl p-8">
      {/* legend */}
      <div className=" grid-cols-5  text-center  mx-auto  font-dmSans font-bold text-base hidden md:grid">
        <div className="bg-accent bg-opacity-5 rounded-s-2xl p-2 ">
          <h2>Test Name</h2>
        </div>
        <div className="bg-accent bg-opacity-5 p-2">
          <h2>Total Students Appeared</h2>
        </div>
        <div className="bg-accent bg-opacity-5 p-2">
          <h2>Total Students Selected</h2>{" "}
        </div>
        <div className="bg-accent  bg-opacity-5 p-2">
          <h2>Overall Performance</h2>
        </div>
        <div className="bg-accent bg-opacity-5 p-2 rounded-e-2xl">
          <h2>Details</h2>
        </div>
      </div>

      {/* list to be iterated */}
      {isLoading && <Skeleton />}
      {!isLoading &&
        FilterdStudents.map((assessment, index) => (
          <div
            className="grid-cols-5 rounded-2xl my-4 py-2 pl-2 text-center mx-auto font-dmSans text-sm hidden md:grid w-full bg-white border-2 transition-colors duration-300"
            style={{ borderColor: "transparent", borderWidth: "2px" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = colors[index])
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "transparent")
            }
          >
            {" "}
            {/* row-2 */}
            <div className={` flex justify-center `}>
              <div className="flex self-center">
                <span>
                  <h2 className="font-dmSans  sm:text-sm first-letter:uppercase">
                    {assessment?.name}
                  </h2>

                  {/* <h2 className="font-dmSans  sm:text-sm"> */}
                </span>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-center ">
              <div className=" self-center h-fit">
                <span>
                  <h2 className="font-dmSans  sm:text-sm">
                    {assessment?.studentResponses?.length}
                  </h2>
                </span>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-center">
              <div className=" self-center h-fit">
                <span>
                  <h2 className="font-dmSans  sm:text-sm">
                    {assessment?.selectedStudents?.length}
                  </h2>
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" self-center">
                <span className="flex gap-2">
                  <div className="min-w-[6rem] bg-opacity-5 rounded-lg h-3 mx-auto bg-green-600">
                    <div
                      className="h-full rounded-lg"
                      style={{
                        width:
                          assessment.avgPercentage < 0
                            ? 0
                            : assessment.avgPercentage,
                        backgroundColor: colors[index],
                      }}
                    ></div>
                  </div>
                  <h2 className="font-dmSans font-bold text-xs sm:text-xs ">
                    {" "}
                    {assessment?.avgPercentage?.toFixed(2)}%
                  </h2>
                </span>
              </div>
            </div>
          
            <div className="flex  self-center gap-3 justify-center">
            <div
                className="self-center hover:cursor-pointer "
                onClick={() =>
                  navigate(
                    `/collage/results/overview?level=beginner&assessment=${assessment._id}`
                  )
                }
              >
                <h2 className="font-dmSans  text-sm sm:text-base text-blued ">
                  View Details
                </h2>
              </div>
                  <h2 className="font-dmSans font-semibold text-sm sm:text-base self-center cursor-pointer"
                  onClick={() =>handleResultsDownload(assessment?._id)}
                  >
                    <TbFileDownload className="text-lightBlue h-6 w-6" />
                  </h2>
                </div>
          </div>
        ))}
      {!isLoading && FilterdStudents && FilterdStudents?.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <h2 className="font-dmSans text-lg text-gray-500">No result found</h2>
        </div>
      )}
    </div>
  );
};

export default List;
