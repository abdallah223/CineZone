export const formatDate = function (
  dateVal,
  options = { month: "short", day: "numeric", year: "numeric" }
) {
  const date = new Date(dateVal);
  const output = date.toLocaleDateString("en-US", options);
  return output;
};

export const formatTime = function (timeVal) {
  const hours = Math.floor(timeVal / 60);
  const remainingMinutes = timeVal % 60;
  return `${hours}:${remainingMinutes.toString().padStart(2, "0")}`;
};
