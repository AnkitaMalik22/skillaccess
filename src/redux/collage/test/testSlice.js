import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addQuesFunc,
  editQuestionFun,
  removeQById,
  removeQfunc,
} from "./reducerFunctions/question";
import { getAllTestFulfilled } from "./reducerFunctions/test";
import toast from "react-hot-toast";
import {
  getResponseByTestandStudent,
  getStudentResponse,
  inviteToTest,
} from "./thunks/student";

import {
  createTest,
  deleteTest,
  getAllTests,
  getTest,
  getTestResultPage,
  selectStudentTest,
  getselectedStudents,
  getStudentsForTest,
  getRecentTests,
  removeFromRecent,
} from "./thunks/test";

import {
  addQuestionToTopic,
  createTopic,
  getAllTopics,
  getTopicById,
  getAllTopicsQB,
  deleteTopics,
} from "./thunks/topic";

import {
  addBookmark,
  deleteRecentUsedQuestion,
  editQuestionById,
  editBankQuestionById,
  getAllBookmarks,
  getBookmarkById,
  getRecentUsedQuestions,
  removeBookmark,
  getTopicByIdQB,
} from "./thunks/question";

const testState = {
  recentAssessments: [],
  inTest: false,
  testLoading: false,
  totalSelectedQuestions: 5,
  recentUsedQuestions: [],
  bookmarks: [],
  currentBookmark: {},
  localBookmarks: [],
  studentResponse: [],
  selectedStudents: [],
  response: [],
  testDataResponse: [],
  testName: "",
  testDescription: "",
  testAttempts: "",
  testId: "",
  // testStatus : "",
  assessments: {
    beginner: [],
    intermediate: [],
    advanced: [],
    adaptive: [],
  },
  //all topics
  sections: null,
  students: [],
  selectedSections: [],
  filteredSections: [],

  // test: {
  //   testName: "",
  //   questionType: "",
  //   // testStatus : "",
  //   sections: [],
  //   questions: [
  //     {
  //       Duration: 0,
  //       QuestionType: "mcq",
  //       Title: "",
  //       Options: [],
  //       AnswerIndex: 0,
  //     },
  //   ],
  // },
  level: localStorage.getItem("testDetails")
    ? JSON.parse(localStorage.getItem("testDetails")).level
    : "",
  name: localStorage.getItem("testDetails")
    ? JSON.parse(localStorage.getItem("testDetails")).name
    : "",
  description: localStorage.getItem("testDetails")
    ? JSON.parse(localStorage.getItem("testDetails")).description
    : "",
  // JSON.parse(localStorage.getItem("testDetails")).description || "",
  attempts: 0,
  totalAttempts: localStorage.getItem("testDetails")
    ? JSON.parse(localStorage.getItem("testDetails")).totalAttempts
    : "",
  totalDuration: localStorage.getItem("testDetails")
    ? JSON.parse(localStorage.getItem("testDetails")).totalDuration
    : "",
  // JSON.parse(localStorage.getItem("testDetails")).totalAttempts || 0,
  totalTime: 0,
  totalQuestions: localStorage.getItem("testDetails")
    ? JSON.parse(localStorage.getItem("testDetails")).totalQuestions
    : null,
  currentQuestionCount: localStorage.getItem("currentQuestionCount")
    ? JSON.parse(localStorage.getItem("currentQuestionCount"))
    : null,
  duration_from: localStorage.getItem("testDetails")
    ? JSON.parse(localStorage.getItem("testDetails")).duration_from
    : "",
  duration_to: localStorage.getItem("testDetails")
    ? JSON.parse(localStorage.getItem("testDetails")).duration_to
    : "",
  duration_to: localStorage.getItem("testDetails")
    ? JSON.parse(localStorage.getItem("testDetails")).isNegativeMarking
    : false,
  topics: localStorage.getItem("topics")
    ? JSON.parse(localStorage.getItem("topics"))
    : [], //selected topics
  status: "",
  currentTopic: localStorage.getItem("currentTopic")
    ? JSON.parse(localStorage.getItem("currentTopic"))
    : {
        _id: "",
        Time: 0,
        Heading: "",
        Description: "",
        duration_from: "",
        duration_to: "",
        CreatedByAdmin: false,
        Student: [],
        Timeline: "",
        TotalQuestions: 0,
        TotalStudentsAttempted: 0,
        TotalStudentsCorrect: 0,
        Type: "",
        assessments: [],
        college: "",
        compiler: [],
        createdByCollege: false,
        createdByCompany: false,
        essay: [],
        findAnswers: [],
        questions: [],
        video: [],
      }, //on edit
  TopicToBeAdded: localStorage.getItem("TopicToBeAdded")
    ? JSON.parse(localStorage.getItem("TopicToBeAdded"))
    : {
        id: "",

        questions: [],

        findAnswers: [],

        essay: [],

        video: {
          videoFile: "",

          questions: [],

          short: [],

          long: [],
        },

        compiler: [],
      },

  ADD_QUESTION_LOADING: false,
  GET_TOPICS_LOADING: false,
};

// export const getStudentResponse = createAsyncThunk("test/studentResponse",
// async (id, { rejectWithValue }) => {

//   try {
//     const req = await axios.get(
//       `${REACT_APP_API_URL}/api/studentDummy/response/${id}`,

//       {
//         headers: {
//           "Content-Type": "application/json",

//           "auth-token": localStorage.getItem("auth-token"),
//         },
//       }
//     );

//     const res = req.data;

//     console.log(res)

//     return res.studentResponses;

//   } catch (error) {
//     console.log("catch", error.response.data);

//     return rejectWithValue(error.response.data);
//   }
// }
// );

const testSlice = createSlice({
  initialState: testState,
  name: "test",
  reducers: {
    setInTest: (state, action) => {
      state.inTest = action.payload;
    },
    setTotalSelectedQuestions: (state, action) => {
      state.totalSelectedQuestions = parseInt(action.payload);
    },
    setCurrentQuestionCount: (state, action) => {
      console.log(action.payload, "pay");
      localStorage.setItem("currentQuestionCount", action.payload);
      state.currentQuestionCount = action.payload;
    },
    setCurrentTopic: (state, action) => {
      state.currentTopic = action.payload.topic;
      localStorage.setItem("currentTopic", JSON.stringify(state.currentTopic));
    },
    clearTopicToBeAdded: (state, action) => {
      state.TopicToBeAdded = {
        id: "",

        questions: [],

        findAnswers: [],

        essay: [],

        video: {
          videoFile: "",

          questions: [],

          short: [],

          long: [],
        },

        compiler: [],
      };

      localStorage.setItem(
        "TopicToBeAdded",
        JSON.stringify(state.TopicToBeAdded)
      );
    },
    setAssessments: (state, action) => {
      state.assessments = {
        beginner: [],
        intermediate: [],
        advanced: [],
        adaptive: [],
      };
    },
    addMcqToTopic: (state, action) => {
      state.TopicToBeAdded.questions = [
        ...state.TopicToBeAdded.questions,
        action.payload.question,
      ];
    },
    addFindAnsToTopic: (state, action) => {
      state.TopicToBeAdded.findAnswers = [
        ...state.TopicToBeAdded.findAnswers,
        action.payload.data,
      ];
    },
    addEssayToTopic: (state, action) => {
      state.TopicToBeAdded.essay = [
        ...state.TopicToBeAdded.essay,
        action.payload.data,
      ];
    },
    addVideoToSection: (state, action) => {
      state.topics[action.payload.index].video = [
        ...state.topics[action.payload.index].video,
        action.payload.data,
      ];
      localStorage.setItem("topics", JSON.stringify(state.topics));
    },
    addCompilerToTopic: (state, action) => {
      state.TopicToBeAdded.compiler = [
        ...state.TopicToBeAdded.compiler,
        action.payload.data,
      ];
    },
    addEssay: (state, action) => {
      if (action.payload.prev === false) {
        state.topics[action.payload.id].essay = [
          ...state.topics[action.payload.id].essay,
          action.payload.data,
        ];
      } else {
        console.log(action.payload.index);
        state.topics[action.payload.id].essay[action.payload.index] =
          action.payload.data;
      }
      localStorage.setItem("topics", JSON.stringify(state.topics));
      // localStorage.setItem("topics", state.topics);
    },
    addFindAns: (state, action) => {
      if (action.payload.prev === false) {
        state.topics[action.payload.id].findAnswers = [
          ...state.topics[action.payload.id].findAnswers,
          action.payload.data,
        ];
      } else {
        state.topics[action.payload.id].findAnswers[action.payload.index] =
          action.payload.data;
      }

      localStorage.setItem("topics", JSON.stringify(state.topics));
    },
    addMcq: (state, action) => {
      if (action.payload.prev === false) {
        state.topics[action.payload.id].questions = [
          ...state.topics[action.payload.id].questions,
          action.payload.question,
        ];
      } else {
        state.topics[action.payload.id].questions[action.payload.index] =
          action.payload.question;
      }

      localStorage.setItem("topics", JSON.stringify(state.topics));
    },
    addVideo: (state, action) => {
      // Assuming state.TopicToBeAdded.video is an object
      //this is addAddVideoToTopic
      const { data } = action.payload;

      if (data) {
        state.TopicToBeAdded.video.videoFile = data;
      }

      if (action.payload.short) {
        if (action.payload.prev === true) {
          state.TopicToBeAdded.video.short[action.payload.index] =
            action.payload.question;
        } else {
          state.TopicToBeAdded.video.short = [
            ...state.TopicToBeAdded.video.short,
            action.payload.short,
          ];
        }
      }

      if (action.payload.long) {
        if (action.payload.prev === true) {
          state.TopicToBeAdded.video.long[action.payload.index] =
            action.payload.question;
        } else {
          state.TopicToBeAdded.video.long = [
            ...state.TopicToBeAdded.video.long,
            action.payload.long,
          ];
        }
      }

      if (action.payload.question) {
        if (action.payload.prev === true) {
          state.TopicToBeAdded.video.questions[action.payload.index] =
            action.payload.question;
        } else {
          state.TopicToBeAdded.video.questions.push(action.payload.question);
        }
      }

      localStorage.setItem(
        "TopicToBeAdded",
        JSON.stringify(state.TopicToBeAdded)
      );
    },
    removeQuestion: (state, action) => {
      //questionType, topicIndex ,selfIndex
      removeQfunc(state, action);
    },

    removeQuestionById: (state, action) => {
      removeQById(state, action);
    },

    editQuestion: (state, action) => {
      editQuestionFun(state, action);
    },
    addCompiler: (state, action) => {
      console.log("compiler");
      if (action.payload.prev === false) {
        state.topics[action.payload.id].compiler = [
          ...state.topics[action.payload.id].compiler,
          action.payload.data,
        ];
      } else {
        state.topics[action.payload.id].compiler[action.payload.index] =
          action.payload.data;
      }

      localStorage.setItem("topics", JSON.stringify(state.topics));
      // localStorage.setItem("topics", state.topics);
    },

    // addVideo: (state, action) => {
    //   state.topics[action.payload.id].video = [
    //     ...state.topics[action.payload.id].video,
    //     action.payload.data,
    //   ];
    //   localStorage.setItem("topics", JSON.stringify(state.topics));
    //   // localStorage.setItem("topics", state.topics);
    // },
    setTestName: (state, action) => {
      state.test.testName = action.payload;
    },

    setTestType: (state, action) => {
      state.test.testType = action.payload;
    },
    setTest: (state, action) => {
      state.test = { ...state.test, ...action.payload };
      console.log(state.test, "test");
    },

    setMcq: (state, action) => {
      const { sectionId, questions } = action.payload;
      console.log(sectionId, "action.payload");
      const id = sectionId.toString(); // Convert to string to use it as object key

      // Check if the section already exists in state
      if (state.test.sections[id]) {
        // If the section already exists, update its questions array
        state.test.sections[id].questions = questions;
      } else {
        // If the section doesn't exist, create a new section object
        state.test.sections[id] = {
          type: "mcq",
          questions: questions,
        };
      }
    },

    setSections: (state, action) => {
      const payload = action.payload;
      const selectedSections = state.test.selectedSections || [];
      const sections = state.test.sections || [];
      // Check if the payload is already included in selectedSections or sections
      if (!selectedSections.includes(payload) && !sections.includes(payload)) {
        return {
          ...state,
          test: {
            ...state.test,
            selectedSections: [...selectedSections, payload],
            sections: [...sections, payload],
          },
        };
      }

      // If the payload is already included, return the current state without changes
      return state;
    },

    removeSections: (state, action) => {
      state.test.selectedSections = state.test.selectedSections.filter(
        (section) => section !== action.payload
      );
    },
    setQuestions: (state, action) => {
      state.test.questions = action.payload;
    },

    getSelectedSections: (state, action) => {
      return state.test.selectedSections;
    },

    setTestBasicDetails: (state, action) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.totalAttempts = action.payload.totalAttempts;
      state.totalQuestions = action.payload.totalQuestions;
      state.totalDuration = action.payload.totalDuration;
      state.level = action.payload.level;
      state.duration_from = action.payload.duration_from;
      state.duration_to = action.payload.duration_to;
      state.isNegativeMarking = action.payload.isNegativeMarking;
      state.status = "active";
      localStorage.setItem(
        "testDetails",
        JSON.stringify({
          level: state.level,
          name: state.name,
          description: state.description,
          totalAttempts: state.totalAttempts,
          totalQuestions: state.totalQuestions,
          totalDuration: state.totalDuration,
          duration_to: state.duration_to,
          duration_from: state.duration_from,
          isNegativeMarking: state.isNegativeMarking,
        })
      );
      console.log(action.payload, "action.payload");
      // console.log(current(state));
    },
    setTestSelectedTopics: (state, action) => {
      state.topics = action.payload;
      // localStorage.setItem(
      //   "test",
      //   JSON.stringify({
      //     name: action.payload.name,
      //     description: action.payload.description,
      //     totalAttempts: action.payload.totalAttempts,
      //     status: "active",
      //   })
      // );
      localStorage.setItem("topics", JSON.stringify(action.payload));
    },

    setFilteredSections: (state, action) => {
      state.filteredSections = action.payload;
    },

    // =============================== BOOKMARKS START ===============================

    // addBookmark: (state, action) => {
    //   // state.bookmarks = [...state.bookmarks, action.payload];
    //   state.bookmarks = action.payload;
    // },

    // removeBookmark: (state, action) => {
    //   state.bookmarks = state.bookmarks.filter(
    //     (bookmark) => bookmark.id !== action.payload
    //   );
    // },

    // addLocalBookmark: (state, action) => {
    //   state.localBookmarks = [...state.localBookmarks, action.payload];
    // },

    // removeLocalBookmark: (state, action) => {
    //   state.localBookmarks = state.localBookmarks.filter(
    //     (bookmark) => bookmark.id !== action.payload
    //   );
    // },

    // ===============================  BOOKMARKS END   ===============================
  },
  extraReducers: (builder) => {
    builder
      .addCase(editQuestionById.fulfilled, (state, action) => {
        console.log(action.payload);
        switch (action.payload.type) {
          case "essay":
            state.currentTopic.essay[action.payload.index] =
              action.payload.res.question;
            break;
          case "mcq":
            state.currentTopic.questions[action.payload.index] =
              action.payload.res.question;
            break;

          case "findAnswer":
            state.currentTopic.findAnswers[action.payload.index] =
              action.payload.res.question;
            break;
          case "code":
            state.currentTopic.compiler[action.payload.index] =
              action.payload.res.question;
            break;
          default:
            break;
        }
        localStorage.setItem(
          "currentTopic",
          JSON.stringify(state.currentTopic)
        );
      })
      .addCase(editBankQuestionById.fulfilled, (state, action) => {
        console.log(action.payload);
        switch (action.payload.type) {
          case "essay":
            state.currentTopic.essay[action.payload.index] =
              action.payload.res.question;
            break;
          case "mcq":
            state.currentTopic.questions[action.payload.index] =
              action.payload.res.question;
            break;

          case "findAnswer":
            state.currentTopic.findAnswers[action.payload.index] =
              action.payload.res.question;
            break;
          case "code":
            state.currentTopic.compiler[action.payload.index] =
              action.payload.res.question;
            break;
          default:
            break;
        }
        localStorage.setItem(
          "currentTopic",
          JSON.stringify(state.currentTopic)
        );
      })
      .addCase(addQuestionToTopic.pending, (state, action) => {
        state.ADD_QUESTION_LOADING = true;

        console.log("pending");
      })
      .addCase(addQuestionToTopic.fulfilled, (state, action) => {
        console.log("fulf");
        addQuesFunc(state, action);
        state.ADD_QUESTION_LOADING = false;
      })
      .addCase(addQuestionToTopic.rejected, (state, action) => {
        console.log("rejected");
        state.ADD_QUESTION_LOADING = false;
      })
      .addCase(getTest.pending, (state, action) => {
        state.status = "loading";

        console.log("pending");
      })
      .addCase(getTest.fulfilled, (state, action) => {
        state.test = action.payload;

        console.log("fullfilled", state.test);
      })
      .addCase(getTest.rejected, (state, action) => {
        console.log(action.payload);

        // window.alert(action.payload);
      })
      .addCase(getAllTests.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(getAllTests.fulfilled, (state, action) => {
        getAllTestFulfilled(state, action);
      })
      .addCase(getAllTests.rejected, (state, action) => {
        console.error("Error fetching tests:", action.payload);
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createTest.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(createTest.fulfilled, (state, action) => {
        console.log(action.payload);
        state.testId = action.payload._id;
        state.testName = action.payload.name;
        state.testDescription = action.payload.description;
        state.testAttempts = action.payload.totalAttempts;
        state.totalQuestions = action.payload.totalQuestions;
        state.name = "";
        state.totalAttempts = null;
        state.description = "";
        state.currentTopic = {};

        console.log("fullfilled");

        getAllTests();
      })
      .addCase(createTest.rejected, (state, action) => {
        // console.log(action.payload);
        toast.error(action.payload);
        console.log(action.payload);

        // window.alert(action.payload);
      })
      .addCase(getAllTopics.pending, (state, action) => {
        state.status = "loading";
        state.GET_TOPICS_LOADING = true;

        console.log("pending");
      })
      .addCase(getAllTopics.fulfilled, (state, action) => {
        state.sections = action.payload;
        state.GET_TOPICS_LOADING = false;

        console.log("fullfilled");
      })
      .addCase(getAllTopics.rejected, (state, action) => {
        console.error("Error fetching topics:", action.payload);
        state.GET_TOPICS_LOADING = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getTopicById.pending, (state, action) => {
        state.status = "loading";
        console.log("pending");
      })
      .addCase(getTopicById.fulfilled, (state, action) => {
        state.currentTopic = action.payload;
        // console.log(action.payload);
        console.log("fullfilled");
      })
      .addCase(getTopicById.rejected, (state, action) => {
        console.error("Error fetching topic:", action.payload);
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createTopic.pending, (state, action) => {
        // return action.payload;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.TopicToBeAdded.id = action.payload._id;
      })
      .addCase(createTopic.rejected, (state, action) => {
        // return action.payload;
      })

      .addCase(getStudentResponse.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getStudentResponse.fulfilled, (state, action) => {
        // state.studentResponse = action.payload;
        state.response = action.payload;
      })
      .addCase(getStudentResponse.rejected, (state, action) => {
        state.response = [];
        console.error("Error fetching student responses:", action.payload);
      })
      .addCase(getTestResultPage.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getTestResultPage.fulfilled, (state, action) => {
        state.testDataResponse = action.payload;
      })
      .addCase(getTestResultPage.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
        state.testDataResponse = [];
      })
      .addCase(getResponseByTestandStudent.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getResponseByTestandStudent.fulfilled, (state, action) => {
        state.response = action.payload;
        console.log(action.payload);
      })
      .addCase(getResponseByTestandStudent.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
        state.response = [];
      })
      .addCase(addBookmark.pending, (state, action) => {
        state.status = "pending";
      })

      .addCase(addBookmark.fulfilled, (state, action) => {
        state.bookmarks = action.payload;

        toast.success("Bookmark added successfully");
      })
      .addCase(addBookmark.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
        toast.error("Error adding bookmark");
        // state.bookmarks = [];
      })
      .addCase(removeBookmark.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        toast.success("Bookmark removed successfully");
        state.bookmarks = action.payload;
      })
      .addCase(removeBookmark.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
        // state.bookmarks = [];
      })
      .addCase(getBookmarkById.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getBookmarkById.fulfilled, (state, action) => {
        state.currentBookmark = action.payload;
      })
      .addCase(getBookmarkById.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
        state.currentBookmark = {};
      })
      .addCase(getAllBookmarks.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getAllBookmarks.fulfilled, (state, action) => {
        state.bookmarks = action.payload;
      })
      .addCase(getAllBookmarks.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
        state.bookmarks = [];
      })
      .addCase(getRecentUsedQuestions.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getRecentUsedQuestions.fulfilled, (state, action) => {
        console.log(action.payload);
        state.recentUsedQuestions = action.payload;
      })
      .addCase(getRecentUsedQuestions.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
        state.recentUsedQuestions = [];
      })
      .addCase(deleteRecentUsedQuestion.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteRecentUsedQuestion.fulfilled, (state, action) => {
        state.recentUsedQuestions = action.payload;
        toast.success("Question removed from recent used questions");
      })
      .addCase(deleteRecentUsedQuestion.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
        toast.error("Error removing question from recent used questions");
        // state.recentUsedQuestions = [];
      })
      .addCase(inviteToTest.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(inviteToTest.fulfilled, (state, action) => {
        state.status = "fulfilled";
        toast.success("Students Invited Successfully!");
        console.log(action.payload);
      })
      .addCase(inviteToTest.rejected, (state, action) => {
        state.status = "rejected";
        toast.error("Error Inviting Students!");
        console.log(action.payload);
      })
      .addCase(getTopicByIdQB.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getTopicByIdQB.fulfilled, (state, action) => {
        console.log(action.payload);
        state.currentTopic = action.payload;
        console.log(action.payload);
      })
      .addCase(getTopicByIdQB.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
        state.currentTopic = {};
      })
      .addCase(getAllTopicsQB.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getAllTopicsQB.fulfilled, (state, action) => {
        state.sections = action.payload;
        state.filteredSections = action.payload;
      })
      .addCase(getAllTopicsQB.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
        state.sections = [];
      })
      .addCase(deleteTopics.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteTopics.fulfilled, (state, action) => {
        console.log(action.payload);
        state.sections = action.payload;
        state.filteredSections = action.payload;
        toast.success("Topic Deleted Successfully!");
      })
      .addCase(getRecentTests.fulfilled, (state, action) => {
        state.recentAssessments = action.payload.assessment;
      })
      .addCase(removeFromRecent.fulfilled, (state, action) => {})
      .addCase(deleteTopics.rejected, (state, action) => {
        console.error("Error fetching test results:", action.payload);
        toast.error("Error Deleting Topic!");
      })
      .addCase(deleteTest.pending, (state, action) => {
        state.status = "pending";
        state.testLoading = true;
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        state.testLoading = false;
        console.log(action.payload);
        // getAllTestFulfilled(state, action);
        toast.success("Test Deleted Successfully!");
      })
      .addCase(deleteTest.rejected, (state, action) => {
        state.testLoading = false;
        console.error("Error fetching test results:", action.payload);
        toast.error("Error Deleting Test!");
      })

      .addCase(selectStudentTest.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
      })
      .addCase(getselectedStudents.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getselectedStudents.fulfilled, (state, action) => {
        state.selectedStudents = action.payload;
      })
      .addCase(getselectedStudents.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(getStudentsForTest.fulfilled, (state, action) => {
        state.students = action.payload.students;
      });
  },
});

export const {
  setInTest,
  setCurrentQuestionCount,
  setTotalSelectedQuestions,
  setCurrentTopic,
  clearTopicToBeAdded,
  editQuestion,
  removeQuestionById,
  removeQuestion,
  addMcq,
  addEssay,
  addFindAns,
  setTestName,
  setTest,
  setSections,
  removeSections,
  setQuestions,
  getSelectedSections,
  setMcq,
  addCompiler,
  addVideo,
  setTestBasicDetails,
  setTestSelectedTopics,
  addMcqToTopic,
  addFindAnsToTopic,
  addEssayToTopic,
  addVideoToSection,
  addCompilerToTopic,
  setAssessments,
  setFilteredSections,
} = testSlice.actions;

export default testSlice.reducer;
