import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampusDrives } from "../../../redux/company/campusDrive/campusDriveSlice";
import CampusDriveCard from "../../../components/company/campusDrive/Card";
import { useNavigate } from "react-router-dom";
import { getCompany } from "../../../redux/company/auth/companyAuthSlice";
import { CiHardDrive } from "react-icons/ci";
const CampusDrive = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { campusDrives, loading, error } = useSelector(
    (state) => state.campusDrive
  );

  const { data: user } = useSelector((state) => state.companyAuth);

  useEffect(() => {
 if(user?._id){
  console.log(user)
    dispatch(getAllCampusDrives(user?._id));
  }else{
    dispatch(getCompany());
    console.log(user)
  }
  }, [ "",user]);



  const handleCreateDrive = () => {
    console.log("Create new drive");
    navigate("/company/pr/campus-drive/create");
  };

  return (
    <>
      <span className="flex gap-2">
        <button className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500">
          <CiHardDrive className="h-8 w-8" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Campus Drive
        </h2>
      </span>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Campus Drives</h1>
          <button
            onClick={handleCreateDrive}
            className="btn text-white bg-blued hover:bg-lightBlue"
          >
            Create New Drive
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blued"></div>
          </div>
        ) : //   error ? (
        //     <div className="text-red-500 text-center">{error}</div>
        //   ) :
        campusDrives && campusDrives?.length === 0 ? (
          <div className="text-center text-gray-500">
            No campus drives found. Create your first drive!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusDrives &&
              campusDrives?.map((drive) => (
                <CampusDriveCard key={drive._id} drive={drive} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CampusDrive;
