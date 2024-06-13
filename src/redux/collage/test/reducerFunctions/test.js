export const getAllTestFulfilled = (state, action) => {
  let assessments = action.payload.assessments;
  console.log("assessments from : ", assessments);
  state.assessments = {
    beginner: [],
    advanced: [],
    intermediate: [],
    adaptive: [],
  };
  assessments.forEach((assessment) => {
    if (assessment.level === "beginner") {
      const isObjectPresent = state.assessments.beginner.some(
        (obj) => obj._id === assessment._id
      );
      !isObjectPresent && state.assessments.beginner.push(assessment);
    } else if (assessment.level === "intermediate") {
      const isObjectPresent = state.assessments.intermediate.some(
        (obj) => obj._id === assessment._id
      );
      !isObjectPresent && state.assessments.intermediate.push(assessment);
    } else if (assessment.level === "advanced") {
      const isObjectPresent = state.assessments.advanced.some(
        (obj) => obj._id === assessment._id
      );
      !isObjectPresent && state.assessments.advanced.push(assessment);
    } else {
      console.log(assessment.level, "assessment.level");
      const isObjectPresent = state.assessments?.adaptive?.some(
        (obj) => obj._id === assessment._id
      );
      !isObjectPresent && state.assessments.adaptive.push(assessment);
    }
  });
};
