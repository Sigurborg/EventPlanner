/* Importing functions from API*/
import { getEvents, updateEvent } from "../api.js";
import { deleteEvent } from "./api.js";

/* Using local storage to "get" and "set" name from browser and storing it inside a variable (userName)*/
function getName() {
  if (
    localStorage.getItem("userName") === null ||
    localStorage.getItem("userName") === "null"
  ) {
    const userName = new URL(window.location.href).searchParams.get("name");
    localStorage.setItem("userName", userName);
  }
}
// We run this function immediately upon opening to get the username
getName();

/* Setting the displayed time and date format (make it human readable)*/
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

/* Here we are generating the list of events*/
const generateEventList = () => {
  getEvents().then((events) => {
    console.log({ events });
    const eventList = document.getElementById("event-list");
    const firstEvent = document.getElementById("first-event");
    eventList.innerHTML = "";
    firstEvent.innerHTML = "";
    // Sorting events by date, putting the oldest at the top of list
    events.sort((eventA, eventB) => {
      if (new Date(eventA.Starting) > new Date(eventB.Starting)) {
        return 1;
      }
      return -1;
    });
    // Creating the elements that go on each card
    events.forEach((event, index) => {
      const cardElement = document.createElement("div");
      const otherElements = document.createElement("a");

      const titleElement = document.createElement("h1");
      const categoryElement = document.createElement("p");
      const locationLabel = document.createElement("label");
      const locationElement = document.createElement("p");
      const attendingElement = document.createElement("p");
      const startDateLabel = document.createElement("label");
      const startDateElement = document.createElement("p");
      const startTimeLabel = document.createElement("label");
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
      locationLabel.innerText = "Location";
      locationElement.innerText = event.Location;
      categoryElement.innerText = event.Category;
      attendingElement.innerText = event.Attending.length + " people are going";

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

      // Assigning different event categories to the apropriate images and colors
      otherElements.href = "about-event/about-event.html?eventid=" + event._id;
      if (event.Category.toLowerCase() === "conference") {
        imageElement.src = "images/conference.jpg";
        attendBtnElement.style.backgroundColor = "#B26F75";
      }
      if (event.Category.toLowerCase() === "social") {
        imageElement.src = "images/social.jpg";
        attendBtnElement.style.backgroundColor = "#769AB2";
      }
      if (event.Category.toLowerCase() === "vísindaferð") {
        imageElement.src = "images/visindaferd.jpg";
        attendBtnElement.style.backgroundColor = "#5E9991";
      }

      // We use the class names here to reference later in CSS for styling
      imageElement.classList.add("images");
      titleElement.classList.add("card-title");
      categoryElement.classList.add("card-category");
      locationLabel.classList.add("subtitle");
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

      // Appending the elements so they appear in the right order
      otherElements.appendChild(imageElement);
      otherElements.appendChild(titleElement);
      otherElements.appendChild(categoryElement);
      otherElements.appendChild(locationLabel);
      otherElements.appendChild(locationElement);
      otherElements.appendChild(dateTime);
      otherElements.appendChild(dateTimeValue);
      cardElement.appendChild(otherElements);
      cardElement.appendChild(attendBtnElement);

      // Use this class ("first-card") to style the top event
      if (index === 0) {
        // cardElement.classList.add("first-card");
        firstEvent.appendChild(cardElement);
      } else {
        eventList.appendChild(cardElement);
      }

      // Getting username from local storage if it matches a name in Attending array then the attending buttton toggles Going, if not Join.
      const name = localStorage.getItem("userName");
      if (event.Attending.includes(name)) {
        attendBtnElement.innerText = "Going";
      } else {
        attendBtnElement.innerText = "Join";
      }

      // Attend button click event
      attendBtnElement.onclick = function clickAttend() {
        if (event.Attending.includes(name)) {
          event.Attending = event.Attending.filter((listName) => {
            return listName !== name;
          });
          attendBtnElement.innerText = "Join";
          updateEvent(event._id, event);
        } else {
          event.Attending.push(name);
          attendBtnElement.innerText = "Going";
          updateEvent(event._id, event);
        }
      };
    });
    /*
    //If we need to delete test events:
    events.forEach((event, i) => {
      if (i < 0) return;
      deleteEvent(event._id); 
    }); */

    console.log(events);
  });
};

// called once on opening the page
generateEventList();

// Event list on main page
setInterval(() => {
  // called once every five seconds, to prevent having to refresh to see changes
  generateEventList();
}, 5000);
