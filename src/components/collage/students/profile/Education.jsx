import React from "react";
import { CgPinAlt } from "react-icons/cg";
import { LuClock3 } from "react-icons/lu";

const Education = ({Education}) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  return (
    
      <div className="">
       { Education?.map((education,index)=>{
       return(
<div className="font-dmSans mt-2">
     
     <section className="px-3 ">
       <div className="flex justify-between">
        
         <div className="flex gap-2 py-1 mt-2">
           <div className="min-w-[2.5rem] h-10 bg-amber-500 self-center rounded-lg"></div>
           <div className="ml-1 mt-1">
             <h2 className="  font-bold  py-1 ">{education.School}</h2>
             <h2 className="font-normal  text-sm pb-2">
               {education.Degree}
             </h2>
           </div>
         </div>

         
         <span className="flex gap-12">
          
           <div className="self-center text-gray-400 mr-2 font-medium">
             <span className="flex gap-1 ">
               {" "}
               <LuClock3 className="self-center " />{" "}
               <p className="self-center text-xs font-bold">
                 {formatDate(education.StartDate)} to {formatDate(education.EndDate)}
               </p>
             </span>
           </div>

           <div className="self-center text-gray-400 mr-2">
             <span className="flex gap-1">
               {" "}
               <CgPinAlt className="self-center text-lg font-bold" />{" "}
               <p className="self-center text-xs font-bold">Bhopal, India</p>
             </span>
           </div>
       
         </span>
         
       </div>
     
       <p className="text-sm font-dmSans">
         {education.Description}
       </p>
     </section>
    
     <section className="px-3 text-xs font-bold mt-5">
       <h2>Acheivements (1)</h2>
       <div className="flex flex-wrap mt-4 border-b-2 pb-5">
         <img
           src="../../images/cert.png"
           alt=""
           className="w-60 h-40 object-cover rounded-lg"
         />
       </div>
     </section>
     
   </div>
       )
       }
      )
       }
    </div>
  );
};

export default Education;
