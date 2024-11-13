import React,{useState} from "react";
import JobCard from "../../../company/JobCard";
const Jobs = () => {
 
  return(
  
    
     <div className="flex flex-wrap mx-1 w-fit justify-center gap-4 ">
     <JobCard/>
      <JobCard/>
      </div>
     

  )

};

export default Jobs;
