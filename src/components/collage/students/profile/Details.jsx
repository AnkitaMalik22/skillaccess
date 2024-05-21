import React from "react";
import { CgPinAlt } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { SiAdobephotoshop } from "react-icons/si";
import PopUp from "./PopUp";
import PopUpReject from "./PopUpReject";
const Details = ({ student }) => {
  const handleViewCV = () => {
    window.open(student.Cv.url, "_blank");
  };
  const handleApprove = (studentId) => {};
  const [visible, setVisible] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [sId, setSId] = React.useState(null);
  console.log(student?.approved);
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
      <div className=" flex justify-between border-b  bg-gray-50 rounded-t-lg">
        {/* profile photo */}
        <div className="flex gap-2 px-3 py-1 mt-2">
          <div className="min-w-[2.5rem] h-10  self-center rounded-lg">
            <img src={student?.avatar?.url} alt="" className="h-10 w-10" />
          </div>
          <div className="ml-1 mt-1">
            <h2 className="text-base  font-bold  py-1 ">
              {student.FirstName} {student.LastName}
            </h2>
            <h2 className="text-sm   pb-2">{student.role}</h2>
          </div>
        </div>

        {/* location */}
        <div className="self-center text-gray-400 mr-2">
          <span className="flex ">
            {" "}
            <CgPinAlt className="self-center text-lg" />{" "}
            <p className="self-center  font-dmSans text-xs font-bold">
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
      <div className="border-b px-6  grid grid-cols-4 text-xs font-bold text-center py-4 bg-gray-50 ">
        <span className="text-center">
          <h2 className="text-gray-400 my-1 capitalize">EMAIL ADDRESS</h2>
          <h2>{student.Email}</h2>
        </span>
        <span>
          <h2 className="text-gray-400 my-1">PHONE NUMBER</h2>
          <h2>{student.PhoneNumber}</h2>
        </span>
        <span>
          <h2 className="text-gray-400 my-1">ADDRESS</h2>
          <h2>{student?.Address}</h2>
        </span>
        <span className="text-center">
          <h2 className="text-gray-400 my-1">WEBSITE</h2>
          <h2 className="text-blue-700">
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
        </span>
      </div>

      {/* third section */}

      <div className="border-b  px-6 flex justify-between text-xs font-bold text-center p-4 bg-gray-50 ">
        <h2 className="self-center font-bold text-base">Software Knowledge</h2>
        <span className="flex gap-2 flex-wrap text-sm">
          {/* <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-lg " /> */}
          {/* <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-lg " />
          <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-lg " />
          <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-lg " /> */}
          {student?.Skills?.SoftwareKnowledge.join(", ")}
        </span>
      </div>

      {/* forth section */}
      <div className="rounded-b-lg px-6 flex justify-between text-xs  text-center p-4 bg-gray-50 font-dmSans">
        <button
          className="p-3  rounded-xl w-24 bg-[#8f92a11d] font-bold "
          onClick={handleViewCV}
        >
          View CV
        </button>

        <span className="flex gap-2">
          {!student?.approved && (
            <button
              className="py-3  rounded-xl px-3 text-[#DE350B] border-2 border-[#DE350B] font-bold"
              onClick={() => {
                setShow(true);
                setSId(student?._id);
              }}
            >
              Reject Request
            </button>
          )}
          <button className="py-3  rounded-xl px-3 bg-[#8f92a11d] font-bold">
            View Certificates
          </button>
          {!student?.approved && (
            <button
              className="py-2 text-white rounded-xl px-4 bg-blue-700 font-bold"
              onClick={() => {
                setVisible(true);
                setSId(student?._id);
              }}
            >
              Approve Request
            </button>
          )}
        </span>
      </div>
    </section>
  );
};

export default Details;
