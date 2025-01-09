import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTest, getAllTests } from "../redux/college/test/thunks/test";
import { isUni } from "../util/isCompany";

export const useAssessmentActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const entity = isUni() ? "university/pr" : "college";

  const handleDelete = async (id) => {
    const result = await dispatch(deleteTest(id));
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(getAllTests());
    }
  };

  const handleEdit = (assessment) => {
    localStorage.setItem("assessment", JSON.stringify(assessment));
    navigate(`/${entity}/test/assessment`);
  };

  const handleInvite = (assessmentId, assessmentName) => {
    localStorage.setItem("testId", assessmentId);
    localStorage.setItem("testName", assessmentName);
    navigate(`/${entity}/test/invite?testId=${assessmentId}`);
  };

  return { handleDelete, handleEdit, handleInvite, entity };
};
