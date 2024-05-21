import React, { useEffect, useState } from "react";
import Header from "./Header";
import Left from "./Left";
import View from "./View";
import { useParams, useSearchParams } from "react-router-dom";
import Compose from "./Compose";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";

import ViewBar from "./ViewBar";
import ComposeBar from "./ComposeBar";
import {
  getCollege,
  getInbox,
  getMail,
  getSentEmails,
  searchMail,
} from "../../../../redux/collage/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Mail = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const show = searchParams.get("show");
  const user = useSelector(getInbox);
  const index = searchParams.get("index");
  const type = searchParams.get("type");
  const { sendMailLoading, mail } = useSelector((state) => state.collageAuth);
  const [arr, setArr] = useState([]);
  const [inboxType, setInboxType] = useState(searchParams.get("inboxType"));
  const Email =
    mail[inboxType === "received" ? "emailsReceived" : "emailsSent"][index];
  const [filter, setFilter] = useState({
    type:
      searchParams.get("typeFilter") === "null"
        ? null
        : searchParams.get("typeFilter"),
    within:
      searchParams.get("within") === "null" ? null : searchParams.get("within"),
    keyword:
      searchParams.get("keyword") === "null"
        ? null
        : searchParams.get("keyword"),
    from: searchParams.get("from") === "null" ? null : searchParams.get("from"),
    to: searchParams.get("to") === "null" ? null : searchParams.get("to"),
    date: searchParams.get("date") === "null" ? null : searchParams.get("date"),
  });

  useEffect(() => {
    if (JSON.stringify(user) !== JSON.stringify(arr)) {
      console.log(user);
      if (inboxType === "Received") {
        setArr(user.received);
      } else {
        setArr(user.sent);
      }
    }
  }, [user]);

  useEffect(() => {
    console.log(user);
    if (inboxType === "Received") {
      setArr(user.received);
    } else {
      setArr(user.sent);
    }
  }, [inboxType]);

  useEffect(() => {
    if (show !== "search") {
      dispatch(getMail({ limit: 50, skip: 0 }));
    } else {
      dispatch(searchMail(filter));
    }
  }, [sendMailLoading, ""]);

  return (
    <div className="w-11/12 mx-auto font-dmSans">
      <Header />

      <div className="bg-lGray bg-opacity-5  p-4 rounded-lg max-w-[80vw]">
        <div className="w-full bg-white flex mb-2 rounded-xl">
          <div className="w-1/4 h-[4.5rem] flex justify-between px-2">
            <select
              name=""
              value={inboxType}
              id=""
              className="w-1/2 self-center select text-sm font-bold"
              onChange={(e) => {
                setInboxType(e.target.value);
              }}
            >
              <option value="Received">Primary</option>
              <option value="Sent">Sent</option>
            </select>
            <PiArrowCounterClockwiseBold className="self-center text-sm  text-gray-400 ml-4" />
          </div>
          <div className="w-1 bg-opacity-10 bg-blued rounded  h-14 my-auto"></div>

          <div className="w-3/4 h-[4.5rem] flex px-3">
            {type === "view" ? (
              <>
                <ViewBar
                  filter={filter}
                  Email={Email}
                  index={index}
                  inboxType={inboxType}
                />
              </>
            ) : (
              <>
                <ComposeBar />
              </>
            )}
          </div>
        </div>
        <div className="min-h-[70vh] w-full flex gap-4">
          <div className="w-1/4 bg-white p-2 overflow-y-scroll rounded-lg">
            {arr?.map((data, index) => (
              <Left data={data.mail} index={index} inboxType={inboxType} />
            ))}
          </div>
          <div className="w-3/4 bg-white rounded-lg">
            {type === "view" ? (
              <View index={index} filter={filter} inboxType={inboxType} />
            ) : (
              <Compose />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mail;
