const utcTimeString = "2024-04-08T08:42:19.391Z";
const utcDate = new Date(utcTimeString);

// Convert UTC time to a specific time zone (e.g., 'Asia/Kolkata')

// Output: "4/8/2024, 2:12:19 PM"

const convertDate = (time) => {
  const utcDate = new Date(time);
  const timeZone = "Asia/Kolkata";
  const localDate = utcDate.toLocaleString("en-US", { timeZone });
  return (
    localDate.split(",")[1].substring(0, 5) +
    localDate.split(",")[1].substring(8)
  );
};

export default convertDate;
