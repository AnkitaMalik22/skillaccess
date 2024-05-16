import React from "react";
import { SiAdobephotoshop } from "react-icons/si";

const Skills = ({skills}) => {
  return  (
    <div className="grid grid-rows-4 px-4 text-base font-bold gap-8 mt-2 font-dmSans">
      <div className="grid grid-cols-2">
        <span>Software Knowledge</span>
        <span className="w-2/3 font-normal font-dmSans">
          {/* {skills.SoftwareKnowledge.map((software, index) => (
            <span key={index} >
              {software}
            </span>
          ))} */}
          {skills?.SoftwareKnowledge?.join(', ')}
        </span>
      </div>

      <div className="grid grid-cols-2">
        <span>Achievements</span>
        <span className="w-2/3 font-normal font-dmSans">
          {/* {skills.Achievements.map((achievement, index) => (
            <span key={index}>{achievement}</span>
          ))} */}
          {skills.Achievements.join(', ')}
        </span>
      </div>

      <div className="grid grid-cols-2">
        <span>Coding Languages</span>
        <span className="w-2/3 font-normal font-dmSans">
          {/* {skills.CodingKnowledge.map((language, index) => (
            <span key={index}>{language}</span>
          ))} */}
          {skills.CodingKnowledge.join(', ')}
        </span>
      </div>

      <div className="grid grid-cols-2">
        <span>Languages</span>
        <span className="w-2/3 font-normal font-dmSans">
          {/* {skills.Languages.map((language, index) => (
            <span key={index}>{language}</span>
          ))} */}
          {skills.Languages.join(', ')}
        </span>
      </div>
    </div>
  );
};

export default Skills;
