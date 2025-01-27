import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudents,
  uploadStudents,
} from "../../redux/college/student/studentSlice";
import toast from "react-hot-toast";
import Loader from "../college/test/addVideo/Loader";
const StudentPoP = ({ onClose, filterType, setFilterType, setSelectedList }) => {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Batch: "",
    approved: false
  });
  const { user } = useSelector((state) => state.collegeAuth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setStudent((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      };
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
    }
    if (student.FirstName.length > 30) {
      toast.error("First Name cannot exceed 30 characters");
      return;
    }
    if (student.FirstName.length < 2) {
      toast.error("First Name should have more than 2 characters");
      return;
    }
    if (student.LastName.length > 30) {
      toast.error("Last Name cannot exceed 30 characters");
      return;
    }
    if (student.LastName.length < 2) {
      toast.error("Last Name should have more than 2 characters");
      return;
    }
    // no numeric values in name
    if (!/^[a-zA-Z]*$/.test(student.FirstName)) {
      toast.error("First Name should not contain numeric values or spaces");
      return;
    }
    if (!/^[a-zA-Z]*$/.test(student.LastName)) {
      toast.error("Last Name should not contain numeric values or spaces");
      return;
    }
    if (!/^\d{4}$/.test(parseInt(student.Batch))) {
      toast.error("Invalid Batch");
      return;
    }

    // maxLength: [30, "Name cannot exceed 30 characters"],
    // minLength: [2, "Name should have more than 2 characters"],
    else {

      // //console.log(student, "pop");
      setLoading(true);
      await dispatch(uploadStudents([student])).then(() => {
        if (filterType !== "invited-students") {
          setFilterType('invited-students')
          setSelectedList("invitedStudents")
        } else {
          dispatch(getStudents({ id: user?._id, filterType: 'invited-students', page: 1, limit: 10, batch: "all" }));
        }
      });
      // toast.success("Students Uploaded Successfully");
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
        <div className="py-12 bg-white shadow-md w-[500px] h-auto  mx-auto self-center rounded-md bg-opactiy-10  px-12 flex flex-col justify-center gap-3 relative">
          <h3 className="text-2xl font-semibold mb-4 text-[#161718]">
            Add Student
          </h3>
          <input
            type="text"
            name="FirstName"
            onChange={handleChange}
            placeholder="First Name*"
            className="bg-[#8F92A1] bg-opacity-5 rounded-md w-full  p-3 border-none text-[#8F92A1] text-sm"
          />
          <input
            type="text"
            name="LastName"
            onChange={handleChange}
            placeholder="Last Name*"
            className="bg-[#8F92A1] bg-opacity-5 rounded-md w-full  p-3 border-none text-[#8F92A1] text-sm"
          />
          <input
            type="email"
            name="Email"
            onChange={handleChange}
            placeholder="Email Address*"
            className="bg-[#8F92A1] bg-opacity-5 rounded-md w-full  p-3 border-none text-[#8F92A1] text-sm"
          />
          <input
            type="text"
            name="Batch"
            onChange={handleChange}
            placeholder="Batch*"
            className="bg-[#8F92A1] bg-opacity-5 rounded-md w-full  p-3 border-none text-[#8F92A1] text-sm"
          />
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="approved"
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-accent transition-colors"></div>
            <span className="absolute top-0.5 left-[2px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></span>
            <span className="ml-3 text-gray-700 text-sm">{student.approved ? "Approved" : "Pending"}</span>
          </label>


          {/* <input
              type="tel"
              t
              placeholder="Mobile Number"
              className="bg-gray-200  rounded-md w-full  p-2 border-none"             
            /> */}

          <div className="flex justify-end">
            <button
              className="bg-accent text-white px-4 py-3 rounded-xl text-sm font-bold flex item-center justify-center"
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
