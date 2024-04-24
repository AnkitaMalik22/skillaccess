import React, { useEffect, useRef } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { CgPinAlt } from "react-icons/cg";
import { BsPhone } from "react-icons/bs";
import { PiLinkSimple } from "react-icons/pi";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCollege,
  setUploadImg,
  updateAvatar,
  updateCollege,
} from "../../../../redux/collage/auth/authSlice";

const Header = ({
  editable,
  setEditable,
  college,
  setCollege,
  avatar,
  setAvatar,
}) => {
  const dispatch = useDispatch();
  const [avatarPreview, setAvatarPreview] = useState(avatar);
  const { uploadImg } = useSelector((state) => state.collageAuth);

  useEffect(() => {
    dispatch(getCollege());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCollege());
    if (uploadImg) {
      dispatch(setUploadImg(false));
    }
    console.log(uploadImg);
  }, [uploadImg]);

  const handleAvatarChange = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    // const formData = new FormData();

    // formData.append("avatar", e.target.files[0].toString());
    // setAvatar( e.target.files[0]);
    // dispatch(updateAvatar({
    //   avatar: e.target.files[0]
    // }));
  };
  const imgRef = useRef(null);
  return (
    // {/* profile container */}
    <section className="bg-gray-50 rounded-xl px-6">
      {/* first section */}
      <div className=" flex justify-between border-b  bg-gray-50 rounded-t-lg py-8">
        {/* profile photo */}
        <div className="flex gap-2 px-3 py-1 mt-2">
          {editable ? (
            <div className="w-14 h-14 bg-blued self-center rounded-lg relative">
              <img src={avatar} alt="" width="56px"  className="rounded-lg"/>

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
                onChange={handleAvatarChange}
              />
            </div>
          ) : (
            <div className="relative w-14 h-14 bg-blued self-center rounded-lg flex justify-center items-center ">
              <img
                src={
                  college && college.avatar && college.avatar.url
                    ? college.avatar.url
                    : ""
                }
                alt="avatar"
                width="56px"
                className="relative top[-50%]  rounded-lg "
              />
              {/* {editable && (
                <div className="absolute bottom-2 -right-1 w-6 h-6 rounded-lg p-[.35rem] bg-blue-700 bg-opacity-80">
                  <img
                    src="../../images/icons/pen.png"
                    alt=""
                    onClick={() => setEditable(true)}
                  />
                </div>
              )} */}
            </div>
          )}

          <div className="ml-1 mt-1">
            <h2 className="3xl:text-[28px] text-[20px] font-extrabold  py-1  ">
              {editable && college ? (
                <input
                  type="text"
                  value={
                    college && college.CollegeName ? college.CollegeName : ""
                  }
                  onChange={(e) =>
                    setCollege({ ...college, CollegeName: e.target.value })
                  }
                  className="bg-transparent border-none focus:outline-none w-full min-w-[30vw]  text-[20px] font-extrabold   "
                />
              ) : college && college.CollegeName ? (
      <p className="text-[20px] font-extrabold  py-1  ">
        {          college.CollegeName}
      </p>
              ) : (
                ""
              )}
            </h2>
            <h2 className="text-sm text-gray-400   pb-2">UPME00006369</h2>
          </div>
        </div>

        {!editable && (
          <div className="self-center text-gray-400 mr-2">
            <button
              className="py-2 text-white rounded-xl  bg-blue-700 font-bold flex gap-2 px-4"
              onClick={() => {
                localStorage.setItem("editable", true);
                setEditable(true);
                // window.location.reload(true);
              }}
            >
              <img src="../../images/icons/pen.png" alt="" />{" "}
              <p>Edit Profile</p>
            </button>
          </div>
        )}
      </div>

      {/* second section */}
      <div className="border-b px-6  py-8 bg-gray-50 font-dmSans">
        <h1 className="text-lg font-bold">Overview</h1>
        {college && college.Description ? (
          <div className="text-sm  font-medium mt-2">
            {editable && college ? (
              <textarea
                className=" rounded-lg mt-2 text-sm bg-[#f4f5f6] border-none focus:outline-none w-full max-w-[80vw] h-full min-h-[25vh] leading-loose text-gray-500"
                type="text"
                value={
                  college && college.Description ? college.Description : ""
                }
                onChange={(e) =>
                  setCollege({ ...college, Description: e.target.value })
                }
              />
            ) : college && college.Description ? (
             <p className="text-sm  font-medium mt-2 leading-loose text-gray-500">
                {college.Description}
              </p>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="text-sm  font-medium mt-2 text-gray-500  rounded-lg">
            {editable && college ? (
              <textarea
                type="text"
                value={
                  college && college.Description ? college.Description : ""
                }
                onChange={(e) =>
                  setCollege({ ...college, Description: e.target.value })
                }
                className={`rounded-lg mt-2 border-none focus:outline-none w-full max-w-[80vw]  h-full min-h-[25vh]  text-gray-500 bg-[#f4f5f6]
                `}
                placeholder="Add Description"
              />
            ) : (
              "No Description Available"
            )}
          </div>
        )}
      </div>
      <div className="px-6  py-8 bg-gray-50 font-dmSans flex sm:gap-16 text-sm font-medium " >
        <div className="flex gap-2 ">
          <div className="w-10 h-10 rounded-2xl bg-gray-200 flex justify-center">
            <MdOutlineEmail className="self-center text-2xl" />
          </div>
          {college && college.Email ? (
            <p className="self-center">
              {editable && college ? (
                <input
                  type="text"
                  value={college && college.Email ? college.Email : ""}
                  onChange={(e) =>
                    setCollege({ ...college, Email: e.target.value })
                  }
                  className={` rounded-lg border-none focus:outline-none bg-[#f4f5f6]  `}
                  placeholder="Add Email"
                />
              ) : college && college.Email ? (
                <p className=" text-gray-500 bg-transparent text-sm"> { college.Email}</p>
              
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
          <div className="w-10 h-10 rounded-2xl bg-gray-200 flex justify-center">
            <BsPhone className="self-center text-2xl" />
          </div>

          {/* {!college.Phone ?? <p className="self-center">No Phone Available</p>} */}

          <div className="self-center font-medium">
            {editable && college ? (
              <input
                type="tel" // Set input type to "tel" for telephone number
                maxLength={10} // Set maximum length to 10 digits
                value={college && college.Phone ? college.Phone : ""}
                onChange={(e) => {
                  // Ensure the entered value doesn't exceed 10 digits
                  if (e.target.value.length <= 10) {
                    setCollege({ ...college, Phone: e.target.value });
                  }
                }}
                className={` rounded-lg border-none focus:outline-none appearance-none bg-[#f4f5f6] text-sm `}
                placeholder="Add Phone Number"
              />
            ) : college && college.Phone ? (
              <p className="text-gray-500 bg-transparent text-sm">
                {college.Phone}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex gap-2 font-dmSans font-medium">
          <div className="w-10 h-10 rounded-2xl bg-gray-200 flex justify-center">
            {" "}
            <PiLinkSimple className="self-center text-2xl" />
          </div>
          {/* <p className="text-blue-700 self-center">http://www.vetindia.in/</p> */}

          {/* {!college.Website && (
            <p className="  self-center">No Website Available</p>
          )} */}

          {college ? (
            <>
              {editable && college ? (
                <input
                  type="text"
                  value={college && college.Website ? college.Website : ""}
                  onChange={(e) =>
                    setCollege({ ...college, Website: e.target.value })
                  }
                  className={` rounded-lg border-none focus:outline-none bg-[#f4f5f6]`}
                  placeholder="Add College Website"
                />
              ) : (
                <a
                  className="self-center text-blue-400 underline bg-transparent font-medium"
                  href={college && college.Website ? college.Website : ""}
                  target="_blank"
                  rel="noreferrer"
                >
                  {college && college.Website ? college.Website : ""}
                </a>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="px-6 flex gap-2  pb-8 ">
        <div className="w-10 h-10  rounded-2xl bg-gray-200 flex justify-center">
          {" "}
          <CgPinAlt className="self-center text-3xl" />
        </div>
        {/* <p className="break-words max-w-[316px] text-sm  font-dmSans font-medium self-center">
          G - 55-56, Street No.-1, Palam Extension, Near Sector - 7, Dwarka,
          Delhi, 110075
        </p> */}
        {/* {!college.Address && (
          <p className="break-words max-w-[316px] text-sm  font-dmSans font-medium self-center">
            No Address Available
          </p>
        )} */}

        {college ? (
          <>
            {editable && college ? (
              <input
                type="text"
                value={college && college.Address ? college.Address : ""}
                onChange={(e) =>
                  setCollege({ ...college, Address: e.target.value })
                }
                className={` rounded-lg border-none focus:outline-none bg-[#f4f5f6] break-words  w-full max-w-[416px]`}
                placeholder="College Address"
              />
            ) : (
              <p className="break-words max-w-[316px] text-sm  font-dmSans font-medium self-center text-gray-500  bg-transparent">
                {college && college.Address ? college.Address : ""}
              </p>
            )}
          </>
        ) : (
          <p className="break-words max-w-[316px] text-sm  font-dmSans font-medium self-center ">
            No Address Available
          </p>
        )}
      </div>
    </section>
  );
};

export default Header;
