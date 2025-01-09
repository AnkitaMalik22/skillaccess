import React from "react";
import { useSelector } from "react-redux";
import { CgPinAlt } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import PopUp from "./PopUp";
import PopUpReject from "./PopUpReject";
import Loader from "../../../loaders/Loader";

const Details = ({ student }) => {
  const handleViewCV = () => {
    window.open(student.Cv.url, "_blank");
  };
  const handleApprove = (studentId) => {};
  const [visible, setVisible] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [sId, setSId] = React.useState(null);
  const { REJECT_STUDENT_LOADING, APPORVE_STUDENT_LOADING } = useSelector(
    (state) => state.collegeStudents
  );
  return (
    // {/* profile container */}
    <section>
      {visible && (
        <PopUp
          visible={visible}
          handleSave={handleApprove}
          studentId={sId}
          handleOverlay={() => {
            setVisible(false);
          }}
        />
      )}

      {show && (
        <PopUpReject
          visible={show}
          handleSave={handleApprove}
          studentId={sId}
          handleOverlay={() => {
            setShow(false);
          }}
        />
      )}
      {/* first section */}
      <div className=" flex justify-between border-b  bg-gray-50 rounded-t-2xl  p-4">
        {/* profile photo */}
        <div className="flex gap-2 items-center">
          <div className="min-w-[2.5rem] h-10  self-center rounded-md">
            <img src={student?.avatar?.url} alt="" className="h-10 w-10" />
          </div>
          <div className="">
            <h2 className="text-base  font-bold">
              {student.FirstName} {student.LastName}
            </h2>
            <h2 className="text-sm">{student.role}</h2>
          </div>
        </div>

        {/* location */}
        <div className="self-center text-gray-400 mr-2">
          <span className="flex ">
            {" "}
            <CgPinAlt className="self-center text-lg" />{" "}
            <p className="self-center  font-dmSans text-sm font-bold">
              {student?.Address}
            </p>
          </span>
          <div className="text-sm flex justify-end text-black gap-1">
            4.5/5
            <FaStar className="self-center text-[#FF991F]" />
          </div>
        </div>
      </div>

      {/* second section */}
      <div className="border-b p-4  grid grid-cols-4 text-sm font-bold text-center bg-gray-50 ">
        <div className="text-center">
          <h2 className="text-[#8F92A1] font-bold text-sm capitalize mb-1 tracking-[1px]">
            EMAIL ADDRESS
          </h2>
          <h2 className="text-sm lowercase font-bold text-[#171717]">
            {student.Email}
          </h2>
        </div>
        <div>
          <h2 className="text-[#8F92A1] font-bold text-sm capitalize mb-1 tracking-[1px]">
            PHONE NUMBER
          </h2>
          <h2 className="text-sm font-bold text-[#171717]">
            {student.PhoneNumber}
          </h2>
        </div>
        <div>
          <h2 className="text-[#8F92A1] font-bold text-sm capitalize mb-1 tracking-[1px]">
            ADDRESS
          </h2>
          <h2 className="text-sm first-letter:capitalize font-bold text-[#171717]">
            {student?.Address}
          </h2>
        </div>
        <div className="text-center">
          <h2 className="text-[#8F92A1] font-bold text-sm capitalize mb-1 tracking-[1px]">
            WEBSITE
          </h2>
          <h2 className="text-sm first-letter:capitalize font-bold text-blued  lowercase">
            {" "}
            <a
              href={student.Website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-xs"
            >
              {student.Website}
            </a>
          </h2>
        </div>
      </div>

      {/* third section */}

      <div className="border-b  flex justify-between text-sm font-bold text-center p-4 bg-gray-50 items-center ">
        <h2 className="self-center font-bold text-base">Software Knowledge</h2>
        <span className="flex gap-2 flex-wrap text-sm">
          {/* <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-md " /> */}
          {/* <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-md " />
          <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-md " />
          <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-md " /> */}
          {student?.Skills?.SoftwareKnowledge.join(", ")}
        </span>
      </div>

      {/* forth section */}
      <div className="rounded-b-lg px-6 flex justify-between text-sm  text-center p-4 bg-gray-50 font-dmSans">
        <button
          className="p-3  rounded-xl w-24 bg-[#8f92a11d] font-bold "
          onClick={handleViewCV}
        >
          View CV
        </button>

        <span className="flex gap-2">
          {!student?.approved && (
            <button
              className="py-3  rounded-xl px-3 text-[#DE350B] border-2 border-[#DE350B] font-bold items-center gap-2"
              onClick={() => {
                setShow(true);
                setSId(student?._id);
              }}
            >
              {REJECT_STUDENT_LOADING ? (
                <>
                  Rejecting... <Loader />
                </>
              ) : (
                "Reject Request"
              )}
            </button>
          )}
          <button className="py-3  rounded-xl px-3 bg-[#8f92a11d] font-bold">
            View Certificates
          </button>
          {!student?.approved && (
            <button
              className="py-2 text-white rounded-xl px-4 bg-accent font-bold flex items-center gap-2"
              onClick={() => {
                setVisible(true);
                setSId(student?._id);
              }}
            >
              {APPORVE_STUDENT_LOADING ? (
                <>
                  Approving... <Loader />
                </>
              ) : (
                "Approve Request"
              )}
            </button>
          )}
        </span>
      </div>
    </section>
  );
};

export default Details;
