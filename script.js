// Select the output elements for year, month, and day where the results will be displayed
const output_year = document.querySelector(".output-year");
const output_month = document.querySelector(".output-month");
const output_day = document.querySelector(".output-day");

// Select the submit button that will trigger the age calculation
const submit_btn = document.querySelector(".submit-btn");

// Input elements: selecting the fields for entering the year, day, and month of birth
let isValid = false; // This variable will store the validation status
const input_year = document.querySelector("#year");
const input_day = document.querySelector("#day");
const input_month = document.querySelector("#month");

// Select the error message elements for day, month, and year to display any validation errors
const error_day = document.querySelector(".error-day");
const error_month = document.querySelector(".error-month");
const error_year = document.querySelector(".error-year");

// Function to check if a given year is a leap year
const isLeapYear = (year) => {
  // A year is a leap year if divisible by 4, but not by 100 unless also divisible by 400
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

// Object to hold the number of days in each month
// The key is the month number (1 = January, 2 = February, etc.) and the value is the number of days in that month
const daysInMonth = {
  1: 31,  // January
  2: 28,  // February (default, adjusted for leap years below)
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

// Function to validate the day based on the selected month and year
const isValidDay = (day, month, year) => {
  // Get the maximum number of days for the selected month from the 'daysInMonth' object
  let maxDays = daysInMonth[month];
  
  // If the month is February (month 2) and it's a leap year, adjust the maximum days to 29
  if (month === 2 && isLeapYear(year)) {
    maxDays = 29;
  }
  
  // Return true if the day is between 1 and the maximum number of days for the selected month
  return day >= 1 && day <= maxDays;
};

// Function to calculate the age based on the birth date
const calculateAge = (birthDay, birthMonth, birthYear) => {
  // Get the current date (today)
  const currentDate = new Date();
  let currentDay = currentDate.getDate();           // Get the current day
  let currentMonth = currentDate.getMonth() + 1;    // Get the current month (getMonth() returns 0-11, so add 1)
  let currentYear = currentDate.getFullYear();      // Get the current year

  // Validate the input year to ensure it's less than the current year
  if (birthYear >= currentYear) {
    error_year.textContent = "Year must be less than the current year.";
    return; // Stop further execution if the year is invalid
  }

  // Validate the month input to ensure it's a valid month (between 1 and 12)
  if (birthMonth < 1 || birthMonth > 12) {
    error_month.textContent = "Invalid month.";
    return; // Stop further execution if the month is invalid
  }

  // Validate the day using the 'isValidDay' function for the given month and year
  if (!isValidDay(birthDay, birthMonth, birthYear)) {
    error_day.textContent = `Invalid day for the selected month and year.`;
    return; // Stop further execution if the day is invalid
  }

  // Calculate the initial age by subtracting the birth year from the current year
  let age = currentYear - birthYear;
  
  // Adjust the age if the current date is earlier in the year than the birth date
  if (birthMonth > currentMonth || (birthMonth === currentMonth && birthDay > currentDay)) {
    age--; // Subtract one year from the age if the birthday hasn't occurred yet this year
  }

  // Calculate how many months and days have passed since the last birthday
  let monthsPassed = currentMonth - birthMonth >= 0 ? currentMonth - birthMonth : 12 + (currentMonth - birthMonth);
  let daysPassed = currentDay - birthDay >= 0 ? currentDay - birthDay : 31 + (currentDay - birthDay);

  // Output the calculated age (years, months, and days) to the respective output elements
  output_year.textContent = age;
  output_month.textContent = monthsPassed;
  output_day.textContent = daysPassed;
};

// Add an event listener to the submit button that triggers when the button is clicked
submit_btn.addEventListener("click", () => {
  // Get the values from the input fields and convert them to integers
  const birthDay = parseInt(input_day.value);
  const birthMonth = parseInt(input_month.value);
  const birthYear = parseInt(input_year.value);

  // Reset error messages to be empty before validation
  error_day.textContent = "";
  error_month.textContent = "";
  error_year.textContent = "";

  // Call the age calculation function to process the input values
  calculateAge(birthDay, birthMonth, birthYear);
});
