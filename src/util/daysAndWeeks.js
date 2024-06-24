const calculateDaysAndWeeks = (createdDate) => {
  const currentDate = new Date();
  const pastDate = new Date(createdDate);

  // Calculate the total difference in milliseconds
  const differenceMs = currentDate - pastDate;

  // Calculate difference in days
  const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  // Calculate difference in weeks and remaining days
  const differenceWeeks = Math.floor(differenceDays / 7);
  const remainingDays = differenceDays % 7;

  // Calculate difference in months and years
  let differenceMonths = 
    (currentDate.getFullYear() - pastDate.getFullYear()) * 12 + 
    (currentDate.getMonth() - pastDate.getMonth());
  let differenceYears = Math.floor(differenceMonths / 12);
  differenceMonths = differenceMonths % 12;

  // Calculate remaining days after accounting for months and years
  const yearMonthsDays = new Date(pastDate);
  yearMonthsDays.setFullYear(pastDate.getFullYear() + differenceYears);
  yearMonthsDays.setMonth(pastDate.getMonth() + differenceMonths);

  const remainingDaysAfterMonths = Math.floor((currentDate - yearMonthsDays) / (1000 * 60 * 60 * 24));

  if (differenceDays === 0) {
    return "Today";
  } else if (differenceYears > 0) {
    if (differenceMonths > 0 || remainingDaysAfterMonths > 0) {
      return `${differenceYears} year${differenceYears > 1 ? "s" : ""}, ${differenceMonths} month${differenceMonths > 1 ? "s" : ""}, and ${remainingDaysAfterMonths} day${remainingDaysAfterMonths > 1 ? "s" : ""} ago`;
    } else {
      return `${differenceYears} year${differenceYears > 1 ? "s" : ""} ago`;
    }
  } else if (differenceMonths > 0) {
    if (remainingDaysAfterMonths > 0) {
      return `${differenceMonths} month${differenceMonths > 1 ? "s" : ""} and ${remainingDaysAfterMonths} day${remainingDaysAfterMonths > 1 ? "s" : ""} ago`;
    } else {
      return `${differenceMonths} month${differenceMonths > 1 ? "s" : ""} ago`;
    }
  } else if (differenceWeeks > 0) {
    if (remainingDays > 0) {
      return `${differenceWeeks} week${differenceWeeks > 1 ? "s" : ""} and ${remainingDays} day${remainingDays > 1 ? "s" : ""} ago`;
    } else {
      return `${differenceWeeks} week${differenceWeeks > 1 ? "s" : ""} ago`;
    }
  } else {
    return `${differenceDays} day${differenceDays > 1 ? "s" : ""} ago`;
  }
};

export default calculateDaysAndWeeks;
