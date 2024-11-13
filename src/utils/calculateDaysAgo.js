const calculateDaysAgo = (createdDate) => {
    // Strip time from both dates
    const createdDateWithoutTime = new Date(createdDate);
    createdDateWithoutTime.setHours(0, 0, 0, 0);
    const currentDateWithoutTime = new Date();
    currentDateWithoutTime.setHours(0, 0, 0, 0);
  
    const differenceMs = currentDateWithoutTime - createdDateWithoutTime;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  
 
    if (differenceDays === 0) {
      return "Today";
    } else if (differenceDays < 0) {
      return `${Math.abs(differenceDays)} day${Math.abs(differenceDays) > 1 ? "s" : ""} from now`;
    } else {
      return `${differenceDays} day${differenceDays > 1 ? "s" : ""} ago`;
    }

    // return differenceDays === 0 ? "Today" : `${differenceDays} day${differenceDays > 1 ? "s" : ""} ago`;
}
  export default calculateDaysAgo;
  