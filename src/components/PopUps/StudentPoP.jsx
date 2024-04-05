import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { uploadStudents } from '../../redux/collage/student/studentSlice';



const StudentPoP = ({ onClose }) => {
  const [student , setStudent] = useState({
    FirstName : "",
    LastName : "",
    Email : ""
  })
  const dispatch = useDispatch();
const [showPopup, setShowPopup] = useState(false);


const handleChange = (e) => {
console.log(e.target.value , "pop")
  setStudent((prev) => {
    return { ...prev, [e.target.name]: e.target.value };
  });

}


const handleSaveInvite = () => {

console.log(student , "pop")

  dispatch(uploadStudents(
[student]
  ));
  setStudent({
    FirstName : "",
    LastName : "",
    Email : ""
  })
onClose();

}


  
    
  return (
    <div>
         <div
      className="w-full  min-w-full h-full min-h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 " 
    >
      <div className="py-12 bg-white shadow-md w-[500px] h-auto  mx-auto self-center rounded-lg bg-opactiy-10  px-12 flex flex-col justify-center gap-2 relative">
      <h3 className="text-xl font-semibold mb-4">Add Student</h3>
            <input
              type="text"
              name='FirstName'
             onChange={handleChange}
              placeholder="FirstName"
              className="bg-gray-200  rounded-md w-full  p-2 border-none"
             
            />
               <input
              type="text"
              name='LastName'
           onChange={handleChange}
              placeholder="LastName"
              className="bg-gray-200  rounded-md w-full  p-2 border-none"
             
            />
            <input
              type="email"
              name='Email'
            onChange={handleChange}
              placeholder="Email Address"
              className="bg-gray-200  rounded-md w-full  p-2 border-none"
           
            />
            {/* <input
              type="tel"
              t
              placeholder="Mobile Number"
              className="bg-gray-200  rounded-md w-full  p-2 border-none"             
            /> */}
           
            <div className="flex justify-end">
            <button
              className="bg-[#0052cc] w-[140px] mt-4  text-white px-4 py-2 rounded-xl text-sm font-bold"
             onClick={()=>handleSaveInvite()}
            >
              Send Invite
            </button>
            </div>
           
            <button
                    className='h-6 w-6 text-[#2e3e4b] absolute right-4 top-4'
                   onClick={onClose}
                >
                <RxCross2 />
                </button>
        </div>
      </div>
    </div>
   
  )
}

export default StudentPoP