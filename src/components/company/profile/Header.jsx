import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUploadImg } from "../../../redux/company/auth/companyAuthSlice";
import { FaCity, FaGlobe, FaIndustry, FaRegBuilding } from "react-icons/fa";
import DefaultCoverPhoto from "../../DefaultCoverPhoto";
import { MdEdit } from "react-icons/md";
import { FiUpload } from "react-icons/fi";

const Header = ({
  editing,
  editable,
  setEditable,
  company,
  setCompany,
  avatar,
  setCover,
  setAvatar,
}) => {
  const dispatch = useDispatch();
  const { uploadImg } = useSelector((state) => state.companyAuth);
  const [avatarPreview, setAvatarPreview] = useState(avatar);
  const [coverPreview, setCoverPreview] = useState(
    company?.basic?.coverPhoto || "default-cover.jpg"
  );
  const imgRef = useRef(null);
  const coverRef = useRef(null);
  useEffect(() => {
    if (uploadImg) {
      dispatch(setUploadImg(false));
    }
  }, [uploadImg]);

  useEffect(() => {
    setCoverPreview(company?.basic.coverPhoto);
  }, [company]);

  const handleCoverChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCover(reader.result);
        setCoverPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

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

  // Function to handle adding a new award
  const handleAddAward = () => {
    setCompany((prev) => {
      const newCompany = JSON.parse(JSON.stringify(prev));
      // Ensure you create a new array for awards to avoid direct mutation
      const newAwards = [
        ...newCompany.awards,
        { name: "", description: "", dateOfIssue: "", media: [] },
      ];
      newCompany.awards = newAwards; // Assign the new array back to the company object
      return newCompany;
    });
  };

  // Function to handle change in award input fields
  const handleAwardChange = (index, field, value) => {
    setCompany((prev) => {
      const newCompany = JSON.parse(JSON.stringify(prev));
      // console.log(newCompany)
      newCompany.awards[index][field] = value;
      return newCompany;
    });
  };

  // Function to remove an award
  const handleRemoveAward = (index) => {
    setCompany((prev) => {
      const newCompany = JSON.parse(JSON.stringify(prev));
      // const newCompany = { ...prev };
      newCompany.awards.splice(index, 1);
      return newCompany;
    });
  };

  const renderInputField = (
    label,
    value,
    keyPath,
    placeholder,
    isNotFullWidth,
    icon
  ) => (
    <div className={`${isNotFullWidth ? "w-fit" : "w-full"} mb-4`}>
      <label className="text-sm text-gray-500">{label}</label>

      <div className="flex items-center space-x-2">
        {icon && <span className="text-gray-400">{icon}</span>}
        {editable ? (
          <input
            type="text"
            value={value || ""}
            onChange={(e) =>
              setCompany((prev) => {
                // Deep clone the object
                const newCompany = JSON.parse(JSON.stringify(prev));

                const keys = keyPath.split(".");
                let obj = newCompany;
                for (let i = 0; i < keys.length - 1; i++) {
                  obj = obj[keys[i]];
                }
                obj[keys[keys.length - 1]] = e.target.value; // Now this modifies the new deep copy

                return newCompany;
              })
            }
            className={`${isNotFullWidth ? "w-fit" : "w-full"
              } p-2 rounded-md border-none focus:outline-none bg-[#f4f5f6]`}
            placeholder={placeholder}
          />
        ) : (
          <p className="text-gray-500">{value || `Add ${label}`}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-md relative">
      {/* Header Section */}

      {/* Cover Image Section */}
      <div className="relative w-full h-32 bg-[#e0e0e0] rounded-md mb-8">
        {company?.basic?.coverPhoto ? (
          <img
            src={editable ? coverPreview : company?.basic?.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <DefaultCoverPhoto />
        )}

        {editable && (
          <div className="absolute top-2 right-2">
            <button
              onClick={() => coverRef.current.click()}
              className="bg-accent text-white p-1 rounded-full"
            >
              <FiUpload />
            </button>
            <input
              ref={coverRef}
              type="file"
              name="coverImage"
              className="hidden"
              accept="image/*"
              onChange={handleCoverChange}
            />
          </div>
        )}

        {/* Avatar Section */}
        <div className="absolute left-6 bottom-[-28px] z- w-20 h-20 rounded-full bg-white flex justify-center items-center  shadow-lg">
          <img
            src={avatarPreview || company?.avatar?.url}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
          {editable && (
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-neutral flex items-center justify-center">
              <label htmlFor="avatarUpload" className="cursor-pointer">
                <FiUpload />
              </label>
              <input
                ref={imgRef}
                type="file"
                id="avatarUpload"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Basic Info Section */}
      <div className="mb-8">
        <div className="flex w-full gap-6  ">
          <h2 className="text-lg font-semibold  self-center">Basic Info</h2>
          {!editable && (
            <button
              className="py-2   bg-accent text-white rounded-md shadow-lg flex items-center justify-center gap-2 w-6 h-6"
              onClick={() => setEditable(true)}
            >
              <MdEdit />
              {/* <span>Edit Profile</span> */}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-6">
          {renderInputField(
            "Company Name",
            company?.basic?.companyName,
            "basic.companyName",
            "Add Company Name",
            true,
            <FaRegBuilding />
          )}

          {renderInputField(
            "Website",
            company?.basic?.website,
            "basic.website",
            "Add Website",
            true,
            <FaGlobe />
          )}
          {renderInputField(
            "Industry",
            company?.basic?.industry,
            "basic.industry",
            "Add Industry",
            true,
            <FaIndustry />
          )}
          {renderInputField(
            "HQ City",
            company?.basic?.hqCity,
            "basic.hqCity",
            "Add HQ City",
            true,
            <FaCity />
          )}
        </div>
      </div>

      {/* Leader Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Company Leader</h2>
        {renderInputField(
          "Leader Name",
          company?.leader?.name,
          "leader.name",
          "Add Leader Name"
        )}
        {renderInputField(
          "Leader Title",
          company?.leader?.title,
          "leader.title",
          "Add Leader Title"
        )}
      </div>

      {/* Location Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Location</h2>
        {renderInputField(
          "Location Name",
          company?.location?.locName,
          "location.locName",
          "Add Location Name"
        )}
        {renderInputField(
          "Address",
          company?.location?.address,
          "location.address",
          "Add Address"
        )}
      </div>

      {/* About Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">About</h2>
        {editable ? (
          <textarea
            className="w-full p-4 rounded-md border-none focus:outline-none bg-[#f4f5f6]"
            value={company?.about?.description || ""}
            onChange={(e) =>
              setCompany({
                ...company,
                about: { ...company.about, description: e.target.value },
              })
            }
            placeholder="Add a description about the company"
          />
        ) : (
          <p className="text-gray-500">
            {company?.about?.description || "Add About Section"}
          </p>
        )}
      </div>

      {/* Awards Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Awards</h2>
        {company?.awards?.map((award, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-50 rounded-md shadow-sm">
            <div className="flex justify-between items-center">
              {/* <h3 className="text-md font-semibold">Award {index + 1}</h3> */}
              {editable && (
                <button
                  onClick={() => handleRemoveAward(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Award Name</label>
                {editable ? (
                  <input
                    type="text"
                    value={award.name || ""}
                    onChange={(e) =>
                      handleAwardChange(index, "name", e.target.value)
                    }
                    className="w-full p-2 rounded-md border-none focus:outline-none bg-[#f4f5f6]"
                    placeholder="Add Award Name"
                  />
                ) : (
                  <p className="text-gray-500">
                    {award.name || "Add Award Name"}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-500">Description</label>
                {editable ? (
                  <textarea
                    value={award.description || ""}
                    onChange={(e) =>
                      handleAwardChange(index, "description", e.target.value)
                    }
                    className="w-full p-2 rounded-md border-none focus:outline-none bg-[#f4f5f6]"
                    placeholder="Add Award Description"
                  />
                ) : (
                  <p className="text-gray-500">
                    {award.description || "Add Description"}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Issue</label>
                {editable ? (
                  <input
                    type="date"
                    value={award.dateOfIssue || ""}
                    onChange={(e) =>
                      handleAwardChange(index, "dateOfIssue", e.target.value)
                    }
                    className="w-full p-2 rounded-md border-none focus:outline-none bg-[#f4f5f6]"
                  />
                ) : (
                  <p className="text-gray-500">
                    {award.dateOfIssue || "Add Date"}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-500">Media</label>
                {editable ? (
                  <input
                    type="text"
                    value={award.media.join(", ") || ""}
                    onChange={(e) =>
                      handleAwardChange(
                        index,
                        "media",
                        e.target.value.split(", ")
                      )
                    }
                    className="w-full p-2 rounded-md border-none focus:outline-none bg-[#f4f5f6]"
                    placeholder="Add Award Media URLs (comma separated)"
                  />
                ) : (
                  <p className="text-gray-500">
                    {award.media.length > 0
                      ? award.media.join(", ")
                      : "Add Media URLs"}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        {editable && (
          <button
            onClick={handleAddAward}
            className="mt-4 py-2 px-4 bg-neutral text-white rounded-md shadow-lg"
          >
            Add Award
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
