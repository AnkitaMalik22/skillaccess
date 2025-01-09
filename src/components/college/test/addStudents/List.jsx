import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Skeleton from "../../../loaders/Skeleton";

const List = ({ uploadedStudents, setStudents, students }) => {
  // const { uploadedStudents} = useSelector((state) => state.collegeStudents);

  // const [students,setStudents]=useState([])

  const [isChecked, setIsChecked] = useState(false);
  const { credit } = useSelector((state) => state.collegeAuth);
  const { GET_STUDENTS_LOADING } = useSelector((state) => state.test);

  const [checkedState, setCheckedState] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedState((prevState) => {
      const isCurrentlyChecked = !!prevState[id];
      console.log(isCurrentlyChecked);
      const newCheckedState = { ...prevState, [id]: !isCurrentlyChecked };

      if (isCurrentlyChecked) {
        // Remove the student
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== id)
        );
      } else {
        const stdToAdd = uploadedStudents.find((student) => student._id === id);
        if (stdToAdd) {
          if (credit?.limit <= students.length) {
            // Credit limit reached
            toast.error(
              "Your current plan only supports inviting " +
                credit?.limit +
                " students"
            );
            return prevState;
          } else {
            // Add the student
            setStudents((prevStudents) => [...prevStudents, stdToAdd]);
          }
        }
      }

      // //console.log(students);
      return newCheckedState;
    });
  };

  // const handleCheckboxChange = (id) => {
  //   //console.log(credit.limit-1 , students.length)
  //    if(credit.limit-1<students.length){
  //     toast.error("Your current plan only support inviting " + credit.limit + " students" ,students.length);

  //   setCheckedState((prevState) => {
  //     const isCurrentlyChecked = !!prevState[id];
  //   })
  // }
  //   else{
  //     setCheckedState((prevState) => {
  //       const isCurrentlyChecked = !!prevState[id];
  //       // Toggle the current state for the checkbox
  //       const newCheckedState = { ...prevState, [id]: !isCurrentlyChecked };

  //       // Determine whether to add or remove the student based on the new checked state
  //       if (!isCurrentlyChecked) {
  //         // Add the student to the list
  //         const stdToAdd = uploadedStudents.find((student) => student._id === id);
  //         if (stdToAdd) {
  //           setStudents((prevStudents) => {
  //             // Ensure we're not adding a duplicate
  //             const isStudentAlreadyAdded = prevStudents.some(
  //               (student) => student._id === id
  //             );
  //             return isStudentAlreadyAdded
  //               ? prevStudents
  //               : [...prevStudents, stdToAdd];
  //           });
  //         }
  //       } else {
  //         // Remove the student from the list
  //         setStudents((prevStudents) =>
  //           prevStudents.filter((student) => student._id !== id)
  //         );
  //       }
  //       //console.log(students);
  //       return newCheckedState; // Return the updated state
  //     });
  //   }
  // };

  // When rendering checkboxes, use the `checkedState` to determine each checkbox's checked property

  // sort students by no of tests appeared . show a rounded badge with the number of tests appeared
  // and a filter to number of tests appeared

  return (
    <div className=" grid-cols-5 mx-auto  font-dmSans  text-sm  ">
      {" "}
      {/* row-2 */}
      {GET_STUDENTS_LOADING && <Skeleton />}
      {!GET_STUDENTS_LOADING &&
        uploadedStudents?.map((student) => {
          return (
            <div
              className="flex flex-col w-full mb-3 p-5 rounded-md bg-white items-center"
              key={student._id}
            >
              {/* {//console.log(student)} */}
              {/* <div className={` flex `}> */}
              <div className="flex self-center flex-row items-center justify-between w-full  ">
                <div className="self-center  flex flex-row items-center justify-center">
                  <input
                    type="checkbox"
                    className="p-1 rounded cursor-pointer mr-3"
                    checked={
                      !!checkedState[student._id] ||
                      students.some((std) => std._id === student._id)
                    }
                    onChange={() => handleCheckboxChange(student._id)}
                  />
                  <div className=" min-w-[3rem]  h-12 self-center  mr-2 flex items-center justify-center text-xl bg-blue-100 rounded-full p-1">
                    <img
                      src={
                        student?.avatar?.url
                          ? student?.avatar?.url
                          : "/images/student.png"
                      }
                      className="rounded-full"
                      alt=""
                      width="50px"
                      height="50px"
                    />
                  </div>
                </div>

                <h2 className=" ml-2 font-dmSans font-bold text-base text-start capitalize w-full">
                  {student.FirstName} {student.LastName}
                </h2>
                <h2 className="font-dmSans  text-base text-gray-400 lowercase">
                  {student.Email}
                </h2>
              </div>
            </div>
          );
        })}
      {!GET_STUDENTS_LOADING && uploadedStudents.length === 0 && (
        <div className="w-full flex justify-center items-center  mb-4 bg-white rounded-2xl">
          <h2 className="text-xl font-bold">No Students Found</h2>
        </div>
      )}
    </div>
  );
};

export default List;
