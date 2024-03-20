export const getAllTestFulfilled = (state, action) => {
  let assessments = action.payload.assessments;
  assessments.map((assessment) => {
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
    } else {
      const isObjectPresent = state.assessments.advanced.some(
        (obj) => obj._id === assessment._id
      );
      !isObjectPresent && state.assessments.advanced.push(assessment);
    }
  });
};
