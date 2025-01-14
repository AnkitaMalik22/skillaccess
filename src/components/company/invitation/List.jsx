import React from "react";
import { useNavigate } from "react-router-dom";

const List = ({ students }) => {
  const navigate = useNavigate();


  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Invited Students</h2>
      <ul className="space-y-2">
        {students?.map((student, index) => (
          <li
          
            key={index}
            onClick={()=>navigate(`/company/pr/students/profile/${student?._id}`)}
            className="p-2 bg-white rounded-md shadow-sm flex items-center gap-4 cursor-pointer hover:border-2 hover:border-blued"
          >
            <img
              src={
                student?.avatar?.url
                  ? student?.avatar?.url
                  : "/images/student.png"
              }
              alt={`${student.FirstName} ${student.LastName}`}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <p className="font-semibold">
                {student.FirstName} {student.LastName}
              </p>
              <p className="text-blued">{student.Email}</p>
            </div>
          </li>
        ))}
      </ul>
      {(!students || students?.length === 0) && (
        <div className="bg-gray-100 flex justify-between p-5 mb-1">
          <h2 className="font-bold text-lg">No students available</h2>
        </div>
      )}
    </div>
  );
};

export default List;
