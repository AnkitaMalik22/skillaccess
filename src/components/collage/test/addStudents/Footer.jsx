import React from "react";
import toast from "react-hot-toast";

import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { inviteToTest } from "../../../../redux/collage/test/thunks/student";
import { useState } from "react";
import Loader from "../../../loaders/Loader";

const Footer = ({ students, endDate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { credit } = useSelector((state) => state.collageAuth);
  const testId = searchParams.get("testId");
  const handleSendInvite = async () => {
    if (students.length === 0) {
      toast.error("Select at least one student to send an invite.");
    } else if (!testId) {
      // //console.log(testId);
      toast.error("Invalid Test Id");
    } else if (credit?.limit - 1 < students.length) {
      toast.error(
        "Your current plan only support inviting " + credit?.limit + "students"
      );
    } else {
      // //console.log(testId, students);
      setLoading(true);
      await dispatch(
        inviteToTest({
          testId: testId,
          students,
        })
      );

      localStorage.removeItem("testDetails");
      localStorage.removeItem("totalTime");
      // toast.success("Invite sent");
      navigate("/collage/test");
    }
  };

  const isActiveTest = (endDate) => {
    const currentDate = new Date();
    // Strip time from both dates
    const endDateWithoutTime = new Date(endDate);
    endDateWithoutTime.setHours(0, 0, 0, 0);
    const currentDateWithoutTime = new Date();
    currentDateWithoutTime.setHours(0, 0, 0, 0);

    const differenceMs = currentDateWithoutTime - endDateWithoutTime;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    // //console.log(differenceDays);

    return differenceDays > 0 ? false : true;
  };

  return (
    <div className="p-4">
      {/* <div className=" absolute right-0"> */}
        {" "}
        <div className=" flex gap-2">
          <button
            className={`self-center justify-center flex bg-accent rounded-lg text-sm font-bold gap-2 px-10 py-3 ${
              students.length === 0
                ? "opacity-50 cursor-not-allowed"
                : isActiveTest(endDate)
                ? "cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSendInvite}
            disabled={students.length === 0 || !isActiveTest(endDate)}
          >
            {loading ? (
              <Loader />
            ) : (
              isActiveTest(endDate) ?? <FaPlus className="text-white text-lg" />
            )}

            <p
              className="self-center text-white tooltip"
              data-tip={
                isActiveTest(endDate)
                  ? "Invite Students to Test"
                  : "This test has ended"
              }
            >
              {}
              {isActiveTest(endDate) ? "Invite" : "Test Ended"}
            </p>
          </button>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Footer;
