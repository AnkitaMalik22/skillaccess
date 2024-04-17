import React,{useState} from "react";
import { FaSortDown } from "react-icons/fa";
import { FiCornerUpLeft, FiCornerUpRight, FiTrash } from "react-icons/fi";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import convertDate from "../../../../util/getDate";
import { useDispatch } from "react-redux";
import {
  deleteMail,
  getMail,
  searchMail,
} from "../../../../redux/collage/auth/authSlice";
import { bookmarkMail, removeBookmarkedMail } from "../../../../redux/collage/Inbox/inboxSlice";
import { useSearchParams } from "react-router-dom";

const ViewBar = ({ filter, Email }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queries, setQueries] = useState({ limit: 50, skip: 0 });
  const show = searchParams.get("show");
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteMail(Email.mail._id));
    if (show === "all") {
      dispatch(getMail({ limit: 50, skip: 0 }));
    } else {
      dispatch(searchMail(filter));
    }
  };
  return (
    <div className="flex w-full">
      <div className="w-full flex justify-between self-center">
        <div className="flex gap-2">
          {/* photo */}
          <div className="h-10 w-10 rounded-lg bg-blued"></div>
          {/*  */}

          <div className="flex gap-1 self-center flex-col">
            <p className="text-sm font-bold  ">Reply</p>
            <span className="flex gap-2">
              <p className="text-sm font-bold  text-gray-400">
                to {Email?.mail?.from?.Email}
              </p>

              {/* <FaSortDown className="text-gray-400" /> */}
            </span>
          </div>
        </div>

        {/* icons */}
        <div className="flex justify-between w-1/4">
          <FiTrash
            className="text-lg self-center text-gray-400 cursor-pointer"
            onClick={handleDelete}
          />
         {Email?.mail?.bookmarked ? (
                <TiStarFullOutline className="self-center"
                  onClick={async()=>{
                    await dispatch(removeBookmarkedMail(Email?.mail._id));
                    await dispatch(getMail(queries));
                  }
                    
                  }
                />
              ) : (
                <TiStarOutline className="self-center"
                onClick={async ()=>{
              await dispatch(bookmarkMail(Email?.mail._id));
              await dispatch(getMail(queries));
                }
              }
                />
              )}
          <FiCornerUpLeft className="text-lg self-center text-gray-400" />
          <FiCornerUpRight className="text-lg self-center text-gray-400" />

          <p className="text-xs font-bold self-center">
            {" "}
            {Email?.mail?.Date && convertDate(Email?.mail?.Date)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBar;
