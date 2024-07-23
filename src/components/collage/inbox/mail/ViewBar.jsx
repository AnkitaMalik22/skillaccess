import React, { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa";
import { FiCornerUpLeft, FiCornerUpRight, FiTrash } from "react-icons/fi";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import convertDate from "../../../../util/getDate";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMail,
  getMail,
  searchMail,
} from "../../../../redux/collage/auth/authSlice";
import {
  bookmarkMail,
  removeBookmarkedMail,
} from "../../../../redux/collage/Inbox/inboxSlice";
import { useSearchParams } from "react-router-dom";

const ViewBar = ({ filter, index, inboxType }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queries, setQueries] = useState({ limit: 50, skip: 0 });
  const show = searchParams.get("show");
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteMail({ id: Email.mail._id, type: inboxType }));
    if (show === "all") {
      dispatch(getMail({ limit: 50, skip: 0 }));
    } else {
      dispatch(searchMail(filter));
    }
    setEmail(
      mail[inboxType === "Received" ? "emailsReceived" : "emailsSent"][index]
    );
  };
  const { mail } = useSelector((state) => state.collageAuth);
  const [Email, setEmail] = useState(
    mail[inboxType === "received" ? "emailsReceived" : "emailsSent"][index]
  );

  useEffect(() => {
    console.log(show);
    if (show === "all") {
      dispatch(getMail({ limit: 50, skip: 0 })).then(() => {});
      setEmail(
        mail[inboxType === "Received" ? "emailsReceived" : "emailsSent"][index]
      );
    } else {
      dispatch(searchMail(filter));
    }
  }, ["", inboxType, index, dispatch]);

  return (
    <div className="flex w-full">
      <div className="w-full flex justify-between self-center">
        <div className="flex gap-2">
          {/* photo */}
          <div className="h-10 w-10 rounded-lg">
            <img
              src={
                inboxType === "Sent"
                  ? Email?.mail?.to.avatar.url
                  : Email?.mail?.from.avatar.url
              }
              alt=""
            />
          </div>
          {/*  */}

          <div className="flex gap-1 self-center flex-col">
            <p className="text-sm font-bold  ">Reply</p>
            <span className="flex gap-2">
              <p className="text-sm font-bold  text-gray-400">
                to{" "}
                {inboxType === "Sent"
                  ? Email?.mail?.to?.Email
                  : Email?.mail?.from?.Email}
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
            <TiStarFullOutline
              className="self-center"
              onClick={async () => {
                await dispatch(removeBookmarkedMail(Email?.mail._id));
                await dispatch(getMail(queries));
              }}
            />
          ) : (
            <TiStarOutline
              className="self-center"
              onClick={async () => {
                await dispatch(bookmarkMail(Email?.mail._id));
                await dispatch(getMail(queries));
              }}
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
