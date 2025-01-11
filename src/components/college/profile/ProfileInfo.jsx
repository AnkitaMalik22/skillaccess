import React from "react";
import { MdOutlineEmail,  } from "react-icons/md";
import { CgPinAlt } from "react-icons/cg";
import { BsPhone } from "react-icons/bs";
import { PiLinkSimple } from "react-icons/pi";
import InputField from "../../InputField";

export const ProfileInfo = ({ college, editable, setCollege, isUni }) => {
  const infoFields = [
    {
      icon: MdOutlineEmail,
      key: isUni ? "email" : "Email",
      placeholder: "Add Email",
    },
    {
      icon: BsPhone,
      key: isUni ? "phone" : "Phone",
      placeholder: "Add Phone Number",
      type: "tel",
      maxLength: 10,
    },
    {
      icon: PiLinkSimple,
      key: isUni ? "website" : "Website",
      placeholder: "Add College Website",
    },
    {
      icon: CgPinAlt,
      key: isUni ? "address" : "Address",
      placeholder: "College Address",
    },
  ];

  return (
    <div className="px-6 py-8 bg-gray-50 font-dmSans flex flex-wrap gap-8 text-sm font-medium">
      {infoFields.map((field) => (
        <div key={field.key} className="flex gap-2">
          <div className="w-10 h-10 rounded-md bg-gray-200 flex justify-center">
            <field.icon className="self-center text-2xl" />
          </div>
          <div className="self-center">
            {editable ? (
              <InputField
                type={field.type || "text"}
                maxLength={field.maxLength}
                value={college[field.key] || ""}
                onChange={(e) =>
                  setCollege({ ...college, [field.key]: e.target.value })
                }
                className="rounded-md border-none focus:outline-none bg-[#f4f5f6] text-sm"
                placeholder={field.placeholder}
              />
            ) : (
              <p className="text-gray-500 bg-transparent text-sm">
                {college[field.key] || `No ${field.key} Available`}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
