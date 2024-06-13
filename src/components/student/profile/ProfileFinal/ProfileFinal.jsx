import React, { useRef, useState } from "react";
import Header from "./Header";
import Personal from "./Personal";
import Education from "./Education";
import Skills from "./Skills";
import Portfolio from "./Portfolio";

const ProfileFinal = () => {
  const imgRef = useRef(null);
  const [editable, setEditable] = useState(false);
  const [student, setStudent] = useState();
  return (
    <>
      <Header
        student={student}
        editable={editable}
        setStudent={setStudent}
        setEditable={setEditable}
      />
      <div className="my-6"></div>
      <Personal
        student={student}
        editable={editable}
        setEditable={setEditable}
        setStudent={setStudent}
        imgRef={imgRef}
      />
      <div className="my-6"></div>
      <Education />
      <div className="my-6"></div>
      <Skills />
      <div className="my-6"></div>
      <Portfolio />
    </>
  );
};

export default ProfileFinal;
