import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BsPhone } from "react-icons/bs";
import { PiLinkSimple } from "react-icons/pi";
import { CgPinAlt } from "react-icons/cg";

const Personal = ({ imgRef, editable, setEditable, student, setStudent }) => {
  return (
    <section className="bg-gray-50 w-full rounded-xl px-6">
      {/* first section */}
      <div className=" flex justify-between border-b  bg-gray-50 rounded-t-lg py-8">
        {/* profile photo */}
        <div className="flex gap-2 px-3 py-1 mt-2">
          {editable ? (
            <div className="w-14 h-14 bg-blued self-center rounded-lg relative">
              <img src={""} alt="" width="50px" />

              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg p-[.35rem] bg-blue-700 bg-opacity-80">
                <img
                  src="../../images/icons/pen.png"
                  alt=""
                  onClick={() => imgRef.current.click()}
                />
              </div>
              <input
                ref={imgRef}
                type="file"
                name="avatar"
                id="file"
                className="hidden"
                accept="image/*"
                // onChange={handleAvatarChange}
              />
            </div>
          ) : (
            <div className="relative w-14 h-14 bg-blued self-center rounded-lg flex justify-center items-center">
              <img
                src={
                  student && student.avatar && student.avatar.url
                    ? student.avatar.url
                    : ""
                }
                alt="avatar"
                width="50px"
                className="relative top[-50%]  "
              />
              {editable && (
                <div className="absolute bottom-2 -right-1 w-6 h-6 rounded-lg p-[.35rem] bg-blue-700 bg-opacity-80">
                  <img
                    src="../../images/icons/pen.png"
                    alt=""
                    onClick={() => setEditable(true)}
                  />
                </div>
              )}
            </div>
          )}

          <div className="ml-1 mt-1">
            <h2 className="text-2xl  font-bold  py-1  ">
              {editable && student ? (
                <input
                  type="text"
                  value={
                    student && student.StudentName ? student.StudentName : ""
                  }
                  onChange={(e) =>
                    setStudent({ ...student, StudentName: e.target.value })
                  }
                  className="bg-transparent border-none focus:outline-none"
                />
              ) : student && student.StudentName ? (
                student.StudentName
              ) : (
                ""
              )}
            </h2>
            <h2 className="text-sm text-gray-400   pb-2">UPME00006369</h2>
          </div>
        </div>

        {/* {!editable && (
          <div className="self-center text-gray-400 mr-2">
            <button
              className="py-2 text-white rounded-xl  bg-blue-700 font-bold flex gap-2 px-4"
              onClick={() => {
                localStorage.setItem("editable", true);
                window.location.reload(true);
              }}
            >
              <img src="../../images/icons/pen.png" alt="" />{" "}
              <p>Edit Profile</p>
            </button>
          </div>
        )} */}
      </div>

      {/* second section */}

      <div className="px-6  py-8 bg-gray-50 font-dmSans flex sm:gap-32 text-sm font-medium">
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-lg bg-gray-200 flex justify-center">
            <MdOutlineEmail className="self-center text-2xl" />
          </div>
          {student && student.Email ? (
            <p className="self-center">
              {editable && student ? (
                <input
                  type="text"
                  value={student && student.Email ? student.Email : ""}
                  onChange={(e) =>
                    setStudent({ ...student, Email: e.target.value })
                  }
                  className={`border-none focus:outline-none ${
                    !student.Email ? "bg-gray-200" : "bg-transparent"
                  }`}
                  placeholder="Add Email"
                />
              ) : student && student.Email ? (
                student.Email
              ) : (
                ""
              )}
            </p>
          ) : (
            <p className=" font-medium self-center">No Email Available</p>
          )}
          {/* <p className="font-medium self-center">
      </p> */}
        </div>

        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-lg bg-gray-200 flex justify-center">
            <BsPhone className="self-center text-2xl" />
          </div>

          {/* {!student.Phone ?? <p className="self-center">No Phone Available</p>} */}

          <p className="self-center">
            {editable && student ? (
              <input
                type="tel" // Set input type to "tel" for telephone number
                maxLength={10} // Set maximum length to 10 digits
                value={student && student.Phone ? student.Phone : ""}
                onChange={(e) => {
                  // Ensure the entered value doesn't exceed 10 digits
                  if (e.target.value.length === 10) {
                    setStudent({ ...student, Phone: e.target.value });
                  }
                }}
                className={`border-none focus:outline-none appearance-none ${
                  !student.Phone ? "bg-gray-200" : "bg-transparent"
                }`}
                placeholder="Add Phone Number"
              />
            ) : student && student.Phone ? (
              student.Phone
            ) : (
              ""
            )}
          </p>
        </div>

        <div className="flex gap-2 font-dmSans">
          <div className="w-10 h-10 rounded-lg bg-gray-200 flex justify-center">
            {" "}
            <PiLinkSimple className="self-center text-2xl" />
          </div>
          {/* <p className="text-blue-700 self-center">http://www.vetindia.in/</p> */}

          {/* {!student.Website && (
        <p className="  self-center">No Website Available</p>
      )} */}

          {student ? (
            <>
              {editable && student ? (
                <input
                  type="text"
                  value={student && student.Website ? student.Website : ""}
                  onChange={(e) =>
                    setStudent({ ...student, Website: e.target.value })
                  }
                  className={`border-none focus:outline-none ${
                    !student.Website ? "bg-gray-200" : "bg-transparent"
                  }`}
                  placeholder="Add Student Website"
                />
              ) : (
                <a
                  className="self-center text-blue-400 underline"
                  href={student && student.Website ? student.Website : ""}
                  target="_blank"
                  rel="noreferrer"
                >
                  {student && student.Website ? student.Website : ""}
                </a>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="px-6 flex gap-2  pb-8">
        <div className="w-10 h-10  rounded-lg bg-gray-200 flex justify-center">
          {" "}
          <CgPinAlt className="self-center text-3xl" />
        </div>
        {/* <p className="break-words max-w-[316px] text-sm  font-dmSans font-medium self-center">
      G - 55-56, Street No.-1, Palam Extension, Near Sector - 7, Dwarka,
      Delhi, 110075
    </p> */}
        {/* {!student.Address && (
      <p className="break-words max-w-[316px] text-sm  font-dmSans font-medium self-center">
        No Address Available
      </p>
    )} */}

        {
          <>
            {editable && student ? (
              <input
                type="text"
                value={student && student.Address ? student.Address : ""}
                // onChange={(e) =>
                //   setStudent({ ...student, Address: e.target.value })
                // }
                className={`border-none focus:outline-none ${
                  !student.Address ? "bg-gray-200" : "bg-transparent"
                }`}
                placeholder="Student Address"
              />
            ) : (
              <p className="break-words max-w-[316px] text-sm  font-dmSans font-medium self-center">
                {student && student.Address ? student.Address : ""}
              </p>
            )}
          </>
        }
      </div>
    </section>
  );
};

export default Personal;
