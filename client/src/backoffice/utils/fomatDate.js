export const formatDate = (dateString) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const joinedDate = new Date(dateString).toLocaleDateString(
    undefined,
    dateOptions
  );
  return `${joinedDate}`;
};
