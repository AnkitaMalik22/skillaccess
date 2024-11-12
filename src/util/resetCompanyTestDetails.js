
import { setCurrentQuestionCountCompany, setTestBasicDetailsCompany, setTestSelectedTopicsCompany } from "../redux/company/test/testSlice";

 const resetCompanyTestDetails = (dispatch)=>{


    dispatch(
        setTestBasicDetailsCompany({
          name: "",
          description: "",
          totalAttempts: null,
          totalQuestions: null,
        })
      );
      dispatch(setTestSelectedTopicsCompany([]));
      dispatch(setCurrentQuestionCountCompany(0));
}

export default resetCompanyTestDetails;