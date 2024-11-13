import React, { useEffect, useRef } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { CgPinAlt } from "react-icons/cg";
import { BsPhone } from "react-icons/bs";
import { PiLinkSimple } from "react-icons/pi";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCompany,
  setUploadImg,
  updateAvatar,
  updateCompany,
} from "../../../redux/company/auth/companyAuthSlice";
import Loader from "../../loaders/Loader";

const Header = ({
  editing,
  editable,
  setEditable,
  company,
  setCompany,
  avatar,
  setAvatar,
}) => {
  const dispatch = useDispatch();
  // const { uploadImg } = useSelector((state) => state.collageAuth);
  const { data:user, isLoggedIn, uploadImg } = useSelector(
    (state) => state.companyAuth
  );
  const [avatarPreview, setAvatarPreview] = useState(avatar);
  const imgRef = useRef(null);
  // useEffect(() => {
  //   dispatch(getcompany());
  // }, [dispatch]);
  useEffect(() => {
    // dispatch(getcompany());
    if (uploadImg) {
      dispatch(setUploadImg(false));
    }
  }, [uploadImg]);

  const handleAvatarChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    // {/* profile container */}
    <div className="bg-gray-50 rounded-xl p-5">
      {/* first section */}
      <div className=" flex justify-between border-b  bg-gray-50 rounded-t-lg">
        {/* profile photo */}
        <div className="flex gap-2 px-3 py-1 mt-2">
          {editable ? (
            <div className="w-14 h-14 bg-blued self-center rounded-lg relative">
              <img src={avatar} alt="" width="56px" className="rounded-lg" />

              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg p-[.35rem] bg-accent bg-opacity-80">
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
            <div className="relative w-14 h-14 bg-gray-200 self-center rounded-lg flex justify-center items-center">
              <img
                src={
                  company && company.avatar && company.avatar.url
                    ? company.avatar.url
                    : ""
                }
                alt="avatar"
                width="56px"
                className="relative p-2 rounded-lg "
              />
            </div>
          )}

          <div className="ml-1 mt-1">
            <h2 className="3xl:text-[28px] text-[20px] font-extrabold  py-1  ">
              {editable && company ? (
                <input
                  type="text"
                  value={
                    company && company.basic?.companyName ? company?.basic?.companyName : ""
                  }
                  onChange={(e) =>
                    setCompany({ ...company, basic: { ...company.basic, companyName: e.target.value } })
                  }
                  className="bg-transparent border-none focus:outline-none w-full min-w-[30vw]  text-[20px] font-extrabold   "
                />
              ) : company && company.basic?.companyName ? (
                <p className="text-[20px] font-extrabold  py-1  ">
                  {company.basic?.companyName}
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
              className="py-2 text-white rounded-xl  bg-accent font-bold flex gap-2 px-4 disabled:bg-blue-500"
              disabled={editing}
              onClick={() => {
                if (editing) {
                  return;
                }
                localStorage.setItem("editable", true);
                setEditable(true);
                // window.location.reload(true);
              }}
            >
              {editing ? (
                <Loader />
              ) : (
                <img src="../../images/icons/pen.png" alt="" />
              )}{" "}
              <p>Edit Profile</p>
            </button>
          </div>
        )}
      </div>

      {/* second section */}
      <div className="border-b px-6  py-8 bg-gray-50 font-dmSans">
        <h1 className="text-lg font-bold">Overview</h1>
        {company && company?.about?.description ? (
          <div className="text-sm  font-medium mt-2">
            {editable && company ? (
              <textarea
                className="mt-2 bg-transparent border-none focus:outline-none w-full max-w-[80vw]"
                type="text"
                value={
                  company && company?.about?.description ? company?.about?.description : ""
                }
                onChange={(e) =>
                  setCompany({ ...company, about: { ...company.about, description: e.target.value } })
                }
              />
            ) : company && company?.about?.description ? (
              <p className="text-sm  font-medium mt-2 leading-loose text-gray-500">
                {company?.about?.description}
              </p>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="text-sm  font-medium mt-2 text-gray-500  rounded-lg">
            {editable && company ? (
              <textarea
                type="text"
                value={
                  company && company?.about?.description ? company?.about?.description : ""
                }
                onChange={(e) =>
                  setCompany({ ...company, about: { ...company.about,description: e.target.value } })
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
      <div className="px-6  py-8 bg-gray-50 font-dmSans flex sm:gap-16 text-sm font-medium ">
        <div className="flex gap-2 ">
          <div className="w-10 h-10 rounded-2xl bg-gray-200 flex justify-center">
            <MdOutlineEmail className="self-center text-2xl" />
          </div>
          {company && company.Email ? (
            <p className="self-center">
              {editable && company ? (
                <input
                  type="text"
                  value={company && company.Email ? company.Email : ""}
                  onChange={(e) =>
                    setCompany({ ...company, Email: e.target.value })
                  }
                  className={` rounded-lg border-none focus:outline-none bg-[#f4f5f6]  `}
                  placeholder="Add Email"
                />
              ) : company && company.Email ? (
                <p className=" text-gray-500 bg-transparent text-sm">
                  {" "}
                  {company.Email}
                </p>
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

          {/* {!company.Phone ?? <p className="self-center">No Phone Available</p>} */}

          <div className="self-center font-medium">
            {editable && company ? (
              <input
                type="tel" // Set input type to "tel" for telephone number
                maxLength={10} // Set maximum length to 10 digits
                value={company && company.Phone ? company.Phone : ""}
                onChange={(e) => {
                  // Ensure the entered value doesn't exceed 10 digits
                  if (e.target.value.length <= 10) {
                    setCompany({ ...company, Phone: e.target.value });
                  }
                }}
                className={` rounded-lg border-none focus:outline-none appearance-none bg-[#f4f5f6] text-sm `}
                placeholder="Add Phone Number"
              />
            ) : company && company.Phone ? (
              <p className="text-gray-500 bg-transparent text-sm">
                {company.Phone}
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

          {/* {!company?.basic?.website && (
            <p className="  self-center">No Website Available</p>
          )} */}

          {company ? (
            <>
              {editable && company ? (
                <input
                  type="text"
                  value={company && company?.basic?.website ? company?.basic?.website : ""}
                  onChange={(e) =>
                    setCompany({ ...company, basic: { ...company.basic, website: e.target.value } })
                  }
                  className={` rounded-lg border-none focus:outline-none bg-[#f4f5f6]`}
                  placeholder="Add company Website"
                />
              ) : (
                <a
                  className="self-center text-lightBlue underline bg-transparent font-medium"
                  href={company && company?.basic?.website ? company?.basic?.website : ""}
                  target="_blank"
                  rel="noreferrer"
                >
                  {company && company?.basic?.website ? company?.basic?.website : ""}
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
        {/* {!company?.location?.locName && (
          <p className="break-words max-w-[316px] text-sm  font-dmSans font-medium self-center">
            No Address Available
          </p>
        )} */}

        {company ? (
          <>
            {editable && company ? (
              <input
                type="text"
                value={company && company?.location?.locName ? company?.location?.locName : ""}
                onChange={(e) =>
                  setCompany({ ...company, location: { ...company.location, locName: e.target.value } })
                }
                className={` rounded-lg border-none focus:outline-none bg-[#f4f5f6] break-words  w-full max-w-[416px]`}
                placeholder="company Address"
              />
            ) : (
              <p className="break-words max-w-[316px] text-sm  font-dmSans font-medium self-center">
                {company && company?.location?.locName ? company?.location?.locName : ""}
              </p>
            )}
          </>
        ) : (
          <p className="break-words max-w-[316px] text-sm  font-dmSans font-medium self-center">
            No Address Available
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;