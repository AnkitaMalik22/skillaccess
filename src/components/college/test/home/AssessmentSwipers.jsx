import React from "react";
import { useSelector } from "react-redux";
import AssessmentSwiper from "./AssessmentSwiper";

export const AdaptiveSwiper = () => {
  const adaptive = useSelector((state) => state.test.assessments.adaptive);
  return (
    <AssessmentSwiper
      assessments={adaptive}
      level="adaptive"
      title="Adaptive"
    />
  );
};

export const BeginnerSwiper = () => {
  const beginner = useSelector((state) => state.test.assessments.beginner);
  return (
    <AssessmentSwiper
      assessments={beginner}
      level="beginner"
      title="Beginner"
    />
  );
};

export const IntermediateSwiper = () => {
  const intermediate = useSelector(
    (state) => state.test.assessments.intermediate
  );
  return (
    <AssessmentSwiper
      assessments={intermediate}
      level="intermediate"
      title="Intermediate"
    />
  );
};

export const AdvancedSwiper = () => {
  const advanced = useSelector((state) => state.test.assessments.advanced);
  return (
    <AssessmentSwiper
      assessments={advanced}
      level="advanced"
      title="Advanced"
    />
  );
};
