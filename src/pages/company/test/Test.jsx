import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import resetCompanyTestDetails from "../../../util/resetCompanyTestDetails";

const Test = () => {
  const dispatch = useDispatch();
useEffect(()=>{
resetCompanyTestDetails(dispatch);
},[])
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          Create Assessments
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Section
            title="Beginner Assessment"
            description="Create beginner level assessments to get started."
            linkHref="/company/pr/test/name?level=beginner"
            linkText="Create Beginner Assessment"
          />
          <Section
            title="Intermediate Assessment"
            description="Organize and host intermediate level assessments for more experienced users."
            linkHref="/company/pr/test/name?level=intermediate"
            linkText="Create Intermediate Assessment"
          />
          <Section
            title="Advanced Assessment"
            description="Develop challenging assessments for advanced users to expand your offerings."
            linkHref="/company/pr/test/name?level=advanced"
            linkText="Create Advanced Assessment"
          />
          {/* <Section
            title="Expert Assessment"
            description="Design expert-level assessments to push your audience to new heights."
            linkHref="/company/pr/test/name?level=expert"
            linkText="Create Expert Assessment"
          /> */}
        </div>
      </main>
    </div>
  );
};

export default Test;

function Section({ title, description, linkHref, linkText }) {
  return (
    <section className="bg-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
      <h2 className="text-3xl font-semibold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-700 mb-6">{description}</p>
      <Link to={linkHref}>
        <span className="inline-block bg-accent hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-200">
          {linkText}
        </span>
      </Link>
    </section>
  );
}
