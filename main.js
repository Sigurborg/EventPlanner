// Importing functions from API
import { addEvent, deleteEvent, getEvents, updateEvent } from "./api.js";

// Configuration for displayed time format (make it human readable)
const timeFormat = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

const dateFormat = {
  weekday: "short",
  month: "long",
  day: "2-digit",
  ...timeFormat,
};

// Event list on main page
getEvents().then((events) => {
  const eventList = document.getElementById("event-list");
  events.forEach((event) => {
    const cardElement = document.createElement("div");
    const titleElement = document.createElement("h2");
    const categoryElement = document.createElement("p");
    const attendingElement = document.createElement("p");
    const startDateElement = document.createElement("p");
    const ownerElement = document.createElement("p");

    titleElement.innerText = event.Title;
    categoryElement.innerText = event.Category;
    attendingElement.innerText = event.Attending.length;
    startDateElement.innerText =
      new Date(event.Starting).toLocaleString("is", dateFormat) +
      " - " +
      new Date(event.Ending).toLocaleTimeString("is", timeFormat);

    ownerElement.innerText = "Added by " + event.Owner;

    // We use the class names here to reference later in CSS for styling
    titleElement.classList.add("card-title");
    categoryElement.classList.add("card-category");
    attendingElement.classList.add("card-attending");
    startDateElement.classList.add("card-startdate");
    ownerElement.classList.add("card-owner");
    cardElement.classList.add("card");

    cardElement.appendChild(titleElement);
    cardElement.appendChild(categoryElement);
    cardElement.appendChild(attendingElement);
    cardElement.appendChild(startDateElement);
    cardElement.appendChild(ownerElement);
    eventList.appendChild(cardElement);
  });
  console.log(events);
});

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
