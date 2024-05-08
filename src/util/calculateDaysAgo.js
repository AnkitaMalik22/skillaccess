const calculateDaysAgo = (createdDate) => {
  const currentDate = new Date();
  const differenceMs = currentDate - new Date(createdDate);

  const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  return differenceDays === 0
    ? "Today"
    : `${differenceDays} day${differenceDays > 1 ? "s" : ""} ago`;
};

export default calculateDaysAgo;
