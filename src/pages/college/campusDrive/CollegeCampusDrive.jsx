import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampusDrivesOfCollege } from "../../../redux/company/campusDrive/campusDriveSlice";

import CampusDriveCard from "../../../components/company/campusDrive/Card";

const CollegeCampusDrive = () => {
  const dispatch = useDispatch();
  const { college_campus_drives, loading, error } = useSelector(
    (state) => state.campusDrive
  );
  const { user } = useSelector((state) => state.collegeAuth);

  useEffect(() => {
    dispatch(fetchCampusDrivesOfCollege(user?._id));
  }, []);
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campus Drives</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blued"></div>
        </div>
      ) : //   error ? (
      //     <div className="text-red-500 text-center">{error}</div>
      //   ) :
      college_campus_drives && college_campus_drives?.length === 0 ? (
        <div className="text-center text-gray-500">
          No campus drives found. Create your first drive!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {college_campus_drives &&
            college_campus_drives?.map((drive) => (
              <CampusDriveCard key={drive._id} drive={drive} />
            ))}
        </div>
      )}
    </>
  );
};

export default CollegeCampusDrive;
