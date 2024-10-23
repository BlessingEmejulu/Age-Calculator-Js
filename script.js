// Select the output elements
const output_year = document.querySelector(".output-year");
const output_month = document.querySelector(".output-month");
const output_day = document.querySelector(".output-day");
const submit_btn = document.querySelector(".submit-btn");

// Input elements
let isValid = false;
const input_year = document.querySelector("#year");
const input_day = document.querySelector("#day");
const input_month = document.querySelector("#month");

// Error elements
const error_day = document.querySelector(".error-day");
const error_month = document.querySelector(".error-month");
const error_year = document.querySelector(".error-year");

// Leap year check function
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

// Object to hold the number of days in each month
const daysInMonth = {
  1: 31,  // January
  2: 28,  // February (default, can change for leap years)
  3: 31,  // March
  4: 30,  // April
  5: 31,  // May
  6: 30,  // June
  7: 31,  // July
  8: 31,  // August
  9: 30,  // September
  10: 31, // October
  11: 30, // November
  12: 31  // December
};

// Function to validate the day based on the month and year
const isValidDay = (day, month, year) => {
  let maxDays = daysInMonth[month];
  
  // Adjust February for leap years
  if (month === 2 && isLeapYear(year)) {
    maxDays = 29;
  }
  
  // Check if the day is valid
  return day >= 1 && day <= maxDays;
};

// Age calculation function
const calculateAge = (birthDay, birthMonth, birthYear) => {
  const currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
  let currentYear = currentDate.getFullYear();

  // Check if the input year is valid (less than the current year)
  if (birthYear >= currentYear) {
    error_year.textContent = "Year must be less than the current year.";
    return;
  }

  // Validate month
  if (birthMonth < 1 || birthMonth > 12) {
    error_month.textContent = "Invalid month.";
    return;
  }

  // Validate day using the object-based day validation
  if (!isValidDay(birthDay, birthMonth, birthYear)) {
    error_day.textContent = `Invalid day for the selected month and year.`;
    return;
  }

  // If the birth date hasn't occurred yet this year, adjust the age
  let age = currentYear - birthYear;
  if (birthMonth > currentMonth || (birthMonth === currentMonth && birthDay > currentDay)) {
    age--;
  }

  // Output the age
  output_year.textContent = age;
  output_month.textContent = currentMonth - birthMonth >= 0 ? currentMonth - birthMonth : 12 + (currentMonth - birthMonth);
  output_day.textContent = currentDay - birthDay >= 0 ? currentDay - birthDay : 31 + (currentDay - birthDay);
};

// Event listener for submit button click
submit_btn.addEventListener("click", () => {
  const birthDay = parseInt(input_day.value);
  const birthMonth = parseInt(input_month.value);
  const birthYear = parseInt(input_year.value);

  // Reset error messages
  error_day.textContent = "";
  error_month.textContent = "";
  error_year.textContent = "";

  // Call the age calculation function
  calculateAge(birthDay, birthMonth, birthYear);
});
