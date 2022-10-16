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
  events.sort((eventA, eventB) => {
    if (new Date(eventA.Starting) > new Date(eventB.Starting)) {
      return 1;
    }
    return -1;
  });
  events.forEach((event, index) => {
    const cardElement = document.createElement("div");
    const otherElements = document.createElement("a");

    const titleElement = document.createElement("h1");
    const categoryElement = document.createElement("p");
    const attendingElement = document.createElement("p");
    const startDateElement = document.createElement("p");
    const ownerElement = document.createElement("p");
    const attendBtnElement = document.createElement("button");
    const imageElement = document.createElement("img");

    const name = localStorage.getItem("userName");
    if (event.Attending.includes(name)) {
      attendBtnElement.innerText = "Going";
    } else {
      attendBtnElement.innerText = "Join";

    }
    titleElement.innerText = event.Title;
    categoryElement.innerText = event.Category;
    attendingElement.innerText = event.Attending.length;
    startDateElement.innerText =
      new Date(event.Starting).toLocaleString("is", dateFormat) +
      " - " +
      new Date(event.Ending).toLocaleTimeString("is", timeFormat);
    ownerElement.innerText = "Added by " + event.Owner;

    otherElements.href = "about-event/about-event.html?eventid=" + event._id;
    if (event.Category === "Conference") {
      imageElement.src = "images/conference.jpg";
      attendBtnElement.style.backgroundColor = "#B26F75";
    }
    if (event.Category === "Social") {
      imageElement.src = "images/social.jpg";
      attendBtnElement.style.backgroundColor = "#769AB2";
    }
    if (event.Category === "Vísindaferð") {
      imageElement.src = "images/visindaferd.jpg";
      attendBtnElement.style.backgroundColor = "#5E9991";
    }
    console.log(event.Category);
    // We use the class names here to reference later in CSS for styling
    imageElement.classList.add("images");
    titleElement.classList.add("card-title");
    categoryElement.classList.add("card-category");
    attendingElement.classList.add("card-attending");
    startDateElement.classList.add("card-startdate");
    ownerElement.classList.add("card-owner");
    cardElement.classList.add("card");

    // Use this class ("first-card") to style the top event
    if (index === 0) {
      cardElement.classList.add("first-card");
    }

    attendBtnElement.classList.add("card-button");

    otherElements.appendChild(imageElement);
    otherElements.appendChild(titleElement);
    otherElements.appendChild(categoryElement);
    otherElements.appendChild(attendingElement);
    otherElements.appendChild(startDateElement);
    otherElements.appendChild(ownerElement);

    cardElement.appendChild(otherElements);
    cardElement.appendChild(attendBtnElement);

    eventList.appendChild(cardElement);

    // Attend button
    attendBtnElement.setAttribute("data-events_id", event._id);

    attendBtnElement.onclick = function clickAttend() {
      const name = localStorage.getItem("userName");

<<<<<<< HEAD
      attendBtnElement.innerText = "Going";
=======
      if (event.Attending.includes(name)) {
        console.log('here');
          const updatedAddendingList = event.Attending.filter((listName) => {
            console.log('trying to remove');
            // if you're it, you're removed
            if (listName === name) {
              return false;
            }
            // everyone else can come
            return true;
          });
          
          event.Attending = updatedAddendingList;

          attendBtnElement.innerText = "Join";
          attendBtnElement.style.backgroundColor = "#5E9991";
          updateEvent(event._id, event);
          /*
          remove the user from the array of attending
          reset the button to original state
          run updateEvent method from api
        */
      } else {
        console.log('trying to add');
        event.Attending.push(name);
        updateEvent(event._id, event);
  
        attendBtnElement.style.backgroundColor = "#5E9991";
        attendBtnElement.innerText = "Going";
      }
>>>>>>> 4edeb0476c07debcd08b3812d8743e5b7fbd5c1b
    };
  });
  /*
  //If we need to delete test events:
  events.forEach((event, i) => {
    if (i < 3) return;
    deleteEvent(event._id);
  });*/

  console.log(events);
});
