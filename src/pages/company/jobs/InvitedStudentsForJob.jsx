import React from 'react'
import List from '../../../components/company/invitation/List';
import Header from '../../../components/company/invitation/Header';
import Footer from '../../../components/company/invitation/Footer.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

const InvitedStudentsForJob = () => {
    const navigate = useNavigate();
    const { students, assessment } = useSelector((state) => state.test);
    const [filteredStudents, setStudents] = React.useState(students);


    const handleFilterStudents = (e) => {
        const value = e.target.value;
        if (value === "" || value.trim() === "") {
            setStudents(students);
            return;
        } else {
            setStudents(
                students.filter((student) => {
                    const regex = new RegExp(value, "i");
                    return (
                        regex.test(student.FirstName) ||
                        regex.test(student.LastName) ||
                        regex.test(student.Email)
                    );
                })
            );
        }
    }


  return (
    <div className="w-full h-full bg-gray-100">
        <div className="w-full flex justify-between">
        <div className="flex gap-3 px-4">
                <button
                className="self-center object-center rounded-lg h-10 w-10 "
                onClick={() => navigate(-1)}
                >
                <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-[#D9E1E7]" />
                </button>
            </div>
            <div
            name=""
            id=""
            className="rounded-lg  focus:outline-none border-none  p-5 font-bold text-2xl"
            >
         {assessment?.name}
            </div>
            {/* <Footer students={students} endDate={assessment?.endDate} /> */}
        </div>
        <div className="resize-none w-full h-full text-lg bg-gray-100 border-none focus:outline-none rounded-lg p-5 focus:ring-0placeholder-gray-400 mb-6">
            {/* back btn */}
      
            {/* <Header
            handleFilter={handleFilterStudents}
            setStudents={setStudents}
            uploadedStudents={filteredStudents}
            students={students}
            /> */}
            <List
            setStudents={setStudents}
            uploadedStudents={filteredStudents}
            students={students}
            />
        </div>
    </div>
  )
}

export default InvitedStudentsForJob