import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/";

const testState = {

    testName : "",
    testType : "",
    // testStatus : "",
  sections : [{
        name : "section 1",
        desription : "this is section 1"
      },
      {
        name : "section 2",
        desription : "this is section 2"
      },
      {
        name : "section 3",
        desription : "this is section 3"
      },
      {
        name : "section 4",
        desription : "this is section 4"
      },
      {
        name : "section 5",
        desription : "this is section 5"
      }],

      selectedSections : [],

    questions : [{
        question : "question 1",
        options : ["option 1","option 2","option 3","option 4"],
    },
    {
        question : "question 2",
        options : ["option 1","option 2","option 3","option 4"],
    }
],
    test : {
        testName : "",
        testType : "",
        // testStatus : "",
        sections : [],
        questions : [],
    },
    };

export const getTest = createAsyncThunk(
    "test/getTest",
    async (id, { rejectWithValue }) => {
        try {
            const req = await axios.get(
                `${process.env.REACT_APP_API_URL}api/assessments/${id}`,
                { withCredentials: true }
            );
            const res = req.data;
            return res.data;

        } catch (error) {
            console.log("catch");
            return rejectWithValue(error.response.data);
        }
    }
);



export const getAllTests = createAsyncThunk(
  'test/getAllTests',
  async (_, { rejectWithValue, getState }) => {
    try {
    
      const authToken = localStorage.getItem('auth-token');
      console.log(`${REACT_APP_API_URL}api/assessments`);
      const req = await axios.get(`${REACT_APP_API_URL}/api/assessments`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });

    
      const res = req.data;

      return res.data;
    } catch (error) {
      console.log('catch', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);


export const createTest = createAsyncThunk(
    "test/createTest",
    async (data, { rejectWithValue }) => {
        try {
            const req = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/assessments/create`,
                data,
                { withCredentials: true }
            );
            const res = req.data;
            return res.data;
        } catch (error) {
            console.log("catch");
            return rejectWithValue(error.response.data.message);
        }
    }
);


const testSlice = createSlice({
    initialState: testState,
    name: "test",

    reducers: {
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
        setSections: (state, action) => {
            if (state.test.selectedSections) {
                if (state.test.selectedSections.includes(action.payload) || state.test.sections.includes(action.payload)) {
                    return;
                }
                state.test.selectedSections.push(action.payload);
                state.test.sections.push(action.payload);
            } else {
                state.test.selectedSections = [action.payload];
            }
            // console.log(state.test.selectedSections, "sections");
        },
          removeSections: (state, action) => {
            state.test.selectedSections = state.test.selectedSections.filter((section) => section !== action.payload);
          },
        setQuestions: (state, action) => {
            state.test.questions = action.payload;
        }
     
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTest.pending, (state, action) => {
                state.status = "loading";
                console.log("pending");
            })
            .addCase(getTest.fulfilled, (state, action) => {
              
               state.test = action.payload;
                
                console.log("fullfilled");
            })
            .addCase(getTest.rejected, (state, action) => {
                console.log(action.payload);

                // window.alert(action.payload);
            })
            .addCase(getAllTests.pending, (state, action) => {
                state.status = "loading";
                console.log("pending");
            }
            )
            .addCase(getAllTests.fulfilled, (state, action) => {
                 state.tests = action.payload;
                console.log("fullfilled");
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
               
                state.testName = action.payload.testName;
               
                state.testType = action.payload.testType;
                
                console.log("fullfilled");
            })
            .addCase(createTest.rejected, (state, action) => {
                // console.log(action.payload);
                console.log(action.payload);

                window.alert(action.payload);
            });
    },
});

export const { setTestName ,setTest,setSections,removeSections,setQuestions} = testSlice.actions;

export default testSlice.reducer;
