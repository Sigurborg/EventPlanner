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
