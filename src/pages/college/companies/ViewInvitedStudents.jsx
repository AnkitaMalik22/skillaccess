import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getJobById } from "../../../redux/college/dashboard/dashboardSlice";
// import { UserCircle } from "lucide-react";

const ViewInvitedStudents = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { invitedStudents: students } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.collegeAuth);

  useEffect(() => {
    if (user?._id) {
      dispatch(
        getJobById({
          jobId: id,
          collegeId: user?._id,
        })
      );
    }
  }, [id, user?._id]);

  if (!students?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-md shadow-md">
          <div className="p-6">
            <div className="text-center text-gray-500">
              <h2 className="text-lg">No invited students found</h2>
              <button
                className="btn btn-primary mt-4"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto bg-white rounded-md shadow-lg">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Invited Students
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Total students: {students?.length || 0}
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="text-sm text-blued hover:underline"
          >
            Go Back
          </button>
        </div>
        <div className="p-6">
          <div className="divide-y divide-gray-200">
            {students?.map((student, index) => (
              <div
                key={student.Email || index}
                className="flex items-center gap-4 py-4 hover:bg-gray-50 px-4 rounded-md transition-colors"
              >
                <div className="flex-shrink-0">
                  {/* <UserCircle className="h-10 w-10 text-gray-400" /> */}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {student.FirstName} {student.LastName}
                    </p>
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {student.Email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvitedStudents;
