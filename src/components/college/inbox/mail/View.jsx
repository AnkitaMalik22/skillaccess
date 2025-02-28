import { Disclosure } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaSortDown, FaX } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { GrExpand } from "react-icons/gr";
import { TfiClip } from "react-icons/tfi";
import { BsEmojiSmile } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getInbox,
  getMail,
  searchMail,
  sendReply,
  uploadAttachment,
} from "../../../../redux/college/auth/authSlice";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import socketIOClient from "socket.io-client";
import CircularLoader from "../../../CircularLoader";

const View = ({ index, filter, inboxType }) => {
  const [socket, setSocket] = useState(null);
  const ENDPOINT = process.env.REACT_APP_API_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const show = searchParams.get("show");
  const dispatch = useDispatch();
  const upload = useRef();
  const [loader, setLoader] = useState(false);
  const { mail } = useSelector((state) => state.collegeAuth);
  // const Email = mail.emailsReceived[index];
  const user = useSelector(getInbox);
  const [loading, setLoading] = useState(false);
  const [Email, setEMail] = useState(
    inboxType === "Received"
      ? mail.emailsReceived[index]
      : mail.emailsSent[index]
  );

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    setSocket(socket);

    socket.on("message", (data) => {
      // Handle email sent event
      // //console.log("ems");
      dispatch(getMail({ limit: 50, skip: 0 }));
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    // //console.log(show);
    if (show === "all") {
      dispatch(getMail({ limit: 50, skip: 0 })).then(() => {
        if (inboxType === "Received") {
          setEMail(mail?.emailsReceived[index]);
        } else {
          setEMail(mail?.emailsSent[index]);
        }
      });
      setEmail(
        mail[inboxType === "Received" ? "emailsReceived" : "emailsSent"][index]
      );
    } else {
      dispatch(searchMail(filter));
    }
  }, ["", inboxType, index, dispatch]);

  useEffect(() => {
    setEMail(
      mail[inboxType === "Received" ? "emailsReceived" : "emailsSent"][index]
    );
  }, [user, mail]);

  const [email, setEmail] = useState({ Message: "" });
  const handleChange = (e) => {
    // //console.log(e.target);
    setEmail((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="w-full h-full p-5 font-dmSans">
      <h1 className="mt-4 mb-6 text-xl font-bold break-words">
        {Email?.mail?.subject}
      </h1>
      <p
        className="break-words  text-sm h-[30vh] max-w-[60vw]"
        dangerouslySetInnerHTML={{ __html: Email?.mail?.message }}
      />

      <div className="flex gap-4">
        <div className="flex gap-4">
          {Email?.mail?.attachments?.map((item, i) => {
            return (
              <div className="bg-accent p-2 rounded-md bg-opacity-10 sm:w-60 flex justify-between">
                <div className="flex gap-2">
                  {item.format !== "image" && (
                    <img src="/images/icons/fileBlue.png" alt="" />
                  )}
                  {item.format === "image/png" && (
                    <img src="/images/icons/image.png" alt="" />
                  )}
                  <div className="self-center">
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-sm font-medium">{item.size / 1e6} MB</p>
                  </div>
                </div>
                <div className="self-center">
                  <Link to={item.url}>
                    {" "}
                    <FiDownload className="text-lg text-gray-400" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {Email?.mail.replies?.map((reply) => {
        return (
          <>
            {" "}
            <hr className="w-full" />
            <p className="break-words  text-sm h-[30vh] max-w-[60vw] mt-6">
              {reply.message}
            </p>
            <div className="flex gap-4">
              <div className="flex gap-4">
                {reply?.attachments?.map((item, i) => {
                  return (
                    <div className="bg-accent p-2 rounded-md bg-opacity-10 sm:w-60 flex justify-between">
                      <div className="flex gap-2">
                        {item.format !== "image" && (
                          <img src="/images/icons/fileBlue.png" alt="" />
                        )}
                        {item.format === "image/png" && (
                          <img src="/images/icons/image.png" alt="" />
                        )}
                        <div className="self-center">
                          <p className="text-sm font-bold">{item.name}</p>
                          <p className="text-sm font-medium">
                            {item.size / 1e6} MB
                          </p>
                        </div>
                      </div>
                      <div className="self-center">
                        <Link to={item.url}>
                          {" "}
                          <FiDownload className="text-lg text-gray-400" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
      })}

      <div className="w-full bg-[#8F92A1] bg-opacity-5 p-4 mt-4 rounded-md">
        {/* Reply to */}
        <div className=" bg-lGray bg-opacity-5 rounded-md p-3 flex   justify-between">
          <div className="flex gap-2">
            {/* photo */}
            <div className="h-10 w-10 rounded-md ">
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

            <div className="flex gap-1 self-center">
              <p className="text-sm font-bold self-center">Reply</p>
              <p className="text-sm font-bold self-center text-gray-400">to:</p>
            </div>
            <div className="w-full sm:w-96 relative self-center">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full sm:w-96 justify-between rounded-md bg-[#8F92A1] bg-opacity-20 px-4 py-2 text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                      <span className="text-sm font-bold text-[#8F92A1]">
                        {inboxType === "Sent"
                          ? Email?.mail?.to?.Email
                          : Email?.mail?.from?.Email}
                      </span>
                      {/* <FaX className={`w-4 h-4 text-gray-400`} /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 absolute"></Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>

          <div className="self-center">
            <GrExpand className="text-lg text-gray-400" />
          </div>
        </div>

        <div className="w-full">
          <textarea
            type="text"
            name="Message"
            value={email?.Message}
            onChange={handleChange}
            placeholder="message"
            id=""
            className="w-full bg-[#8F92A1] mt-2 bg-opacity-10 rounded-xl foucs:ring-0 border-none"
          />
        </div>

        {/* <div className="flex justify-between w-full">
          <div className="flex gap-2 self-center">
            {" "}
            <BsEmojiSmile className="text-gray-400 text-xl self-center" />
            <TfiClip className="rotate-180 text-2xl text-gray-400 self-center" />
          </div>
          <button className="text-white text-sm font-bold px-3 bg-accent rounded-xl py-2 self-center">
            Send
          </button>
        </div> */}

        <div className="flex justify-between">
          <div>
            {" "}
            <input
              multiple
              accept=".jpg, .jpeg, .png , .pdf"
              type="file"
              className="hidden"
              ref={upload}
              onChange={async (e) => {
                setLoading(true);
                await dispatch(uploadAttachment(Object.values(e.target.files)));
                setLoading(false);
              }}
            />
            <TfiClip
              className="rotate-180 text-2xl text-gray-400 self-center"
              onClick={() => upload.current.click()}
            />
          </div>

          <div>
            <button
              className={`${
                loading ? "disabled !bg-gray-700 " : "bg-accent "
              } btn  bg-accent text-sm font-bold text-white rounded-xl px-4 py-2`}
              onClick={() => {
                if (!loading) {
                  setLoader(true);
                  dispatch(
                    sendReply({
                      ...email,
                      attachments: mail.attachments ? mail.attachments : [],
                      id: Email.mail._id,
                    })
                  )
                    .then(() => {
                      dispatch(getMail({ limit: 50, skip: 0 }));
                      socket.emit("joinRoom", Email?.mail?.from?.Email);
                      socket.emit("message", email.Email, "new Mail");
                      setLoader(false);
                    })
                    .catch(() => {
                      setLoader(false);
                    });
                  setEmail({ Message: "" });
                } else {
                  toast.error("please wait! uploading files...");
                }
              }}
            >
              Send {loader && <CircularLoader />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
