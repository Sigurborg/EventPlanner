import { getEvents, updateEvent } from "../api.js";

getEvents().then((events) => {
  const eventList = document.getElementById("about-event");
  const idLink = new URL(window.location.href).searchParams.get("eventid");
  console.log(events);
  const result = events.filter((event) => {
    return idLink == event._id;
    //return event.Attending.includes(localStorage.getItem("userName"));
  });

  result.forEach((event) => {
    console.log(event);
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
     attendBtnElement.setAttribute("data-events_id", event._id)
     attendBtnElement.onclick = function clickAttend() {
       const name = localStorage.getItem("userName");
       event.Attending.push(name);
       updateEvent(event._id, event);

       attendBtnElement.style.backgroundColor = "green";
       attendBtnElement.innerText = "Going";
     };
  });

});

//

let inputField = document.getElementById("inputField");
let addMessageButton = document.getElementById("addMessageButton");
let chatMessages = document.getElementById("chatMessages");
let noCommentsYetMessage = document.getElementById("noCommentsYetMessage");

function getName() {
  const userName = new URL(window.location.href).searchParams.get("name");
  localStorage.setItem("userName", userName);
}

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

function emptyInput() {
  if (inputField.value === "") {
    return true;
  } else {
    return false;
  }
}

addMessageButton.addEventListener("click", function () {
  if (emptyInput()) return;
  noCommentsYetMessage.remove();
  var theDate = document.createElement("p");
  var paragraph = document.createElement("p");
  theDate.classList.add("date-styling");
  theDate.innerText = new Date().toLocaleString("is", dateFormat);
  paragraph.innerText = inputField.value;
  paragraph.classList.add("message-styling");
  chatMessages.appendChild(theDate);
  chatMessages.appendChild(paragraph);
  inputField.value = "";
});

inputField.addEventListener("keypress", function (addByEnterBtn) {
  if (addByEnterBtn.key === "Enter") {
    addMessageButton.click();
  }
});

let attendingButton = document.getElementById("attendingButton");
console.log(attendingButton);
attendingButton.addEventListener("click", function () {
  var popup = document.getElementById("myPopup");
  console.log(popup);
  popup.classList.toggle("show");
});