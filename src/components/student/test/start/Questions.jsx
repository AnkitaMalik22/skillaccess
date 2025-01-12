import React from "react";

const Questions = () => {
  return (
    <>
      <div className="mx-6 flex bg-[#F8F8F9] rounded-md justify-between my-4">
        <div className="w-11/12 flex flex-col gap-2">
          {/* {search.get(`${Number}`) !== "true" ? ( */}
          <h2 className="flex px-4 gap-3 font-semibold pt-3 text-base ">
            <div className=""> 1</div>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: "Title" }}
            ></div>
          </h2>

          <div className="px-5 pb-4 flex flex-col gap-4 pt-2">
            <span className="flex gap-2">
              <div className="flex w-5 justify-center">
                <input
                  type="radio"
                  id="answer"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                />{" "}
              </div>
              <label for="answer" className="self-center">
                abc
              </label>
              {/* <label for="answer" className="self-center">
                abd
                </label>
                <label for="answer" className="self-center">
                abd
                </label>
                <label for="answer" className="self-center">
                abd
                </label> */}
            </span>
            <span className="flex gap-2">
              <div className="flex w-5 justify-center">
                <input
                  type="radio"
                  id="answer"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                />{" "}
              </div>
              <label for="answer" className="self-center">
                abc
              </label>
              {/* <label for="answer" className="self-center">
                abd
                </label>
                <label for="answer" className="self-center">
                abd
                </label>
                <label for="answer" className="self-center">
                abd
                </label> */}
            </span>
            <span className="flex gap-2">
              <div className="flex w-5 justify-center">
                <input
                  type="radio"
                  id="answer"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                />{" "}
              </div>
              <label for="answer" className="self-center">
                abc
              </label>
              {/* <label for="answer" className="self-center">
                abd
                </label>
                <label for="answer" className="self-center">
                abd
                </label>
                <label for="answer" className="self-center">
                abd
                </label> */}
            </span>
            <span className="flex gap-2">
              <div className="flex w-5 justify-center">
                <input
                  type="radio"
                  id="answer"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                />{" "}
              </div>
              <label for="answer" className="self-center">
                abc
              </label>
              {/* <label for="answer" className="self-center">
                abd
                </label>
                <label for="answer" className="self-center">
                abd
                </label>
                <label for="answer" className="self-center">
                abd
                </label> */}
            </span>
            {/* ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
