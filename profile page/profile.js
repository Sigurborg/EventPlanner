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
  month: "long",
  day: "2-digit",
  ...timeFormat,
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
    const attendingElement = document.createElement("p");
    const startDateElement = document.createElement("p");
    const ownerElement = document.createElement("p");
    const attendBtnElement = document.createElement("button");
    const imageElement = document.createElement("img");

    titleElement.innerText = event.Title;
    categoryElement.innerText = event.Category;
    attendingElement.innerText = event.Attending.length;
    startDateElement.innerText =
      new Date(event.Starting).toLocaleString("is", dateFormat) +
      " - " +
      new Date(event.Ending).toLocaleTimeString("is", timeFormat);

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
    titleElement.classList.add("card-title");
    categoryElement.classList.add("card-category");
    attendingElement.classList.add("card-attending");
    startDateElement.classList.add("card-startdate");
    ownerElement.classList.add("card-owner");
    cardElement.classList.add("card");
    attendBtnElement.classList.add("card-button");
    imageElement.classList.add("images");

    otherElements.appendChild(imageElement);
    otherElements.appendChild(titleElement);
    otherElements.appendChild(categoryElement);
    otherElements.appendChild(attendingElement);
    otherElements.appendChild(startDateElement);
    otherElements.appendChild(ownerElement);
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
