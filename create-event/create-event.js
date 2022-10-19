// Importing functions from API
import { addEvent } from "../api.js";

// Giving this variable a default value
let eventCategory = "Vísindaferð";

// Creating a function to clear out the form and reset the time
const clearForm = () => {
  document.getElementById("event-name").value = "";
  document.getElementById("event-date").value = "";
  document.getElementById("start-time").value = "12:00";
  document.getElementById("end-time").value = "12:00";
  document.getElementById("event-description").value = "";
};

// Taking values from "Create event" input boxes and turning them into variables
const submitEvent = () => {
  const eventTitle = document.getElementById("event-name").value;
  const eventDate = document.getElementById("event-date").value;
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;
  const eventDescription = document.getElementById("event-description").value;
  const eventOwner = localStorage.getItem("userName");

  // Using split to get value from date input so that we can construct a "start datetime" and "end datetime" date object
  const dateSplit = eventDate.split("-"); // returns [year, month, day]
  const startTimeSplit = startTime.split(":"); // returns [hour, minute]
  const endTimeSplit = endTime.split(":"); // returns [hour, minute]

  const startDate = new Date(
    dateSplit[0], // year
    dateSplit[1], // month
    dateSplit[2], // day
    startTimeSplit[0], // hour
    startTimeSplit[1] // minute
  );

  const endDate = new Date(
    dateSplit[0], // year
    dateSplit[1], // month
    dateSplit[2], // day
    endTimeSplit[0], // hour
    endTimeSplit[1] // minute
  );

  // New event function. This is how the information is displayed. We use the values from submitEvent.
  const newEvent = {
    Title: eventTitle,
    Category: eventCategory,
    Attending: [],
    Owner: eventOwner,
    Description: eventDescription,
    Starting: startDate,
    Ending: endDate,
  };

  addEvent(newEvent);
};

// Getting all buttons
const submitButton = document.getElementById("add-event");
const scienceButton = document.getElementById("science-button");
const conferenceButton = document.getElementById("conference-button");
const socialButton = document.getElementById("social-button");

// Creating a function that resets button styles back to default
function resetButtonStyles() {
  scienceButton.style.backgroundColor = "#b26f75";
  socialButton.style.backgroundColor = "#769ab2";
  conferenceButton.style.backgroundColor = "#5e9991";
  scienceButton.style.color = "#f3f4f6";
  socialButton.style.color = "#f3f4f6";
  conferenceButton.style.color = "#f3f4f6";
}

scienceButton.addEventListener("click", function onClick() {
  resetButtonStyles();
  scienceButton.style.backgroundColor = "#303a49";
  scienceButton.style.color = "white";
  eventCategory = "Vísindaferð";
});

conferenceButton.addEventListener("click", function onClick() {
  resetButtonStyles();
  conferenceButton.style.backgroundColor = "#303a49";
  conferenceButton.style.color = "white";
  eventCategory = "Conference";
});

socialButton.addEventListener("click", function onClick() {
  resetButtonStyles();
  socialButton.style.backgroundColor = "#303a49";
  socialButton.style.color = "white";
  eventCategory = "Social";
});

// Checking if the input has an empty string or does it have a value. If it is empty there will be a error message
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error"); // add the error class if it missing
  inputControl.classList.remove("success"); // add the success class if it is present (red border from my css)
};
const setSuccess = (element) => {
  console.log(element);
};

// I have to then add every validation condition that I want for each value. Because they are required fields

document.querySelector("form").addEventListener("submit", (e) => {
  let errorCount = 0;

  e.preventDefault();
  const eventTitle = document.getElementById("event-name");
  const eventDescription = document.getElementById("event-description");

  const eventTitleValue = eventTitle.value.trim();
  const eventDescriptionValue = eventDescription.value.trim();

  if (eventTitleValue === "") {
    setError(eventTitle, "Event title is required");
    errorCount++;
  } else {
    setSuccess(eventTitle);
  }

  // Check if description is not empty
  if (eventDescriptionValue === "") {
    setError(eventDescription, "Description is required");
    eventDescription.style.color = "red";
    errorCount++;
  } else {
    setSuccess(eventDescription);
  }
  if (errorCount === 0) {
    submitButton.style.backgroundColor = "greenyellow";
    submitButton.style.color = "black";
    submitButton.textContent = "Your event has been added/created";
    submitEvent();
    clearForm();
  }
});

// Check if I got any errors and If not I open the success popup
/**if (errorCount === 0){
  openPopup();
  clearForm();
};
// Here we open the popup
function openPopup(){
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  popup.classList.add("open-popup")
}
// Here we close the popup
function closePopup(){
  popup.classList.remove("open-popup")
}
**/
