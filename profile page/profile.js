// Importing function from api
import { getEvents } from "../api.js";

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

    ownerElement.innerText = "Added by " + event.Owner;
    attendBtnElement.innerText = "Going";

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

    cardElement.appendChild(imageElement);
    cardElement.appendChild(titleElement);
    cardElement.appendChild(categoryElement);
    cardElement.appendChild(attendingElement);
    cardElement.appendChild(startDateElement);
    cardElement.appendChild(ownerElement);
    cardElement.appendChild(attendBtnElement);
    eventList.appendChild(cardElement);
  });

  console.log(result);
});
