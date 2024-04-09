import React, { useEffect, useRef, useState } from "react";
import { TfiClip } from "react-icons/tfi";
import {
  getMail,
  sendMail,
  uploadAttachment,
} from "../../../../redux/collage/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";

const Compose = () => {
  const [socket, setSocket] = useState(null);
  const ENDPOINT = process.env.REACT_APP_API_URL;
  const attachments = useSelector(
    (state) => state.collageAuth.mail.attachments
  );

  const upload = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState({ Email: "", Message: "", Subject: "" });
  const handleChange = (e) => {
    setEmail((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(email);
  };


  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    setSocket(socket);

    socket.on("emailSent", (data) => {
      // Handle email sent event
      console.log("ems");
      dispatch(getMail({ limit: 50, skip: 0 }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);


// <<<<<<< bug-fix-test

  const handleSubmit = () => {
    dispatch(sendMail(email));
    setEmail({ Email: "", Message: "", Subject: "" });
  }
// =======
// >>>>>>> saveMain

  return (
    <div className="p-4 flex flex-col gap-3">
      <input
        onChange={handleChange}
        value={email.Email}
        name="Email"
        type="text"
        placeholder="example@mail.com"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg"
      />
      <input
        onChange={handleChange}
        value={email.Subject}
        name="Subject"
        type="text"
        placeholder="Subject"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg"
      />
      {/* <input
      placeholder="Subject"
        type="text"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg"
      />
      <input
        type="text"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg"
      /> */}
      <textarea
        onChange={handleChange}
        value={email.Message}
        name="Message"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg h-[30vh] placeholder-gray-400"
        placeholder="Type Something ..."
      />

      <div className="flex gap-4">
        {attachments?.map((item, i) => {
          return (
            <div className="bg-[#0052CC] p-2 rounded-lg bg-opacity-10 sm:w-60 flex justify-between">
              <div className="flex gap-2">
                {item.format !== "image" && (
                  <img src="../../images/icons/fileBlue.png" alt="" />
                )}
                {item.format === "image/png" && (
                  <img src="../../images/icons/image.png" alt="" />
                )}
                <div className="self-center">
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-xs font-medium">{item.size / 1e6} MB</p>
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
              setFiles(Object.values(e.target.files));
              await dispatch(uploadAttachment(Object.values(e.target.files)));
              setLoading(false);
            }}
          ></input>
          <TfiClip
            className="rotate-180 text-2xl text-gray-400 self-center"
            onClick={() => upload.current.click()}
          />
        </div>

        <div>
          <button

            className={`${
              loading ? "disabled !bg-gray-700 " : "bg-blue-700 "
            } text-sm font-bold text-white rounded-xl px-4 py-2`}
            onClick={() => {
              if (!loading) {
                dispatch(sendMail({ ...email, attachments })).then(() => {
                  socket.emit("joinRoom", email.Email);
                  socket.emit("message", email.Email, "new Mail");
                });
              } else {
                toast.error("please wait! uploading files...");
              }
            }}

          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Compose;
