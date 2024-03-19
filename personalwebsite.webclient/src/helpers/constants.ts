export const apiUrl = import.meta.env.API_URL || "https://localhost:7002";

const oneMinute: number = 60000;
const fiveMinutes: number = 300000;
const tenMinutes: number = 600000;
const hourInMs: number = 3600000;
const dayInMs: number = 86400000;
const weekInMs: number = 604800000;

export const returnDateTime = (date: string | undefined): string => {
  if (date === undefined) return "something went wrong";
  const dateTime = new Date(date);
  const currentDate = Date.now();
  if (dateTime.getTime() > currentDate - oneMinute) return "one minute ago";
  else if (dateTime.getTime() > currentDate - fiveMinutes)
    return "five minutes ago";
  else if (dateTime.getTime() > currentDate - tenMinutes)
    return "ten minutes ago";
  else if (dateTime.getTime() > currentDate - hourInMs) return "one hour ago";
  else if (dateTime.getTime() > currentDate - dayInMs)
    return "less than 24 hours";
  else if (dateTime.getTime() > currentDate - weekInMs)
    return "less than a week ago";
  else {
    return (
      dateTime.getDay() +
      "." +
      dateTime.getMonth() +
      "." +
      dateTime.getFullYear() +
      "."
    );
  }
};
