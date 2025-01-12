import React from "react";
import { SiAdobephotoshop } from "react-icons/si";

const Skills = () => {
  return (
    <div className="w-full">
      <span className="flex gap-2">
        <h2 className="text-2xl  font-bold  py-1  self-center">Skills</h2>{" "}
        <div className=" p-[.3rem] w-6 h-6 rounded-md  bg-accent bg-opacity-80 self-center">
          <img
            src="/images/icons/pen.png"
            alt="pen"
            // onClick={() => setEditable(!editable)}
          />
        </div>
      </span>
      <div className="grid  grid-rows-4 px-4 text-base font-bold gap-8 mt-2 font-dmSans">
        <div className="grid grid-cols-2">
          <span className="">Software Knowledge</span>
          <span className="flex gap-2 flex-wrap">
            <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-md " />
            <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-md " />
            <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-md " />
            <SiAdobephotoshop className="text-3xl bg-blue-600 rounded-md " />
          </span>
        </div>

        <div className="grid grid-cols-2">
          <span className="">Acheivements</span>
          <span className="w-2/3 font-normal font-dmSans">
            Certified HTML developer, Javascript , Angular JS, Php, Swift
          </span>
        </div>

        <div className="grid grid-cols-2">
          <span className="">Coding Languages</span>
          <span className="w-2/3 font-normal font-dmSans">
            Certified HTML developer, Javascript , Angular JS, Php, Swift
          </span>
        </div>

        <div className="grid grid-cols-2">
          <span className="">Languages</span>
          <span className="w-2/3 font-normal font-dmSans">
            Hindi, English, Gujarati
          </span>
        </div>
      </div>
    </div>
  );
};

export default Skills;
