import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addQuestionToTopic = createAsyncThunk(
  "test/addQuestionToTopic",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      let req;
      if (data.isMultiple === true) {
        req = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/college/add-questions/${data.id}/${data.type}`,
          { questions: data.data },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
      } else {
        req = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/college/add-questions/${data.id}/${data.type}`,
          { questions: [data.data] },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
      }

      const res = req.data;

      // if (data.index) return { question: res.questions[0] };
      return {
        questions: res.questions,
        type: data.type,
        isMultiple: data.isMultiple,
      };
    } catch (error) {
      //console.log("catch");
      return rejectWithValue(error?.response?.data?.message || "");
    }
  }
);

export const getAllTopics = createAsyncThunk(
  "test/getAllTopics",
  async (data, { rejectWithValue, getState }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/college/topics/all?level=${data.level}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.topics;
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllTopicsQB = createAsyncThunk(
  "test/getAllTopicsQB",
  async (data, { rejectWithValue, getState }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/qb/topics/all`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      return res.topics;
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTopicById = createAsyncThunk(
  "test/getTopicById",
  async (id, { rejectWithValue }) => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/topic/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      // //console.log("res", res);
      return res.section;
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteTopics = createAsyncThunk(
  "test/deleteTopics",
  async (data, { rejectWithValue }) => {
    try {
      //console.log("data", data);
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/assessments/sections`,
        { data },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = req.data;
      // //console.log("res", res);
      return res.sections;
    } catch (error) {
      //console.log("catch", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTopic = createAsyncThunk(
  "test/createTopic",

  async (data, { rejectWithValue }) => {
    //   {

    //     "Heading": "DevOps 5",

    //     "Description": "The DevOps test assesses candidates' knowledge of DevOps concepts and practices and whether they can apply that knowledge to improve infrastructure, achieve faster time to market, and lower failure rates of new releases.",

    //     "Time": 10,

    //     "TotalQuestions": 10

    // }

    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/college/topics/create`,

        data,

        {
          headers: {
            "Content-Type": "application/json",

            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      const res = req.data;

      return res.section;
    } catch (error) {
      //console.log("catch", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);
export const setTotalTopicQuestions = createAsyncThunk(
  "topics/setTotalTopicQuestions",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      // Dispatch the getTopicById thunk and wait for the result
      const topic = await dispatch(getTopicById(arg.id)).unwrap();

      // //console.log(topic, "topic");

      if (!topic) {
        console.error(`Topic with id ${arg.id} not found`);
        return rejectWithValue("Topic not found");
      }

      const getArrayLength = (arr) => (Array.isArray(arr) ? arr.length : 0);

      let totalTopicQuestions = 0;
      switch (arg.type) {
        case "mcq":
          //console.log(arg.level, "arg.level");
          if (arg.level === "adaptive") {
            totalTopicQuestions = getArrayLength(topic.questions);
          } else if (arg.level === "beginner") {
            totalTopicQuestions =
              topic.questions?.filter(
                (question) => question?.QuestionLevel === "beginner"
              )?.length || 0;
            //console.log(totalTopicQuestions, "totalTopicQuestions beginner");
          } else if (arg.level === "intermediate") {
            totalTopicQuestions =
              topic.questions?.filter(
                (question) => question?.QuestionLevel === "intermediate"
              )?.length || 0;
          } else if (arg.level === "advanced") {
            totalTopicQuestions =
              topic.questions?.filter(
                (question) => question?.QuestionLevel === "advanced"
              )?.length || 0;
          } else {
            totalTopicQuestions = topic.questions?.length;
          }
          break;
        case "findAnswer":
          if (arg.level === "beginner") {
            totalTopicQuestions = topic.findAnswers.filter(
              (question) => question?.QuestionLevel === "beginner"
            )?.length;
          } else if (arg.level === "intermediate") {
            totalTopicQuestions = topic.findAnswers.filter(
              (question) => question?.QuestionLevel === "intermediate"
            )?.length;
          } else if (arg.level === "advanced") {
            totalTopicQuestions = topic.findAnswers.filter(
              (question) => question?.QuestionLevel === "advanced"
            )?.length;
          } else {
            totalTopicQuestions = topic.findAnswers?.length;
          }
          break;
        case "essay":
          if (arg.level === "beginner") {
            totalTopicQuestions = topic.essay.filter(
              (question) => question?.QuestionLevel === "beginner"
            )?.length;
          } else if (arg.level === "intermediate") {
            totalTopicQuestions = topic.essay.filter(
              (question) => question?.QuestionLevel === "intermediate"
            )?.length;
          } else if (arg.level === "advanced") {
            totalTopicQuestions = topic.essay.filter(
              (question) => question?.QuestionLevel === "advanced"
            )?.length;
          } else {
            totalTopicQuestions = topic.essay?.length;
          }

          break;
        case "video":
          if (arg.level === "beginner") {
            totalTopicQuestions = topic.video.filter(
              (question) => question?.QuestionLevel === "beginner"
            )?.length;
          } else if (arg.level === "intermediate") {
            totalTopicQuestions = topic.video.filter(
              (question) => question?.QuestionLevel === "intermediate"
            )?.length;
          } else if (arg.level === "advanced") {
            totalTopicQuestions = topic.video.filter(
              (question) => question?.QuestionLevel === "advanced"
            )?.length;
          } else {
            totalTopicQuestions = topic.video?.length;
          }

          break;
        case "compiler":
          if (arg.level === "beginner") {
            totalTopicQuestions = topic.compiler.filter(
              (question) => question?.QuestionLevel === "beginner"
            )?.length;
          } else if (arg.level === "intermediate") {
            totalTopicQuestions = topic.compiler.filter(
              (question) => question?.QuestionLevel === "intermediate"
            )?.length;
          } else if (arg.level === "advanced") {
            totalTopicQuestions = topic.compiler.filter(
              (question) => question?.QuestionLevel === "advanced"
            )?.length;
          } else {
            totalTopicQuestions = topic.compiler?.length;
          }

          break;
        default:
          console.warn(`Unknown question type: ${arg.type}`);
          totalTopicQuestions = 0;
          break;
      }

      return { totalTopicQuestions };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
