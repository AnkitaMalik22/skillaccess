import React from "react";
import { CgPinAlt } from "react-icons/cg";
import { LuClock3 } from "react-icons/lu";

const Education = ({ Education }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };


  if (!Education || Education.length === 0) {
    return (
      <div className="mt-5 text-center rounded-md mx-auto p-4 min-h-40">
        <p className="text-gray-500">No education found.</p>
      </div>
    )
  }
  // console.log(Educatoin)
  return (
    <div className=" min-h-40  text-center">
      {Education?.map((education, index) => {
        return (
          <div className="font-dmSans mt-2">
            <section className="px-3 ">
              <div className="flex justify-between">
                <div className="flex gap-2 py-1 mt-2">
                  <div className="min-w-[2.5rem] h-10 bg-slate-300 self-center rounded-md">
                    <img
                      src="/images/university.jpg"
                      alt="university"
                      className="w-10 h-10 rounded-md p-1"
                    />
                  </div>
                  <div className="ml-1 mt-1">
                    <h2 className="  font-bold  py-1 ">{education?.School}</h2>
                    <h2 className="font-normal  text-sm pb-2">
                      {education?.Degree}
                    </h2>
                  </div>
                </div>

                <span className="flex gap-12">
                  <div className="self-center text-gray-400 mr-2 font-medium">
                    <span className="flex gap-1 ">
                      {" "}
                      <LuClock3 className="self-center " />{" "}
                      <p className="self-center text-sm font-bold">
                        {formatDate(education?.StartDate)} to{" "}
                        {formatDate(education?.EndDate)}
                      </p>
                    </span>
                  </div>

                  <div className="self-center text-gray-400 mr-2">
                    <span className="flex gap-1">
                      {" "}
                      <CgPinAlt className="self-center text-lg font-bold" />{" "}
                      <p className="self-center text-sm font-bold">
                        Bhopal, India
                      </p>
                    </span>
                  </div>
                </span>
              </div>

              <p className="text-sm font-dmSans">{education?.Description}</p>
            </section>

            <section className="px-3 text-sm font-bold mt-5">
              <h2>Achievements ({education?.Media?.length})</h2>
              {education?.Media?.map((media, index) => (
                <div
                  className="flex flex-wrap mt-4 border-b-2 pb-5"
                  key={index}
                >
                  <img
                    src={media.url}
                    alt=""
                    className="w-60 h-40 object-cover rounded-md"
                  />
                </div>
              ))}
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default Education;
