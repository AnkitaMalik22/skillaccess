import { useDispatch } from "react-redux";
import { logoutCollege } from "../../redux/college/auth/authSlice";
import { setAssessments } from "../../redux/college/test/testSlice";
import { logoutCompany } from "../../redux/company/auth/companyAuthSlice";
import { logoutUniversity } from "../../redux/university/auth/universityAuthSlice";
import toast from "react-hot-toast";
import { clearCookie } from "../../util/getToken";

export default function AwaitingApproval({ user }) {
  const dispatch = useDispatch();

  if (!user) {
    window.location.href = "/";
  } else if (
    user &&
    (user.status === "approved" || user.verificationStatus === "approved")
  ) {
    window.location.href = "/";
  }

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      let result;
      switch (user?.role) {
        case "company":
          result = await dispatch(logoutCompany());
          if (result.meta.requestStatus === "fulfilled") {
            toast.success("Logged out successfully");
            window.location.href = "/company";
          } else {
            throw new Error("Company logout failed");
          }
          break;
        case "university":
          result = await dispatch(logoutUniversity());
          console.log("result", result);
          if (result.meta.requestStatus === "fulfilled") {
            clearCookie("token");
            toast.success("Logged out successfully");
            window.location.href = "/university";
          } else {
            throw new Error("University logout failed");
          }
          break;
        case "college":
          result = await dispatch(logoutCollege());
          if (result.meta.requestStatus === "fulfilled") {
            toast.success("Logged out successfully");
            dispatch(setAssessments());
            // navigate("/");
            window.location.href = "/";
          } else {
            throw new Error("College logout failed");
          }
          break;
        default:
          throw new Error("Invalid user type");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logging out failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <div className="bg-white rounded-md shadow-md w-full max-w-md overflow-hidden">
        <div className="p-6 space-y-4">
          {user?.status === "pending" ||
          user?.verificationStatus === "pending" ? (
            <>
              <h1 className="text-2xl font-bold text-center">
                Awaiting approval by admin
              </h1>
              <p className="text-accent text-center">
                Your details have been submitted
              </p>
              <p className="text-center text-gray-600">
                Thank you for your submission. We appreciate your patience while
                we review your details.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center">
                Unfortunately, your profile have been rejected.
              </h1>
              <p className="text-accent text-center">
                Please contact Admin, for further enquiry
              </p>
              <p className="text-center text-gray-600">
                Thank you for your submission. We appreciate your patience while
                we review your details.
              </p>
            </>
          )}
          <div className="flex justify-center">
            <button
              className="bg-red-500 rounded-md py-1 px-4 text-white text-center text-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
