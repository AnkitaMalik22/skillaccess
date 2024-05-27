import React, { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa6";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { TfiClip } from "react-icons/tfi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollege,
  getInbox,
  getMail,
  getSentEmails,
  searchMail,
} from "../../../../redux/collage/auth/authSlice";
import {
  bookmarkMail,
  markAsRead,
  removeBookmarkedMail,
} from "../../../../redux/collage/Inbox/inboxSlice";
import socketIOClient from "socket.io-client";
import convertDate from "../../../../util/getDate";

const ENDPOINT = process.env.REACT_APP_API_URL; // Socket.IO server endpoint
const List = ({ show, inboxType, setInboxType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getInbox);
  const [arr, setArr] = useState([]);

  const { total, totalSent } = useSelector((state) => state.collageAuth?.mail);

  const email = useSelector((state) => state.collageAuth?.user?.Email);
  const [Total, setTotal] = useState(0);
  const [totalmails, setTotalmails] = useState(
    inboxType === "Sent" ? totalSent : total
  );

  const [socket, setSocket] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queries, setQueries] = useState({
    limit: 5,
    skip: parseInt(searchParams.get("skip")) || 0,
  });
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
    const socket = socketIOClient(ENDPOINT);
    setSocket(socket);
    console.log("email");
    getMails();

    //join room with  you mail as room id
    socket.emit("joinRoom", email);

    //listen for messages to your room
    socket.on("message", (roomName, message) => {
      getMails();
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const getMails = () => {
    if (searchParams.get("show") === "search") {
      dispatch(
        searchMail({ ...filter, limit: queries.limit, skip: queries.skip })
      );
    } else {
      dispatch(getMail(queries));
    }
  };
  const handleNav = async (i, el) => {
    await dispatch(markAsRead({ type: inboxType, id: el.mail._id }));
    navigate(
      `/collage/inbox/mail?index=${i}&inboxType=${inboxType}&type=view&show=${show}&within=${searchParams.get(
        "within"
      )}&keyword=${searchParams.get("keyword")}&from=${searchParams.get(
        "from"
      )}&to=${searchParams.get("to")}&date=${searchParams.get(
        "date"
      )}&typeFilter=${searchParams.get("typeFilter")}`
    );
  };
  const handleLeft = () => {
    if (queries.skip <= 0) {
      return;
    }
    let skip = queries.skip - queries.limit;
    setSearchParams({ skip: skip });
    setQueries((prev) => {
      let skip = prev.skip - prev.limit;
      return { ...prev, skip: skip };
    });
    if (searchParams.get("show") === "search") {
      dispatch(
        searchMail({
          ...filter,
          limit: queries.limit,
          skip: queries.skip - queries.limit,
        })
      );
    } else {
      dispatch(
        dispatch(
          getMail({ limit: queries.limit, skip: queries.skip - queries.limit })
        )
      );
    }
  };
  const handleRight = () => {
    if (queries.skip > totalmails) {
      return;
    }
    let skip = queries.skip + queries.limit;

    setSearchParams({ ...Object.fromEntries(searchParams), skip });
    setQueries((prev) => {
      let skipCopy = prev.skip + prev.limit;
      return { ...prev, skip: skipCopy };
    });

    if (searchParams.get("show") === "search") {
      dispatch(
        searchMail({
          ...filter,
          limit: queries.limit,
          skip: queries.skip + queries.limit,
        })
      );
    } else {
      dispatch(
        getMail({ limit: queries.limit, skip: queries.skip + queries.limit })
      );
    }
  };
  useEffect(() => {
    if (inboxType === "Sent") {
      setTotalmails(totalSent);
    } else {
      setTotalmails(total);
    }
  }, [total, totalSent]);

  useEffect(() => {
    if (JSON.stringify(user) !== JSON.stringify(arr)) {
      console.log(user);
      if (inboxType === "Received") {
        setArr(user.received);
        setTotal(user.received.length);
      } else {
        setArr(user.sent);
        setTotal(user.sent.length);
      }
    }
  }, [user]);

  useEffect(() => {
    console.log(user);
    if (inboxType === "Received") {
      setArr(user.received);
      setTotal(user.received.length);
      console.log("total : ", total);
    } else {
      setArr(user.sent);
      setTotal(user.sent.length);
      console.log("total : ", total);
    }
  }, [inboxType]);

  const handleCheckbox = (e) => {
    const { checked, id, name } = e.target;
    console.log(name);
    if (name === "all") {
      let copy = arr.map((item) => {
        return { ...item, isChecked: checked };
      });
      setArr(copy);
    } else {
      let copy = arr.map((item) => {
        return item._id == id ? { ...item, isChecked: checked } : item;
      });
      console.log(copy);
      setArr(copy);
    }
  };

  // useEffect(() => {
  //   dispatch(getMail(queries));
  // }, [queries]);

  console.log(arr);
  return (
    <div className="bg-[#8F92A1] bg-opacity-5 rounded-t-xl pb-4">
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      {/* <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
       
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog> */}

      <div className="flex border-b border-gray-200 p-4 justify-between rounded-t-xl w-[99.9%] mx-auto">
        <div className="flex gap-2 self-center">
          <input
            name="all"
            onChange={(e) => handleCheckbox(e)}
            type="checkbox"
            checked={arr.filter((item) => item?.isChecked !== true).length < 1}
            className="border-none bg-[#DEEBFF] rounded self-center"
          />
          <div className="h-4  flex self-center ">
            {/* <FaSortDown
              className=" text-gray-400 h-full self-center "
              // onClick={() => document.getElementById("my_modal_3").showModal()}
            /> */}

            <select
              className="w-fit mx-auto select focus:!outline-none h-fit focus:border-0 text-sm font-dmSans self-center bg-transparent text-gray-400 font-bold"
              onChange={(e) => {
                setInboxType(e.target.value);
                setQueries({ skip: 0, limit: queries.limit });
                if (e.target.value === "Sent") {
                  setTotalmails(totalSent);
                } else {
                  setTotalmails(total);
                }
              }}
            >
              <option value="Received">Received</option>
              <option value="Sent">Sent</option>
            </select>
          </div>
          <PiArrowCounterClockwiseBold className="self-center text-sm  text-gray-400 ml-4" />
          <HiDotsVertical className="self-center text-sm  text-gray-400" />
        </div>
        <div className="flex gap-2 self-center">
          <p className="text-gray-400 text-xs font-bold">
            {queries.skip}-{queries.skip + Total} of {totalmails}
          </p>
          {queries.skip > 0 && <FaChevronLeft onClick={handleLeft} />}

          {Total < totalmails && <FaChevronRight onClick={handleRight} />}
        </div>
      </div>
      <div className="p-4 font-medium text-gray-400">
        <h1>Today</h1>
      </div>

      {arr?.map((el, i) => {
        console.log(el);
        return (
          <div className="mb-4 bg-white rounded-lg flex justify-between py-4 w-[98%] mx-auto ">
            <div className="flex gap-4 ">
              {el.isChecked ? (
                <div className=" min-w-[3rem]  h-12 self-center  mr-2  flex items-center justify-center ">
                  {" "}
                  {/* <img
                    src={el.mail.from.avatar.url}
                    alt=""
                    width="10px"
                    height="10px"
                  /> */}
                </div>
              ) : (
                <div className=" min-w-[3rem]  h-12 self-center  mr-2  flex items-center justify-center ">
                  {" "}
                  {/* <img
                    src={el.mail.from.avatar.url}
                    alt=""
                    width="10px"
                    height="10px"
                  /> */}
                </div>
              )}

              <input
                name="k"
                onChange={(e) => handleCheckbox(e)}
                key={i}
                type="checkbox"
                checked={el?.isChecked || false}
                id={el._id}
                className={`border-none bg-[#DEEBFF] rounded self-center`}
              />

              {el?.mail?.bookmarked ? (
                <TiStarFullOutline
                  className="self-center"
                  onClick={async () => {
                    await dispatch(removeBookmarkedMail(el?.mail?._id));
                    await dispatch(getMail(queries));
                  }}
                />
              ) : (
                <TiStarOutline
                  className="self-center"
                  onClick={async () => {
                    await dispatch(bookmarkMail(el?.mail?._id));
                    await dispatch(getMail(queries));
                  }}
                />
              )}

              <div className="w-5 h-5 rounded-full bg-blued self-center inline-flex justify-center items-center">
                <img
                  src={el?.mail?.from?.avatar?.url}
                  alt=""
                  width="10px"
                  height="10px"
                />
              </div>
              <p
                className={`text-sm font-medium cursor-pointer self-center ${
                  el.seen ? " text-gray-400 " : ""
                }`}
                // onClick={() => navigate("/collage/inbox/mail?type=view")}
                onClick={() => handleNav(i, el)}
              >
                {el.mail?.from?.FirstName}
              </p>
              <p
                className={`text-sm font-medium sm:max-w-[150px] line-clamp-1 max-h-6 self-center cursor-pointer ${
                  el.seen ? " text-gray-400 " : ""
                }`}
                onClick={() => handleNav(i, el)}
              >
                {el.mail?.subject}
              </p>
              <p
                className="text-sm text-gray-400 line-clamp-1  cursor-pointer max-w-[40vw] self-center"
                dangerouslySetInnerHTML={{ __html: el.mail?.message }}
                // onClick={() => handleNav(i)}
              />
            </div>

            <div className="flex gap-4 pr-4">
              {el?.mail?.attachments?.length > 0 && (
                <TfiClip
                  className="rotate-180 text-2xl text-gray-400 cursor-pointer"
                  // onClick={() => handleNav(i)}
                />
              )}

              <p className="text-sm font-medium text-gray-400">
                {el?.mail?.Date && convertDate(el?.mail?.Date)}
              </p>
            </div>
          </div>
        );
      })}
      {/* iterable */}
    </div>
  );
};

export default List;
