// Select the necessary elements
const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

// Function to validate the phone number
function validatePhoneNumber(phoneNumber) {
  // Regular expression for validating US phone numbers
  const validPattern = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;

  return validPattern.test(phoneNumber);
}

// Add event listener to check button
checkBtn.addEventListener("click", () => {
  const input = userInput.value.trim();

  if (!input) {
    alert("Please provide a phone number");
    return;
  }

  const isValid = validatePhoneNumber(input);
  resultsDiv.textContent = isValid
    ? `Valid US number: ${input}`
    : `Invalid US number: ${input}`;
});

// Add event listener to clear button
clearBtn.addEventListener("click", () => {
  resultsDiv.textContent = "";
  userInput.value = "";
  userInput.focus();
});
