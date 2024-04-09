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
} from "../../../../redux/collage/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Mail = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const user = useSelector(getInbox);
  const index = searchParams.get("index");
  const type = searchParams.get("type");
  const { sendMailLoading, mail } = useSelector((state) => state.collageAuth);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (JSON.stringify(user) !== JSON.stringify(arr)) {
      console.log(user);
      setArr(user);
    }
  }, [user]);

  useEffect(() => {
    console.log("get amil");
    dispatch(getMail({ limit: 50, skip: 0 }));
  }, [sendMailLoading, ""]);

  return (
    <div className="w-11/12 mx-auto font-dmSans">
      <Header />

      <div className="bg-lGray bg-opacity-5  p-4 rounded-lg max-w-[80vw]">
        <div className="w-full bg-white flex mb-2 rounded-xl">
          <div className="w-1/4 h-[4.5rem] flex justify-between px-2">
            <select
              name=""
              id=""
              className="w-1/2 self-center select text-sm font-bold"
            >
              <option value="Primary">Primary</option>
            </select>
            <PiArrowCounterClockwiseBold className="self-center text-sm  text-gray-400 ml-4" />
          </div>
          <div className="w-1 bg-opacity-10 bg-blued rounded  h-14 my-auto"></div>

          <div className="w-3/4 h-[4.5rem] flex px-3">
            {type === "view" ? (
              <>
                <ViewBar />
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
            {arr.map((data, index) => (
              <Left data={data.mail} index={index} />
            ))}
          </div>
          <div className="w-3/4 bg-white rounded-lg">
            {type === "view" ? <View index={index} /> : <Compose />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mail;
