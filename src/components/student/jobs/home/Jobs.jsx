import React,{useState} from "react";
import ActiveTests from "./ActiveTests";
const Jobs = () => {
  const [employmentType, setEmploymentType] = useState({
    permanentFullTime: true,
    partTime: false,
    casualVacation: false,
    contact: false,
    internshipTrainee: false,
  });

  const [salaryRange, setSalaryRange] = useState([100000, 200000]);
  const [isEmploymentTypeExpanded, setIsEmploymentTypeExpanded] = useState(true);
  const [isSalaryRangeExpanded, setIsSalaryRangeExpanded] = useState(true);
  const [isLocationExpanded, setIsLocationExpanded] = useState(true);
  const [isSeniorityLevelExpanded, setIsSeniorityLevelExpanded] = useState(true);
  const [seniorityLevels, setSeniorityLevels] = useState({
    entryLevel: false,
    midLevel: false,
    seniorLevel: false,
  });
  const handleToggleEmploymentType = (type) => {
    setEmploymentType((prevEmploymentType) => ({
      ...prevEmploymentType,
      [type]: !prevEmploymentType[type],
    }));
  };

  const handleSalaryRangeChange = (event) => {
    setSalaryRange(event.target.value);
  };
  const handleToggleSeniorityLevel = (level) => {
    setSeniorityLevels((prevSeniorityLevels) => ({
      ...prevSeniorityLevels,
      [level]: !prevSeniorityLevels[level],
    }));
  };
  return(
    <div className="flex gap-5 px-10">
    <div className="w-1/4">
        <div className="mb-4 ">
          <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => setIsEmploymentTypeExpanded(!isEmploymentTypeExpanded)}>
            <h2 className="text-base font-bold">Type of employment</h2>
            <button>{isEmploymentTypeExpanded ?<img src="../../images/icons/down.png"></img>:<img src="../../images/icons/UPP.png"></img>}</button>
          </div>
          {isEmploymentTypeExpanded && (
            <div>
              <div className="w-full flex justify-between pt-5">
              <label className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={employmentType.permanentFullTime}
                  onChange={() => handleToggleEmploymentType("permanentFullTime")}
                />
                <span className="ml-2">Permanent full-Time</span>
                
              </label>
              <p className={employmentType.permanentFullTime ? 'bg-gray-200 p-2 text-blue-700 text-[12px] rounded' : 'text-[12px] bg-gray-200 rounded p-2 text-gray-400'}>344</p>
              </div>
              <div className="w-full flex justify-between pt-5">
              <label className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={employmentType.partTime}
                  onChange={() => handleToggleEmploymentType("partTime")}
                />
                <span className="ml-2">Part-Time</span>
              </label>
              <p className={employmentType.partTime ? 'bg-gray-200 p-2 text-blue-700 text-[12px] rounded' : 'text-[12px] rounded bg-gray-200 p-2 text-gray-400'}>344</p>
              </div>
              <div className="w-full flex justify-between pt-5">
              <label className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={employmentType.casualVacation}
                  onChange={() => handleToggleEmploymentType("casualVacation")}
                />
                <span className="ml-2">Casual/Vacation</span>
              </label>
              <p className={employmentType.casualVacation ? 'bg-gray-200 p-2 text-blue-700 text-[12px] rounded' : 'text-[12px] rounded bg-gray-200 p-2 text-gray-400'}>344</p>
              </div>
              <div className="w-full flex justify-between pt-5">
              <label className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={employmentType.contact}
                  onChange={() => handleToggleEmploymentType("contact")}
                />
                <span className="ml-2">Contact</span>
              </label>
              <p className={employmentType.contact ? 'bg-gray-200 p-2 text-blue-700 text-[12px] rounded' : 'text-[12px] rounded bg-gray-200 p-2 text-gray-400'}>344</p>
              </div>
              <div className="w-full flex justify-between pt-5">
              <label className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={employmentType.internshipTrainee}
                  onChange={() => handleToggleEmploymentType("internshipTrainee")}
                />
                <span className="ml-2">Internship/Trainee</span>
              </label>
              <p className={employmentType.internshipTrainee ? 'bg-gray-200 p-2 text-blue-700 text-[12px] rounded' : 'text-[12px] rounded bg-gray-200 p-2 text-gray-400'}>344</p>
              </div>
            </div>
          )}
        </div>
        <div className="mb-4 pt-5">
          <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => setIsSalaryRangeExpanded(!isSalaryRangeExpanded)}>
            <h2 className="text-base font-bold">Salary Range</h2>
            <button>{isSalaryRangeExpanded ? <img src="../../images/icons/down.png"></img>:<img src="../../images/icons/UPP.png"></img>}</button>
          </div>
          {isSalaryRangeExpanded && (
            <div>
              <input
                type="range"
                min="100000"
                max="200000"
                step="1000"
                value={salaryRange}
                onChange={handleSalaryRangeChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm font-semibold">
                <span>$100,000</span>
                <span>$200,000</span>
              </div>
            </div>
          )}
        </div>
        <div className="mb-4 pt-5">
          <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => setIsLocationExpanded(!isLocationExpanded)}>
            <h2 className="text-base font-bold">Location</h2>
            <button>{isLocationExpanded ? <img src="../../images/icons/down.png"></img>:<img src="../../images/icons/UPP.png"></img>}</button>
          </div>
          {isLocationExpanded && (
            <div>
              {/* Checkbox options for locations */}
              <label className="flex items-center mb-2 cursor-pointer pt-5">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Sydney</span>
              </label>
              <label className="flex items-center mb-2 cursor-pointer pt-5">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">United States</span>
              </label>
              <label className="flex items-center mb-2 cursor-pointer pt-5">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Vietnam</span>
              </label>
              <label className="flex items-center mb-2 cursor-pointer pt-5">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Germany</span>
              </label>
              <label className="flex items-center mb-2 cursor-pointer pt-5">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">France</span>
              </label>
            </div>
          )}
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => setIsSeniorityLevelExpanded(!isSeniorityLevelExpanded)}>
            <h2 className="text-base font-bold">Seniority Level</h2>
            <button>{isSeniorityLevelExpanded ? <img src="../../images/icons/down.png"></img>:<img src="../../images/icons/UPP.png"></img>}</button>
          </div>
          {isSeniorityLevelExpanded && (
            <div>
              {/* Checkbox options for seniority levels */}
              <label className="flex items-center mb-2 cursor-pointer pt-5">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={seniorityLevels.entryLevel}
                  onChange={() => handleToggleSeniorityLevel("entryLevel")}
                />
                <span className="ml-2">Entry Level</span>
              </label>
              <label className="flex items-center mb-2 cursor-pointer pt-5">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={seniorityLevels.midLevel}
                  onChange={() => handleToggleSeniorityLevel("midLevel")}
                />
                <span className="ml-2">Mid Level</span>
              </label>
              <label className="flex items-center mb-2 cursor-pointer pt-5">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  checked={seniorityLevels.seniorLevel}
                  onChange={() => handleToggleSeniorityLevel("seniorLevel")}
                />
                <span className="ml-2">Senior Level</span>
              </label>
            </div>
          )}
        </div>
      </div>
     <div className="flex flex-wrap mx-1 w-fit justify-center gap-4 ">
        <ActiveTests progress={2} />  <ActiveTests progress={0} />
        <ActiveTests progress={4} />
        <ActiveTests progress={3} />
        <ActiveTests progress={2} />  <ActiveTests progress={0} />
        <ActiveTests progress={4} />
        <ActiveTests progress={0} />
        <ActiveTests progress={3} />
      </div>
     
</div>
  )

};

export default Jobs;
