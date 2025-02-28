import React, { useEffect, useState } from "react";
import { TfiClip } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { getInbox } from "../../../../redux/college/auth/authSlice";
import { useNavigate } from "react-router-dom";
import convertDate from "../../../../util/getDate";
import { markAsRead } from "../../../../redux/college/Inbox/inboxSlice";

const Left = ({ data, index, inboxType }) => {
  const dispatch = useDispatch();
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
      // //console.log(user);
      if (inboxType === "Received") {
        setArr(user.received);
      } else {
        setArr(user.sent);
      }
    }
  }, [user]);
  return (
    <div
      className={`rounded-md hover:bg-accent hover:bg-opacity-5 p-3`}
      onClick={async () => {
        await dispatch(markAsRead({ type: inboxType, id: data._id }));
        navigate(
          `/college/inbox/mail?index=${index}&type=view&show=all&inboxType=${inboxType}`
        );
      }}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-md  self-center">
            <img
              src={
                inboxType === "Sent"
                  ? data?.to.avatar.url
                  : data?.from.avatar.url
              }
              alt=""
            />
          </div>
          <div className="self-center">
            <p className="leading-[16px] text-sm font-medium text-gray-400">
              {data?.from?.CollegeName}
            </p>
            <p className="leading-[16px] text-sm mt-2 max-w-20 font-bold line-clamp-1 break-words">
              {" "}
              {data?.subject}
            </p>
          </div>
        </div>
        <p className="leading-[16px] text-sm font-medium text-gray-400">
          {data?.Date && convertDate(data?.Date)}
        </p>
      </div>

      <div className="flex gap-4 mt-2">
        <div className="w-10 flex justify-center self-center">
          <TfiClip className="rotate-180 text-xl font-extrabold text-gray-400 ml-1 max-w-36" />
        </div>

        <p
          className=" text-sm text-gray-400 line-clamp-2 "
          dangerouslySetInnerHTML={{ __html: data?.message }}
        ></p>
      </div>
    </div>
  );
};

export default Left;
