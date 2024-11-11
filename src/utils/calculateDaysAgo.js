const calculateDaysAgo = (createdDate) => {
    const currentDate = new Date();
    // Strip time from both dates
    const createdDateWithoutTime = new Date(createdDate);
    createdDateWithoutTime.setHours(0, 0, 0, 0);
    const currentDateWithoutTime = new Date();
    currentDateWithoutTime.setHours(0, 0, 0, 0);
  
    const differenceMs = currentDateWithoutTime - createdDateWithoutTime;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  
    return differenceDays === 0
      ? "Today"
      : `${differenceDays} day${differenceDays > 1 ? "s" : ""} ago`;
  };
  
  export default calculateDaysAgo;
  