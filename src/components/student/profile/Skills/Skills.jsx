import React from "react";
import { SiAdobephotoshop } from "react-icons/si";
import { Progress } from "../common/Progress";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header next={() => navigate("/student/profile/portfolio")} />
      <Progress level={3} />
      <div className="flex flex-col gap-10">
        <div>
          <span className="">Software Knowledge</span>
          <span className="flex gap-2 flex-wrap mt-3">
            <SiAdobephotoshop className="text-3xl bg-blued rounded-md " />
            <SiAdobephotoshop className="text-3xl bg-blued rounded-md " />
            <SiAdobephotoshop className="text-3xl bg-blued rounded-md " />
            <SiAdobephotoshop className="text-3xl bg-blued rounded-md " />
            <select
              name=""
              id=""
              className="select text-gray-400  !min-h-2 !h-10 self-center"
            >
              <option value="">Add Software</option>
            </select>
          </span>
        </div>

        <div>
          <div className="mb-2">Acheivements</div>
          <select
            name=""
            id=""
            className="select bg-gray-100 rounded-md !outline-none focus:!ring-0 focus:!border-none text-gray-400 w-1/2"
          >
            <option value="">Add Software</option>
          </select>
        </div>

        <div>
          <div className="mb-2">Coding Language</div>
          <select
            name=""
            id=""
            className="select bg-gray-100 rounded-md !outline-none focus:!ring-0 focus:!border-none text-gray-400 w-1/2"
          >
            <option value="">Add Software</option>
          </select>
        </div>

        <div>
          <div className="mb-2">Languages</div>
          <select
            name=""
            id=""
            className="select bg-gray-100 rounded-md !outline-none focus:!ring-0 focus:!border-none text-gray-400 w-1/2"
          >
            <option value="">Add Software</option>
          </select>
        </div>
      </div>{" "}
    </>
  );
};

export default Skills;
