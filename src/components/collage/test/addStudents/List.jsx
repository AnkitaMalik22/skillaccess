import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const List = ({ uploadedStudents, setStudents, students }) => {
  // const { uploadedStudents} = useSelector((state) => state.collegeStudents);

  // const [students,setStudents]=useState([])

  const [isChecked, setIsChecked] = useState(false);
  const { credit } = useSelector((state) => state.collageAuth);
  //   setIsChecked((prev) => !prev); // Toggle based on previous state

  //   // Determine if the student is already in the 'students' array
  //   const isStudentInArray = students.some(student => student._id === id);

  //   // If checkbox is checked and student not in array, add them
  //   if (!isStudentInArray && !isChecked) {
  //     const stdToAdd = uploadedStudents.find((student) => student._id === id);
  //     if (stdToAdd) {
  //       setStudents(prevStudents => [...prevStudents, stdToAdd]);
  //     }
  //   }
  //   // If checkbox is unchecked and student in array, remove them
  //   else if (isStudentInArray && isChecked) {
  //     setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
  //   }

  //   console.log(students)
  // };

  // Assuming `uploadedStudents` is an array of student objects with _id properties
  const [checkedState, setCheckedState] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedState((prevState) => {
      const isCurrentlyChecked = !!prevState[id];
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

      console.log(students);
      return newCheckedState;
    });
  };

  // const handleCheckboxChange = (id) => {
  //   console.log(credit.limit-1 , students.length)
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
  //       console.log(students);
  //       return newCheckedState; // Return the updated state
  //     });
  //   }
  // };

  // When rendering checkboxes, use the `checkedState` to determine each checkbox's checked property

  return (
    <div className=" grid-cols-5 mx-auto  font-dmSans  text-sm  ">
      {" "}
      {/* row-2 */}
      {uploadedStudents?.map((student) => {
        return (
          <div
            className="flex flex-col w-full mb-3 p-5 rounded-lg bg-white items-center"
            key={student._id}
          >
            {/* {console.log(student)} */}
            {/* <div className={` flex `}> */}
            <div className="flex self-center flex-row items-center justify-between w-full  ">
              <div className=" min-w-[3rem]  h-12 self-center  mr-2 flex items-center justify-center text-xl ">
                <img
                  src="../../images/student.png"
                  alt=""
                  width="50px"
                  height="50px"
                />
              </div>
              <h2 className="font-dmSans font-bold text-base text-start capitalize">
                {student.FirstName} {student.LastName}
              </h2>
              <h2 className="font-dmSans  text-base text-gray-400 lowercase">
                {student.Email}
              </h2>

              <div className="self-center ">
                {/* <input
            type="checkbox"
            name=""
            id=""
            className="p-1 rounded"
            // onChange={handleCheckboxChange}
            onClick={()=>handleCheckboxChange(student._id)}
          /> */}
                <input
                  type="checkbox"
                  className="p-1 rounded cursor-pointer"
                  checked={!!checkedState[student._id]} // Determine if checked
                  onChange={() => handleCheckboxChange(student._id)}
                />
              </div>

              {/* </div> */}
            </div>
            {/*  */}
            {/* <div className="flex justify-center mr-16 ">
        <div className=" self-center h-fit ">
          <span>
            <h2 className="font-dmSans  sm:text-lg text-gray-400 ">
            {student.Email}
            </h2>
          </span>
        </div>
      </div> */}
            {/*  */}
            {/* <div className="flex justify-center">
        <div className=" self-center h-fit">
          <span>
            <h2 className="font-dmSans sm:text-lg text-gray-400">II Year</h2>
          </span>
        </div>
      </div> */}
            {/*  */}
            {/*  */}
            {/* <div className="flex justify-center">
        <div className=" self-center h-fit">
          <span>
            <h2 className="font-dmSans sm:text-lg text-gray-400">2022</h2>
          </span>
        </div>
      </div> */}
            {/*  */}
            {/*  */}
            {/* <div className="flex justify-end mr-3">
        <span className="self-center ">  <input
            type="checkbox"
            name=""
            id=""
            className="p-1 rounded"
            // onChange={handleCheckboxChange}
            onClick={()=>handleCheckboxChange(student._id)}
          />
        </span>
      </div> */}
          </div>
        );
      })}
      {uploadedStudents.length === 0 && (
        <div className="w-full flex justify-center items-center  mb-4 bg-white rounded-2xl">
          <h2 className="text-xl font-bold">No Students Found</h2>
        </div>
      )}
    </div>
  );
};

export default List;
