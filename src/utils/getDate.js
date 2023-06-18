import React from "react";

export const getDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let dayName = today.toLocaleString("en-us", { weekday: "long" });

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "-" + mm + "-" + yyyy;
  return {
    today,
    year: yyyy,
    month: mm,
    day: dd,
    date: formattedToday,
    week: dayName,
  };
};

export const addDays = (date, days) => {
  // Function to add Days
  var result = new Date(date);

  result.setDate(result.getDate() + days);
  let dayName = result.toLocaleString("en-us", { weekday: "long" });
  return { dateString: result.toLocaleString("en-GB"), weekday: dayName };
};
