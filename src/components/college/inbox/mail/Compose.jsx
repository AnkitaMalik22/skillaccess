import React, { useEffect, useRef, useState } from "react";
import { TfiClip } from "react-icons/tfi";
import EmojiPicker from "emoji-picker-react";

import {
  getMail,
  sendMail,
  uploadAttachment,
} from "../../../../redux/college/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import CircularLoader from "../../../CircularLoader";
const Compose = () => {
  const [socket, setSocket] = useState(null);
  const ENDPOINT = process.env.REACT_APP_API_URL;
  const attachments = useSelector(
    (state) => state.collegeAuth.mail.attachments
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const upload = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState({ Email: "", Message: "", Subject: "" });
  const [errors, setErrors] = useState({
    Email: '',
    Subject: '',
    Message: ''
  });

  const handleChange = (e) => {
    setEmail((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleEmojiClick = (event, emoji) => {
    setEmail((prev) => {
      return { ...prev, Message: `${prev.Message}  ${event.emoji}` };
    });
  };

  const validateEmail = () => {
    let isValid = true;
    const newErrors = {
      Email: '',
      Subject: '',
      Message: ''
    };

    // Email validation
    if (!email.Email.trim()) {
      newErrors.Email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.Email)) {
      newErrors.Email = 'Invalid email address';
      isValid = false;
    }

    // Subject validation
    if (!email.Subject.trim()) {
      newErrors.Subject = 'Subject is required';
      isValid = false;
    }

    // Message validation
    if (!email.Message.trim()) {
      newErrors.Message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    setSocket(socket);

    socket.on("message", (data) => {
      // Handle email sent event
      // //console.log("ems");
      dispatch(getMail({ limit: 50, skip: 0 }));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading || loader) {
      return;
    }
  
    if (!validateEmail()) {
      toast.error('Please fix the validation errors');
      return;
    }
  
    try {
      setLoader(true);
      await dispatch(sendMail({
        ...email,
        attachments: files
      })).unwrap();
  
      toast.success('Email sent successfully');
      setEmail({ Email: '', Message: '', Subject: '' });
      setFiles([]);
      
    } catch (error) {
      console.log(error);
      // toast.error(error.message || 'Failed to send email');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      <input
        onChange={handleChange}
        value={email.Email}
        name="Email"
        type="text"
        placeholder="example@mail.com"
        className={`w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-md ${errors.Email ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email}</p>}
      <input
        onChange={handleChange}
        value={email.Subject}
        name="Subject"
        type="text"
        placeholder="Subject"
        className={`w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-md ${errors.Subject ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.Subject && <p className="text-red-500 text-sm mt-1">{errors.Subject}</p>}
      <ReactQuill
        name="Message"
        onChange={(value) =>
          setEmail((prev) => {
            return { ...prev, Message: value };
          })
        }
        value={email.Message}
        className={`w-full flex border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-md min-h-[30vh] placeholder-gray-400 ${errors.Message ? 'border-red-500' : ''}`}
        placeholder="Type Something ..."
        style={{ display: "inline-block" }}
      />
      {errors.Message && <p className="text-red-500 text-sm mt-1">{errors.Message}</p>}

      <div className="flex gap-4">
        {attachments?.map((item, i) => {
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
                <Link to={item.url} target="_blank">
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
          <div className="flex gap-2 mt-4 ml-2">
            {showEmojiPicker && (
              <EmojiPicker onEmojiClick={handleEmojiClick} disableSearchBar />
            )}
            <button
              className=""
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😊
            </button>
            <TfiClip
              className="rotate-180 text-2xl text-gray-400 self-center "
              onClick={() => upload.current.click()}
            />
          </div>
        </div>

        <div>
          <button
            className={`${
              loading ? "disabled !bg-gray-700 " : "bg-accent "
            } btn text-sm font-bold text-white rounded-xl px-4 py-2 mt-4`}
            onClick={handleSubmit}
          >
            Send {loader && <CircularLoader />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Compose;
