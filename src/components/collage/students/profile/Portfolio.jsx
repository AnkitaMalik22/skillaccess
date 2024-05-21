import React from "react";

const Portfolio = ({ Portfolio }) => {
  const checkSrc = (url) => {
    url = url.toLowerCase();
    if (url.includes("wordpress")) {
      return "../../../images/icons/wordPress.png";
    } else if (url.includes("linkedin")) {
      return "../../../images/icons/LinkedIn.png";
    } else if (url.includes("facebook")) {
      return "../../../images/icons/fb.png";
    } else if (url.includes("instagram")) {
      return "../../../images/icons/ig.png";
    } else if (url.includes("youtube")) {
      return "../../../images/icons/yt.png";
    } else if (url.includes("hackerearth")) {
      return "../../../images/icons/hacker.png";
    } else if (url.includes("codingninjas")) {
      return "../../../images/icons/cn.png";
    } else if (url.includes("codeforces")) {
      return "../../../images/icons/codef.png";
    } else if (url.includes("geeksforgeeks")) {
      return "../../../images/icons/gfg.png";
    } else if (url.includes("hackerrank")) {
      return "../../../images/icons/hack.png";
    } else if (url.includes("leetcode")) {
      return "../../../images/icons/lc.png";
    } else {
      return "../../../images/icons/link.png";
    }
  };
  const handleViewLink = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="px-4  ">
      {Portfolio?.map((portfolio, index) => {
        return (
          <div
            className=" grid grid-cols-4 text-center mt-3 bg-white rounded-lg w-11/12 mx-auto"
            key={index}
          >
            <span className="w-full  px-10 py-2 text-sm font-dmSans grid ">
              <img src={checkSrc(portfolio)} alt="wordPress" className="" />
            </span>
            <span
              className="self-center col-span-3"
              // onClick={()=>{
              //   handleViewLink(portfolio);
              // }}
            >
              <a
                href={portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="font-xs"
              >
                {portfolio}
              </a>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Portfolio;
