const calculateDaysAndWeeks = (createdDate) => {
  const currentDate = new Date();
  const differenceMs = currentDate - new Date(createdDate);

  const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  const differenceWeeks = Math.floor(differenceDays / 7);
  const remainingDays = differenceDays % 7;

  if (differenceDays === 0) {
    return "Today";
  } else if (differenceWeeks === 0) {
    return `${differenceDays} day${differenceDays > 1 ? "s" : ""} ago`;
  } else if (remainingDays === 0) {
    return `${differenceWeeks} week${differenceWeeks > 1 ? "s" : ""} ago`;
  } else {
    return `${differenceWeeks} week${
      differenceWeeks > 1 ? "s" : ""
    } and ${remainingDays} day${remainingDays > 1 ? "s" : ""} ago`;
  }
};

export default calculateDaysAndWeeks;
