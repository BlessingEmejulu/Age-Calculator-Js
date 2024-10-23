const output_year = document.querySelector(".output-year");
const output_month = document.querySelector(".output-month");
const output_day = document.querySelector(".output-day");

const submit_btn = document.querySelector(".submit-btn");

let isValid = false;
const input_year = document.querySelector("#year");
const input_day = document.querySelector("#day");
const input_month = document.querySelector("#month");

const error_day = document.querySelector(".error-day");
const error_month = document.querySelector(".error-month");
const error_year = document.querySelector(".error-year");

// Function to check if a given year is a leap year
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// object for months
const daysInMonth = {
  1: 31, // January
  2: 28, // February (default)
  3: 31, // March
  4: 30, // April
  5: 31, // May
  6: 30, // June
  7: 31, // July
  8: 31, // August
  9: 30, // September
  10: 31, // October
  11: 30, // November
  12: 31, // December
};

// Function to validate the day based on the selected month and year
const isValidDay = (day, month, year) => {
  let maxDays = daysInMonth[month];
  if (month === 2 && isLeapYear(year)) {
    maxDays = 29;
  }
  return day >= 1 && day <= maxDays;
};

// Function to calculate the age based on the birth date
const calculateAge = (birthDay, birthMonth, birthYear) => {
  const currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();
  if (birthYear >= currentYear) {
    error_year.textContent = "Year must be less than the current year.";
    return;
  }

  if (birthMonth < 1 || birthMonth > 12) {
    error_month.textContent = "Invalid month.";
    return;
  }

  // Validate the day using the 'isValidDay' function for the given month and year
  if (!isValidDay(birthDay, birthMonth, birthYear)) {
    error_day.textContent = `Invalid day for the selected month and year.`;
    return;
  }

  let age = currentYear - birthYear;

  if (
    birthMonth > currentMonth ||
    (birthMonth === currentMonth && birthDay > currentDay)
  ) {
    age--;
  }

  let monthsPassed =
    currentMonth - birthMonth >= 0
      ? currentMonth - birthMonth
      : 12 + (currentMonth - birthMonth);
  let daysPassed =
    currentDay - birthDay >= 0
      ? currentDay - birthDay
      : 31 + (currentDay - birthDay);

  output_year.textContent = age;
  output_month.textContent = monthsPassed;
  output_day.textContent = daysPassed;
};

submit_btn.addEventListener("click", () => {
  const birthDay = parseInt(input_day.value);
  const birthMonth = parseInt(input_month.value);
  const birthYear = parseInt(input_year.value);

  error_day.textContent = "";
  error_month.textContent = "";
  error_year.textContent = "";

  calculateAge(birthDay, birthMonth, birthYear);
});
