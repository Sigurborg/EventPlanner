// Importing functions from API
import { getEvents, updateEvent } from "../api.js";
import { deleteEvent } from "./api.js";

function getName() {
  const userName = new URL(window.location.href).searchParams.get("name");
  localStorage.setItem("userName", userName);
}

getName();

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
    const attendBtnElement = document.createElement("button");

    titleElement.innerText = event.Title;
    categoryElement.innerText = event.Category;
    attendingElement.innerText = event.Attending.length;
    startDateElement.innerText =
      new Date(event.Starting).toLocaleString("is", dateFormat) +
      " - " +
      new Date(event.Ending).toLocaleTimeString("is", timeFormat);

    ownerElement.innerText = "Added by " + event.Owner;
    attendBtnElement.innerText = "See you there?";

    // We use the class names here to reference later in CSS for styling
    titleElement.classList.add("card-title");
    categoryElement.classList.add("card-category");
    attendingElement.classList.add("card-attending");
    startDateElement.classList.add("card-startdate");
    ownerElement.classList.add("card-owner");
    cardElement.classList.add("card");
    attendBtnElement.classList.add("card-button");

    cardElement.appendChild(titleElement);
    cardElement.appendChild(categoryElement);
    cardElement.appendChild(attendingElement);
    cardElement.appendChild(startDateElement);
    cardElement.appendChild(ownerElement);
    cardElement.appendChild(attendBtnElement);
    eventList.appendChild(cardElement);

    // Attend button
    attendBtnElement.setAttribute("data-events_id", event._id);

    attendBtnElement.onclick = function clickAttend() {
      const name = localStorage.getItem("userName");
      event.Attending.push(name);
      updateEvent(event._id, event);

      attendBtnElement.style.backgroundColor = "green";
      attendBtnElement.innerText = "Going";
    };
  });
  /*
  //If need to delete test events:
  events.forEach((event, i) => {
    if (i < 3) return;
    deleteEvent(event._id);
  });*/

  console.log(events);
});
