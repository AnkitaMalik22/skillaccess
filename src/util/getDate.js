// const utcTimeString = "2024-04-08T08:42:19.391Z";
// const utcDate = new Date(utcTimeString);

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

export function capitalize(sentence) {
  return sentence
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function convertToReadable(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default convertDate;
