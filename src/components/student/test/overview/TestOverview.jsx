import React from "react";
import Header from "./Header";
import About from "./About";
import Info from "./Info";
import Description from "./Description";
import Toggle from "./Toggle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllTests, getStudentResponse, getTest, getTestResultPage } from "../../../../redux/collage/test/testSlice";
import { getCollege } from "../../../../redux/collage/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const TestsOverview = () => {
    const navigate = useNavigate();

  const { user } = useSelector((state) => state.collageAuth);
  // const assessment = useSelector((state) => state.test.test);
  // // const {studentResponses} = useSelector((state) => state.test);
  // const searchParams = new URLSearchParams(window.location.search);
  // const assessmentId = searchParams.get("assessment");

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllTests());
  // }, []);

  // useEffect(() => {
  //   dispatch(getTest(assessmentId));
  //   dispatch(getTestResultPage(assessmentId));
   
  // }, [dispatch, assessmentId]);

  
  // useEffect(() => {
  //   dispatch(getStudentResponse(assessmentId));
  // }
  // , [assessmentId]);
// const responses = studentResponses.map((responseId) => {
//   dispatch(getStudentResponse(responseId))
//   return responseId;
// }
// );

const assessment={
  "testId" : "65f28adb4bb92a0df0d55646",
   "id" : "65f27cd14bb92a0df0d551fa",
   "CollegeId" :"65f13a95cb0931e03de200f2",
     "name": "TCS iON NQT",
       "description": "TCS iON National Qualifier Test (TCS iON NQT) helps you prove your skills to top corporates. You may choose to get tested on aptitude skills, domain specific skills or work values. The tests are scheduled every 2-4 weeks in our exam centres. Your TCS iON NQT Scorecard will showcase your performance in every section of the test. You can apply for jobs in various Corporates that accept TCS iON NQT Score from our website and respective Corporates' websites.",
       "totalTime": 23,
       "totalAttempts": 5,
       "totalQuestionsCount": 10,
       "attemptCount": 0,
       "totalSectionsCount": 0,
       "level": "beginner",
       "type": "mcq",
       "status": "active",
       "createdByCompany": false,
       "sections": [],
       "topics": [
           {
               "_id": "65f289a04bb92a0df0d555bb",
               "Time": null,
               "Heading": "Aptitude",
               "Description": "Aptitude questions are used to test a person's ability to solve problems and learn new skills. They are often used in job interviews and career assessments",
               "TotalQuestions": null,
               "Type": "mcq",
               "TotalStudentsAttempted": 0,
               "TotalStudentsCorrect": 0,
               "assessments": [],
               "questions": [
                   {
                       "_id": "65f289c54bb92a0df0d555c1",
                       "id": "65f289a04bb92a0df0d555bb1710393762510",
                       "Duration": "2",
                       "Title": "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?\n",
                       "Options": [
                           "120 metres ",
                           "180 metres ",
                           "324 metres ",
                           "150 metres"
                       ],
                       "Answer": "",
                       "AnswerIndex": 1,
                        "StudentAnswerIndex": 1,
                       "QuestionType": "",
                       "createdByCompany": false,
                       "McqAnswers": [],
                       "LengthyAnswers": [],
                       "__v": 0,
                       "section": "65f289a04bb92a0df0d555bb"
                   },
                   {
                       "_id": "65f289f14bb92a0df0d555ca",
                       "id": "65f289a04bb92a0df0d555bb1710393796291",
                       "Duration": "2",
                       "Title": "A train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. The speed of the train is:\n",
                       "Options": [
                           "45 km/hr ",
                           "54 km/hr ",
                           "55 km/hr",
                           "50 km/hr "
                       ],
                       "Answer": "",
                       "AnswerIndex": 0,
                        "StudentAnswerIndex": 1,
                       "QuestionType": "mcq",
                       "createdByCompany": false,
                       "McqAnswers": [],
                       "LengthyAnswers": [],
                       "__v": 0,
                       "section": "65f289a04bb92a0df0d555bb"
                   },
                   {
                       "_id": "65f28a0c4bb92a0df0d555d3",
                       "id": "65f289a04bb92a0df0d555bb1710393840941",
                       "Duration": "3",
                       "Title": "The length of the bridge, which a train 130 metres long and travelling at 45 km/hr can cross in 30 seconds, is:",
                       "Options": [
                           "200 m",
                           " 225 m",
                           " 245 m",
                           "250 m"
                       ],
                       "Answer": "",
                       "AnswerIndex": 3,
                        "StudentAnswerIndex": 1,
                       "QuestionType": "mcq",
                       "createdByCompany": false,
                       "McqAnswers": [],
                       "LengthyAnswers": [],
                       "__v": 0,
                       "section": "65f289a04bb92a0df0d555bb"
                   },
                   {
                       "_id": "65f28a254bb92a0df0d555de",
                       "id": "65f289a04bb92a0df0d555bb1710393867012",
                       "Duration": "1",
                       "Title": "\nTwo trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively and they cross each other in 23 seconds. The ratio of their speeds is:",
                       "Options": [
                           " 1 : 3",
                           " 3 : 2",
                           " 3 : 4",
                           "None of these"
                       ],
                       "Answer": "",
                       "AnswerIndex": 2,
                        "StudentAnswerIndex": 2,
                       "QuestionType": "mcq",
                       "createdByCompany": false,
                       "McqAnswers": [],
                       "LengthyAnswers": [],
                       "__v": 0,
                       "section": "65f289a04bb92a0df0d555bb"
                   },
                   {
                       "_id": "65f28a404bb92a0df0d555f1",
                       "id": "65f289a04bb92a0df0d555bb1710393892100",
                       "Duration": "4",
                       "Title": "\nA train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?\n\n\n\n",
                       "Options": [
                           "120 m",
                           "240 m",
                           "240 m",
                           "300 m"
                       ],
                       "Answer": "",
                       "AnswerIndex": 3,
                        "StudentAnswerIndex": 3,
                       "QuestionType": "mcq",
                       "createdByCompany": false,
                       "McqAnswers": [],
                       "LengthyAnswers": [],
                       "__v": 0,
                       "section": "65f289a04bb92a0df0d555bb"
                   },
                   {
                       "_id": "65f28a764bb92a0df0d555fa",
                       "id": "65f289a04bb92a0df0d555bb1710393919885",
                       "Duration": "2",
                       "Title": "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?\n",
                       "Options": [
                           "120",
                           "130",
                           "160",
                           "180"
                       ],
                       "Answer": "",
                       "AnswerIndex": 2, "StudentAnswerIndex": 1,
                       "QuestionType": "mcq",
                       "createdByCompany": false,
                       "McqAnswers": [],
                       "LengthyAnswers": [],
                       "__v": 0,
                       "section": "65f289a04bb92a0df0d555bb"
                   },
                   {
                       "_id": "65f28a864bb92a0df0d55603",
                       "id": "65f289a04bb92a0df0d555bb1710393973419",
                       "Duration": "4",
                       "Title": ".\nThe length of the bridge, which a train 130 metres long and travelling at 45 km/hr can cross in 30 seconds, is:",
                       "Options": [
                           "10",
                           "30",
                           "30",
                           "20"
                       ],
                       "Answer": "",
                       "AnswerIndex": 3, "StudentAnswerIndex": 1,
                       "QuestionType": "mcq",
                       "createdByCompany": false,
                       "McqAnswers": [],
                       "LengthyAnswers": [],
                       "__v": 0,
                       "section": "65f289a04bb92a0df0d555bb"
                   },
                   {
                       "_id": "65f28a9c4bb92a0df0d5560c",
                       "id": "65f289a04bb92a0df0d555bb1710393989155",
                       "Duration": "1",
                       "Title": "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?",
                       "Options": [
                           "444",
                           "555",
                           "567",
                           "789"
                       ],
                       "Answer": "",
                       "AnswerIndex": 3,
                        "StudentAnswerIndex": 1,
                       "QuestionType": "mcq",
                       "createdByCompany": false,
                       "McqAnswers": [],
                       "LengthyAnswers": [],
                       "__v": 0,
                       "section": "65f289a04bb92a0df0d555bb"
                   },
                   {
                       "_id": "65f28aaa4bb92a0df0d55618",
                       "id": "65f289a04bb92a0df0d555bb1710394011908",
                       "Duration": "2",
                       "Title": "\nA train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. The speed of the train is:",
                       "Options": [
                           "23",
                           "33",
                           "45",
                           "55"
                       ],
                       "Answer": "",
                       "AnswerIndex": 3,
                        "StudentAnswerIndex": 1,
                       "QuestionType": "mcq",
                       "createdByCompany": false,
                       "McqAnswers": [],
                       "LengthyAnswers": [],
                       "__v": 0,
                       "section": "65f289a04bb92a0df0d555bb"
                   },
                   {
                       "id": "65f289a04bb92a0df0d555bb1710394047474",
                       "section": "65f289a04bb92a0df0d555bb",
                       "Duration": "2",
                       "Title": "\nA train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. The speed of the train is:",
                       "Options": [
                           "12",
                           "22",
                           "28",
                           "88"
                       ],
                       "QuestionType": "",
                       "AnswerIndex": "1",
                        "StudentAnswerIndex": 1,
                       "prev.Options": [
                           "12",
                           "22",
                           "28",
                           "88",
                           "88"
                       ]
                   }
               ],
               "findAnswers": [],
               "essay": [],
               "video": [],
               "compiler": [],
               "college": "65f13a95cb0931e03de200f2",
               "createdByCompany": false,
               "createdByCollege": true,
               "CreatedByAdmin": false,
               "Timeline": "2024-03-14T05:22:40.130Z",
               "Student": [],
               "__v": 9
           }
       ]
}




  return (
    <div className="w-[95%] mx-auto flex flex-col">
        <Header />
        <Info user={user} assessment={assessment} />

        <About Description={assessment.description} />

        <button className="bg-[#0052CC] text-white rounded-2xl h-10 font-dmSans px-16 self-end relative top-10 " style={{ marginTop: '-30px', marginRight: '1rem' }}
        onClick={()=>navigate('/student/test/1/start')}>
            Start the Assessment
        </button>
        <Description topics={assessment.topics} />


        {/* <Toggle assessment={assessment}  /> */}

    </div>
  );
};

export default TestsOverview;
