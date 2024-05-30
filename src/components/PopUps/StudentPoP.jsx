import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudents,
  uploadStudents,
} from "../../redux/collage/student/studentSlice";
import toast from "react-hot-toast";
import Loader from "../collage/test/addVideo/Loader";
const StudentPoP = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
  });
  const { user } = useSelector((state) => state.collageAuth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.value, "pop");
    setStudent((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSaveInvite = async () => {
    if (!student.FirstName) {
      toast.error("First Name is required");
      return;
    } else if (!student.LastName) {
      toast.error("Last Name is required");
      return;
    } else if (!student.Email) {
      toast.error("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(student.Email)) {
      toast.error("Invalid Email format");
      return;
    } else {
      console.log(student, "pop");
      setLoading(true);
      dispatch(uploadStudents([student]));

      await dispatch(getStudents({ id: user?._id }));
      setLoading(false);
      setStudent({
        FirstName: "",
        LastName: "",
        Email: "",
      });
      onClose();
    }
  };

  return (
    <div>
      <div className="w-full  min-w-full h-full min-h-[100vh] bg-[#171717] absolute z-[9999] flex left-0 top-0  bg-opacity-20">
        <div className="py-12 bg-white shadow-md w-[500px] h-auto  mx-auto self-center rounded-lg bg-opactiy-10  px-12 flex flex-col justify-center gap-3 relative">
          <h3 className="text-2xl font-semibold mb-4 text-[#161718]">
            Add Student
          </h3>
          <input
            type="text"
            name="FirstName"
            onChange={handleChange}
            placeholder="First Name*"
            className="bg-[#8F92A1] bg-opacity-5 rounded-lg w-full  p-3 border-none text-[#8F92A1] text-sm"
          />
          <input
            type="text"
            name="LastName"
            onChange={handleChange}
            placeholder="Last Name*"
            className="bg-[#8F92A1] bg-opacity-5 rounded-lg w-full  p-3 border-none text-[#8F92A1] text-sm"
          />
          <input
            type="email"
            name="Email"
            onChange={handleChange}
            placeholder="Email Address*"
            className="bg-[#8F92A1] bg-opacity-5 rounded-lg w-full  p-3 border-none text-[#8F92A1] text-sm"
          />
          {/* <input
              type="tel"
              t
              placeholder="Mobile Number"
              className="bg-gray-200  rounded-md w-full  p-2 border-none"             
            /> */}

          <div className="flex justify-end">
            <button
              className="bg-[#0052cc] text-white px-4 py-3 rounded-xl text-sm font-bold flex item-center justify-center"
              onClick={() => handleSaveInvite()}
            >
              Send Invite {loading && <Loader />}
            </button>
          </div>

          <button
            className="text-2xl text-[#2E3E4B] absolute right-5 top-5"
            onClick={onClose}
          >
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPoP;
