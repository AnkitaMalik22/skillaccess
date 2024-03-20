import React, { useState } from "react";

// import { useSelector, useDispatch } from "react-redux";
// import { getCompany } from "../../../../redux/collage/dashboard/dashboardSlice";
import Folder from "../home/icon/Folder";
import Header from "./Header";

const Topic = () => {
  const [topics, settopics] = useState([1, 2, 3, 4, 5, 6, , 9, 6]);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCompany());
  // }, [dispatch]);

  return (
    <div className="w-[95%] mx-auto font-dmSans">
      <Header />
      <div className="flex flex-wrap gap-4 w-fit justify-center bg-gray-100 px-3 py-6 rounded-3xl">
        <div className="w-full flex justify-between px-6 mb-2">
          <h2 className="font-bold text-xl">Choose a Topic</h2>{" "}
          <div className="flex">
            {" "}
            <input
              type="checkbox"
              name=""
              id=""
              className="bg-[#DEEBFF] rounded border-0 self-center"
            />
            <label className="text-sm pl-1 self-center">Delete Selected</label>
          </div>
        </div>

        {topics &&
          topics?.map((company, index) => {
            return (
              <div className=" w-[17rem] mb-4 bg-white rounded-2xl" key={index}>
                <figure>
                  <img src="../../images/FrontEnd.png" alt="cover photo" />
                </figure>
                <div className="card-body">
                  <h2 className="font-bold text-xl">Name</h2>
                  <div className="flex gap-2">
                    <Folder />
                    <p className="text-[#95ACFA] text-sm">40 Files</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Topic;
