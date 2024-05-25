import React, { useCallback, useRef, useState } from "react";

import { PiVideoCamera } from "react-icons/pi";

import { useDropzone } from "react-dropzone";

import { GrUploadOption } from "react-icons/gr";

import { GoDeviceCameraVideo } from "react-icons/go";

import axios from "axios";

import { FaPlus } from "react-icons/fa";

import Webcam from "react-webcam";

import Header from "./Header";

// import {

//   setTest,

//   setMcq,

//   addMcq,

// } from "../../../../../redux/collage/test/testSlice";

import { useDispatch } from "react-redux";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { addVideo } from "../../../../redux/collage/test/testSlice";
import Loader from "./Loader";
import toast from "react-hot-toast";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const AddVideo = () => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const { id } = useParams();
  const level = searchParam.get("level");
  const navigate = useNavigate();

  const [recording, setRecording] = useState(false);

  const [paused, setPaused] = useState(false);

  const webcamRef = useRef(null);

  const mediaRecorderRef = useRef(null);

  const [file, setFile] = useState(null);

  const [videoLink, setVideoLink] = useState("");

  const [loading, setLoading] = useState(false);

  const chunksRef = useRef([]);

  const [videoPreview, setVideoPreview] = useState("");

  const [timer, setTimer] = useState(0);

  const [timerInterval, setTimerInterval] = useState(null);

  const maxDurationInSeconds = 3 * 60;

  const warningTime = 10;

  const startTimer = () => {
    setTimerInterval(
      setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer + 1 >= maxDurationInSeconds) {
            handleStopRecording();
          }

          return prevTimer + 1;
        });
      }, 1000)
    );
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);

    setTimer(0);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const droppedFile = acceptedFiles[0];

    // Check if the dropped file has one of the supported formats

    const supportedFormats = [
      "video/mov",
      "video/mp4",
      "video/mpeg",
      "video/mkv",
      "video/webm",
      "image/gif",
    ];

    if (droppedFile && supportedFormats.includes(droppedFile.type)) {
      const video = document.createElement("video");

      video.src = URL.createObjectURL(droppedFile);

      video.onloadedmetadata = () => {
        const maxDurationInSeconds = 3 * 60;

        if (video.duration <= maxDurationInSeconds) {
          setVideoPreview(URL.createObjectURL(droppedFile));

          setFile(droppedFile);
        } else {
          toast.error("Video duration exceeds the allowed limit (3 minutes).");
        }
      };
    } else {
      toast.error(
        "Unsupported file format. Please upload a MOV, MP4, MPEG, MKV, WEBM, or GIF file."
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }

        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = handleDataAvailable;

        mediaRecorderRef.current.onstop = handleStop;

        setRecording(true);

        mediaRecorderRef.current.start();

        startTimer();
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();

      // Stop the tracks to release the camera

      const tracks = mediaRecorderRef.current.stream.getTracks();

      tracks.forEach((track) => track.stop());
    }

    setRecording(false);

    setPaused(false);

    resetTimer();
  };

  const handlePauseResumeRecording = () => {
    if (mediaRecorderRef.current && recording) {
      if (paused) {
        // Resume

        mediaRecorderRef.current.resume();

        startTimer();
      } else {
        // Pause

        mediaRecorderRef.current.pause();

        pauseTimer();
      }

      setPaused(!paused);
    }
  };

  const handleDataAvailable = (e) => {
    if (e.data.size > 0) {
      chunksRef.current.push(e.data);
    }
  };

  const handleStop = () => {
    mediaRecorderRef.current.stop();

    const blob = new Blob(chunksRef.current, { type: "video/webm" });

    chunksRef.current = [];

    setFile(blob);

    setVideoPreview(URL.createObjectURL(blob));

    resetTimer();
  };

  const authToken = localStorage.getItem("auth-token");

  const uploadVideo = async (videoFile) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("video", videoFile);

      const response = await axios.post(
        `${REACT_APP_API_URL}/api/college/upload/video`,

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",

            "auth-token": authToken,
          },
        }
      );

      const videoLinkFromServer = response.data.video;

      setVideoLink(videoLinkFromServer);

      dispatch(addVideo({ data: videoLinkFromServer }));

      // Navigate to the next step

      navigate(
        `/collage/test/video/${id}/selectType?section=${searchParam.get(
          "topicId"
        )}&level=${level}`
      );
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      uploadVideo(file);

      // console.log(videoLink);

      // dispatch(addVideo({ data: videoLink }));

      // navigate(`/collage/test/video/${id}/selectType`);
    } else {
      toast.error("No file available for upload.");
    }
  };

  return (
    <>
      {!videoPreview ? (
        <div className="pt-8 w-11/12 mx-auto font-dmSans">
          <Header />

          <div className="flex flex-col items-center justify-center h-full pt-16">
            {!recording && <p className="text-base font-bold">Upload video </p>}

            {!recording && (
              <div
                {...getRootProps()}
                className={`border rounded-lg border-dashed h-[238px] w-[685px] mt-8 flex flex-col items-center py-7 ${
                  isDragActive ? "bg-gray-100" : ""
                }`}
              >
                <input {...getInputProps()} />

                <img
                  src="../../../images/ant-design_cloud-upload-outlined.png"
                  alt="upload"
                  className="cursor-pointer"
                />

                <p className="text-base font-bold pt-4">
                  Drag & drop video files or{" "}
                  <a className="text-[#0052cc] border-b-2 border-[#0052cc]  cursor-pointer">
                    Browse
                  </a>
                </p>

                <p className="w-[440px] text-center pt-4">
                  Supported Formats: MOV, GIF, MP4, MPEG, MKV, or WEBM file
                  format Maximum file size: 1 GB
                </p>
              </div>
            )}

            <div className="flex gap-4 mt-10">
              {!recording && (
                <button
                  className="self-center justify-center flex items-center bg-[#0052CC] w-[196px] h-[56px] px-4 rounded-2xl text-xs gap-2 text-white"
                  {...getRootProps()}
                >
                  <GrUploadOption className=" w-[22px] h-[22px] text-white" />
                  Upload
                </button>
              )}
            </div>

            {!recording && (
              <div className="flex items-center gap-12  pt-6">
                <hr className="w-[400px] h-[2px]" />
                <p className="text-center  text-[#8f92a1] font-medium text-[20px]">
                  Or
                </p>
                <hr className="w-[400px] [2px]" />
              </div>
            )}

            <div className="flex mt-10">
              {!recording && (
                <button
                  className="self-center justify-center border-2 border-[#0052cc] font-medium flex items-center bg-blue-100 px-4 rounded-2xl text-[20px] gap-2 h-[60px] w-[685px] text-[#0052cc]"
                  onClick={handleStartRecording}
                >
                  <PiVideoCamera className="h-[40px] w-[40px]" /> Record a Video
                </button>
              )}
            </div>

            {recording && (
              <>
                <div className=" h-full w-full flex  justify-center items-center z-10">
                  <Webcam
                    className="w-[640px] h-[480px] bg-black"
                    mirrored={true}
                    audio={true}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                  />
                </div>

                <div className="  flex item-center mt-4">
                  <button
                    className={`self-center justify-center items-center flex ${
                      paused ? "bg-blue-500" : "bg-red-500"
                    } text-[#0052cc] py-3 px-4 rounded-2xl text-xs gap-2`}
                    onClick={handlePauseResumeRecording}
                  >
                    {paused ? "Resume" : "Pause"}
                  </button>

                  <button
                    className="self-center justify-center flex bg-[#0052CC] py-3 px-4 rounded-2xl text-xs gap-2 text-white ml-4"
                    onClick={handleStopRecording}
                  >
                    Finish Recording
                  </button>

                  <p
                    className={`text-center ml-4 rounded-2xl text-[#fff] py-3 px-4 font-bold pt-2 ${
                      timer >= maxDurationInSeconds - warningTime
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {formatTime(timer)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="pt-8 w-11/12 mx-auto font-dmSans">
          <Header />

          <video className="w-[500px] h-[300px] mt-10" controls>
            <source src={videoPreview} type={file && file.type} />
            Your browser does not support the video tag.
          </video>

          <div className="flex justify-between items-center mt-6">
            <button
              className="self-center  justify-center flex bg-black py-3 px-4 rounded-2xl text-xs gap-2 text-white"
              onClick={() => {
                setFile(null);

                setVideoPreview("");

                resetTimer();
              }}
            >
              Delete video
            </button>

            <button
              className="self-center justify-center flex bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-bold gap-2 "
              //  onClick={()=>{

              //   dispatch(addVideo({data:file}));

              //    navigate(`/collage/test/video/${id}/selectType`)

              //  }}

              onClick={handleFileUpload}
            >
              Add Questions{" "}
              {loading === false ? (
                <FaPlus className="self-center" />
              ) : (
                <Loader />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

export default AddVideo;
