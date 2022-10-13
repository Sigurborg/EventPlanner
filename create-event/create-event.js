// Importing functions from API
import { addEvent } from "../api.js";

// Taking values from "Create event" input boxes and turning them into variables
const submitEvent = () => {
  const eventTitle = document.getElementById("event-name").value;
  const eventDate = document.getElementById("event-date").value;
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;
  const eventOwner = document.getElementById("event-owner").value;
  const eventDescription = document.getElementById("event-description").value;

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
    Category: "Vísindaferð",
    Attending: [],
    Owner: eventOwner,
    Description: eventDescription,
    Starting: startDate,
    Ending: endDate,
  };

  addEvent(newEvent);
};

const submitButton = document.getElementById("add-event");
submitButton.addEventListener("click", submitEvent);

/* The code section above is the basic function that adds a new event to the main - do not change! */

/**
submitButton.addEventListener('click', function onClick() {
  submitButton.style.backgroundColor = 'greenyellow';
  submitButton.style.color = 'black';
});
btn.addEventListener('click', function handleClick() {
  btn.textContent = "Your event has been created";
});
**/
/** The form validation code is written below
const validateForm = ()=> {
  return(
      validateInput("ename")
      && validateInput("createdby")
      && validateInput("description")
  )
}
console.log(validateForm)
function validateInput(name) {
  let y = document.forms["myForm"][name].value;
  if (y == "") {
    alert("Mandatory fields(*) cannot be left blank!");
    return false;
  }
  return true;
}
document.querySelector('form').addEventListener('submit', validateForm);
**/

// Checking if it is an emty string or does it have a value. If it is empty there will be a error message
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
  const eventOwner = document.getElementById("event-owner");
  const eventDescription = document.getElementById("event-description");

  const eventTitleValue = eventTitle.value.trim();
  const eventOwnerValue = eventOwner.value.trim();
  const eventDescriptionValue = eventDescription.value.trim();

  if (eventTitleValue === "") {
    setError(eventTitle, "Event title is required");
    errorCount++;
  } else {
    setSuccess(eventTitle);
  }

  // Check if event owner is not empty
  if (eventOwnerValue === "") {
    setError(eventOwner, "Created by is required");
    errorCount++;
  } else {
    setSuccess(eventOwner);
  }

  // Check if description is not empty
  if (eventDescriptionValue === "") {
    setError(eventDescription, "Description is required");
    errorCount++;
  } else {
    setSuccess(eventDescription);
  }
  if (errorCount == 0) {
    btn.style.backgroundColor = "greenyellow";
    btn.style.color = "black";
    btn.textContent = "Your event has been added/created";
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
