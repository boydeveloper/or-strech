export const formatDate = (dateString) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const joinedDate = new Date(dateString).toLocaleDateString(
    undefined,
    dateOptions
  );
  return `${joinedDate}`;
};

export const convertTo12 = (dateString) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentTime = new Date(dateString);
  const day = currentTime.getDate();
  const month = months[currentTime.getMonth()];
  const year = currentTime.getFullYear();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const amPm = hours >= 12 ? "PM" : "AM";
  const twelveHourFormat = (hours > 12 ? hours - 12 : hours) || 12;

  const formattedTime = `${month} ${day}, ${year} - ${twelveHourFormat}:${minutes} ${amPm}`;
  return formattedTime;
};
