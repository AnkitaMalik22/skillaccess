import React, { useEffect, useState } from "react";
import { TfiClip } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { getInbox } from "../../../../redux/collage/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Left = ({ data, index }) => {
  const navigate = useNavigate();
  const user = useSelector(getInbox);
  const [arr, setArr] = useState([
    // { id: 1, isChecked: false },
    // { id: 2, isChecked: false },
    // { id: 3, isChecked: false },
    // { id: 4, isChecked: false },
  ]);

  useEffect(() => {
    if (JSON.stringify(user) !== JSON.stringify(arr)) {
      console.log(user);
      setArr(user);
    }
  }, [user]);
  return (
    <div
      className={`rounded-lg hover:bg-[#0052CC] hover:bg-opacity-5 p-3`}
      onClick={() =>
        navigate(`/collage/inbox/mail?index=${index}&type=view&show=all`)
      }
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-lg bg-gray-300 self-center"></div>
          <div className="self-center">
            <p className="leading-[16px] text-xs font-medium text-gray-400">
              {data?.from?.CollegeName}
            </p>
            <p className="leading-[16px] text-sm font-medium mt-2 max-w-20 line-clamp-1 break-words">
              {" "}
              {data?.subject}
            </p>
          </div>
        </div>
        <p className="leading-[16px] text-xs font-medium text-gray-400">
          10:48 PM
        </p>
      </div>

      <div className="flex gap-4 mt-2">
        <div className="w-10 flex justify-center self-center">
          <TfiClip className="rotate-180 text-xl font-extrabold text-gray-400 ml-1 max-w-36" />
        </div>
        <p
          className=" text-xs text-gray-400 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: data?.message }}
        ></p>
      </div>
    </div>
  );
};

export default Left;
