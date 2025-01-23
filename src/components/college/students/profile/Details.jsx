import React from "react"
import { useSelector } from "react-redux"
import { CgPinAlt } from "react-icons/cg"
import { FaStar } from "react-icons/fa"
import PopUp from "./PopUp"
import PopUpReject from "./PopUpReject"
import Loader from "../../../loaders/Loader"
import toast from "react-hot-toast"



const Details = ({ student }) => {
  const handleViewCV = () => {
    if (student?.Cv?.url) {
      window.open(student.Cv.url, "_blank")
    } else {
      toast.error("No CV available")
    }
  }

  const handleApprove = (studentId) => {
    console.log("Approve", studentId)
  }

  const [visible, setVisible] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [sId, setSId] = React.useState(null)

  const { REJECT_STUDENT_LOADING, APPORVE_STUDENT_LOADING } = useSelector((state) => state.collegeStudents)

  if (!student) {
    return <div className="p-4 text-center">No student data available.</div>
  }

  return (
    <section className="bg-white rounded-2xl shadow-md">
      {visible && <PopUp visible={visible} studentId={sId} handleOverlay={() => setVisible(false)} />}

      {show && (
        <PopUpReject visible={show} handleSave={handleApprove} studentId={sId} handleOverlay={() => setShow(false)} />
      )}

      {/* Profile header */}
      <div className="flex justify-between border-b bg-gray-50 rounded-t-2xl p-4">
        <div className="flex gap-2 items-center">
          <div className="min-w-[2.5rem] h-10 self-center rounded-md overflow-hidden">

            <img src={student.avatar?.url || "/images/defaultUser.jpg"} alt="" className="h-10 w-10 object-cover" />

          </div>
          <div>
            <h2 className="text-base font-bold">
              {student.FirstName} {student.LastName}
            </h2>
            <h2 className="text-sm">{student.role || "No role specified"}</h2>
          </div>
        </div>

        <div className="self-center text-gray-400 mr-2">
          <span className="flex items-center">
            <CgPinAlt className="text-lg mr-1" />
            <p className="font-dmSans text-sm font-bold">{student.Address || "No address provided"}</p>
          </span>
          {/* <div className="text-sm flex justify-end text-black gap-1">
            4.5/5
            <FaStar className="self-center text-[#FF991F]" />
          </div> */}
        </div>
      </div>

      {/* Student details */}
      <div className="border-b p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm font-bold text-center bg-gray-50">
        <div>
          <h2 className="text-[#8F92A1] font-bold text-sm capitalize mb-1 tracking-[1px]">EMAIL ADDRESS</h2>
          <h2 className="text-sm lowercase font-bold text-[#171717]">{student.Email || "No email provided"}</h2>
        </div>
        <div>
          <h2 className="text-[#8F92A1] font-bold text-sm capitalize mb-1 tracking-[1px]">PHONE NUMBER</h2>
          <h2 className="text-sm font-bold text-[#171717]">{student.PhoneNumber || "No phone number provided"}</h2>
        </div>
        <div>
          <h2 className="text-[#8F92A1] font-bold text-sm capitalize mb-1 tracking-[1px]">ADDRESS</h2>
          <h2 className="text-sm first-letter:capitalize font-bold text-[#171717]">
            {student.Address || "No address provided"}
          </h2>
        </div>
        <div>
          <h2 className="text-[#8F92A1] font-bold text-sm capitalize mb-1 tracking-[1px]">WEBSITE</h2>
          <h2 className="text-sm first-letter:capitalize font-bold text-blued lowercase">
            {student.Website ? (
              <a href={student.Website} target="_blank" rel="noopener noreferrer" className="font-xs">
                {student.Website}
              </a>
            ) : (
              "No website provided"
            )}
          </h2>
        </div>
      </div>

      {/* Software Knowledge */}
      <div className="border-b flex flex-col sm:flex-row justify-between text-sm font-bold text-center p-4 bg-gray-50 items-center">
        <h2 className="self-center font-bold text-base mb-2 sm:mb-0">Software Knowledge</h2>
        <span className="flex gap-2 flex-wrap text-sm">
          {student?.Skills?.SoftwareKnowledge?.length > 0
            ? student.Skills.SoftwareKnowledge.join(", ")
            : "No software knowledge specified"}
        </span>
      </div>

      {/* Action buttons */}
      <div className="rounded-b-lg px-6 flex flex-col sm:flex-row justify-between text-sm text-center p-4 bg-gray-50 font-dmSans gap-4">
        <button className="p-3 rounded-xl w-full sm:w-24 bg-[#8f92a11d] font-bold" onClick={handleViewCV}>
          View CV
        </button>

        <span className="flex flex-col sm:flex-row gap-2">
          {!student.approved && (
            <button
              className="py-3 rounded-xl px-3 text-[#DE350B] border-2 border-[#DE350B] font-bold items-center gap-2"
              onClick={() => {
                setShow(true)
                setSId(student._id)
              }}
            >
              {REJECT_STUDENT_LOADING ? (
                <>
                  Rejecting... <Loader />
                </>
              ) : (
                "Reject Request"
              )}
            </button>
          )}
          <button
            className="py-3 rounded-xl px-3 bg-[#8f92a11d] font-bold"
            onClick={() => {
              if (student?.certificates?.length > 0) {
                window.open(student.certificates[0].url, "_blank")
              } else {
                toast.error("No certificates found")
              }
            }}
          >
            View Certificates
          </button>
          {!student.approved && (
            <button
              className="py-2 text-white rounded-xl px-4 bg-accent font-bold flex items-center justify-center gap-2"
              onClick={() => {
                setVisible(true)
                setSId(student._id)
              }}
            >
              {APPORVE_STUDENT_LOADING ? (
                <>
                  Approving... <Loader />
                </>
              ) : (
                "Approve Request"
              )}
            </button>
          )}
        </span>
      </div>
    </section>
  )
}

export default Details

