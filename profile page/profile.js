// Importing function from api
import { getEvents, updateEvent } from "../api.js";

// Configuration for displayed time format (make it human readable)
const timeFormat = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

const dateFormat = {
  weekday: "short",
  month: "short",
  day: "2-digit",
};

// Event list on main page. Same code but here we are filtering through them by username in Attending array
getEvents().then((events) => {
  const eventList = document.getElementById("my-events");
  const result = events.filter((event) => {
    return event.Attending.includes(localStorage.getItem("userName"));
  });

  result.forEach((event) => {
    const cardElement = document.createElement("div");
    const otherElements = document.createElement("a");
    const titleElement = document.createElement("h2");
    const categoryElement = document.createElement("p");
    const locationLabel = document.createElement("label");
    const locationElement = document.createElement("p");
    const attendingElement = document.createElement("p");
    const startDateLabel = document.createElement("label");
    const startDateElement = document.createElement("p");
    const startTimeLabel =document.createElement("label");
    const startTimeElement = document.createElement("p");
    const endTimeElement = document.createElement("p");
    const ownerElement = document.createElement("p");
    const attendBtnElement = document.createElement("button");
    const imageElement = document.createElement("img");
    const dateTime = document.createElement("div");
    const dateTimeValue = document.createElement("div");

    // Putting the date and time inside of a div
    dateTime.appendChild(startDateLabel);
    dateTimeValue.appendChild(startDateElement);
    dateTime.appendChild(startTimeLabel);
    dateTimeValue.appendChild(startTimeElement);
    dateTimeValue.appendChild(endTimeElement);

  // We are assigning the value of properties of the event object to the different elements
    titleElement.innerText = event.Title;
    categoryElement.innerText = event.Category;
    locationLabel.innerText = "Location";
    locationElement.innerText = event.Location;
    attendingElement.innerText = event.Attending.length;
    startDateLabel.innerText = "Date";
      startDateElement.innerText = new Date(event.Starting).toLocaleDateString(
        "is",
        dateFormat
      );
      startTimeLabel.innerText = "Time";
      startTimeElement.innerText = new Date(event.Starting).toLocaleTimeString(
        "is",
        timeFormat
      );
      endTimeElement.innerText =
        " - " + new Date(event.Ending).toLocaleTimeString("is", timeFormat);

    ownerElement.innerText = "Created by " + event.Owner;
    attendBtnElement.innerText = "Going";

    otherElements.href = "/about-event/about-event.html?eventid=" + event._id;

    if (event.Category.toLowerCase() === "conference") {
      imageElement.src = "../images/conference.jpg";
      attendBtnElement.style.backgroundColor = "#B26F75";
    }
    if (event.Category.toLowerCase() === "social") {
      imageElement.src = "../images/social.jpg";
      attendBtnElement.style.backgroundColor = "#769AB2";
    }
    if (event.Category.toLowerCase() === "vísindaferð") {
      imageElement.src = "../images/visindaferd.jpg";
      attendBtnElement.style.backgroundColor = "#5E9991";
    }

    // We use the class names here to reference later in CSS for styling
    imageElement.classList.add("images");
    titleElement.classList.add("card-title");
    categoryElement.classList.add("card-category");
    locationLabel.classList.add("subtitle")
    locationElement.classList.add("info-text");
    attendingElement.classList.add("card-attending");
    startDateLabel.classList.add("subtitle");
    startDateElement.classList.add("info-text");
    startTimeLabel.classList.add("subtitle", "subtitle-time");
    startTimeElement.classList.add("info-text", "info-text-start");
    endTimeElement.classList.add("info-text", "info-text-end");
    ownerElement.classList.add("card-owner");
    cardElement.classList.add("card");
    attendBtnElement.classList.add("card-button");

    dateTime.classList.add("date-time");

    otherElements.appendChild(imageElement);
    otherElements.appendChild(titleElement);
    otherElements.appendChild(categoryElement);
    otherElements.appendChild(locationLabel);
    otherElements.appendChild(locationElement);
    otherElements.appendChild(dateTime);
    otherElements.appendChild(dateTimeValue);
    cardElement.appendChild(attendBtnElement);
    cardElement.appendChild(otherElements);
    eventList.appendChild(cardElement);

    const name = localStorage.getItem("userName");
    if (event.Attending.includes(name)) {
      attendBtnElement.innerText = "Going";
    } else {
      attendBtnElement.innerText = "Join";
    }

    // Attend  button
    attendBtnElement.onclick = function clickAttend() {
      if (event.Attending.includes(name)) {
        event.Attending = event.Attending.filter((listName) => {
          return listName !== name;
        });

        attendBtnElement.innerText = "Join";
        updateEvent(event._id, event);
      } else {
        console.log("trying to add");
        attendBtnElement.innerText = "Going";
        event.Attending.push(name);
        updateEvent(event._id, event);
        console.log("name pushed");
      }
    };
  });

  console.log(result);
});
