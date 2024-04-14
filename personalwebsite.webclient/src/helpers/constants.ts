export const apiUrl = import.meta.env.VITE_API_URL || "https://localhost:7002";
export const projectCategoryId = import.meta.env.VITE_PROJECT_ID || 5;

const oneMinute: number = 60000;
const fiveMinutes: number = 300000;
const tenMinutes: number = 600000;
const hourInMs: number = 3600000;
const dayInMs: number = 86400000;
const weekInMs: number = 604800000;

const months: string[] = [
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

export const returnDateTime = (date: string | undefined): string => {
  if (date === undefined) return "something went wrong";
  const dateTime = new Date(date);
  const currentDate = Date.now();
  if (dateTime.getTime() > currentDate - oneMinute) return "1 minute ago";
  else if (dateTime.getTime() > currentDate - fiveMinutes)
    return "5 minutes ago";
  else if (dateTime.getTime() > currentDate - tenMinutes)
    return "10 minutes ago";
  else if (dateTime.getTime() > currentDate - hourInMs) return "one hour ago";
  else if (dateTime.getTime() > currentDate - dayInMs)
    return "less than 24 hours";
  else if (dateTime.getTime() > currentDate - weekInMs)
    return "less than a week ago";
  else {
    return (
      dateTime.getDay().toString().padStart(2, "0") +
      "-" +
      months[dateTime.getMonth()] +
      "-" +
      dateTime.getFullYear().toString()
    );
  }
};

export const returnTime = (date: string | undefined): string => {
  if (date === undefined) return "something went wrong";
  const dateTime = new Date(date);
  return (
    dateTime.getHours().toString().padStart(2, "0") +
    ":" +
    dateTime.getMinutes().toString().padStart(2, "0")
  );
};

export function highlightMatchingMdText(text: string, search: string): string {
  // title should always stay intact and if it has a match i will replace it
  const len = 100;
  search = search.trim();
  if (search.length > 0) {
    const myRegExp = new RegExp(escapeCharactersForRegExp(search), "ig");
    const idx = text.search(myRegExp);
    if (idx >= 0) {
      const txt = text.slice(idx - len, idx + len);
      if (txt.length > 0) {
        return (
          "..." +
          txt.replace(
            myRegExp,
            `<span className="bg-yellow-400 dark:bg-yellow-500">$&</span>`
          ) +
          "..."
        );
      } else {
        return (
          text
            .replace(
              myRegExp,
              `<span className="bg-yellow-400 dark:bg-yellow-500">$&</span>`
            )
            .slice(0, len) + "..."
        );
      }
    } else {
      return text.slice(0, len) + "...";
    }
  }
  return text.slice(0, len) + "...";
}

export function highlightMatchingTitle(text: string, search: string): string {
  // title should always stay intact and if it has a match i will replace it
  search = search.trim();
  if (search.length > 0) {
    const myRegExp = new RegExp(escapeCharactersForRegExp(search), "ig");
    return text.replace(myRegExp, `<span>$&</span>`);
  }
  return text;
}

export function escapeCharactersForRegExp(str: string): string {
  // mathches every literal character
  const chReg = new RegExp("[[*+?{.()^$|]", "g");
  return str.replace(chReg, "\\$&");
}

export interface AnimateLink {
  active: boolean;
  animate: boolean;
}
