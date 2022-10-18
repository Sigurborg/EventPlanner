import { getEvents, updateEvent } from "../api.js";

getEvents().then((events) => {
  const idLink = new URL(window.location.href).searchParams.get("eventid");
  const result = events.filter((event) => {
    return idLink == event._id;
    //return event.Attending.includes(localStorage.getItem("userName"));
  });

  result.forEach((event) => {
    const titleElement = document.getElementById("title");
    titleElement.innerText = event.Title;

    const categoryElement = document.getElementById("category");
    categoryElement.innerText = event.Category;

    const dateElement = document.getElementById("date");
    dateElement.innerText = new Date(event.Starting).toLocaleString(
      "is",
      dateFormat
    );

    const timeElement = document.getElementById("time");
    timeElement.innerText = new Date(event.Starting).toLocaleTimeString(
      "is",
      timeFormat
    );

    const ownerElement = document.getElementById("owner");
    ownerElement.innerText = event.Owner;

    const descriptionElement = document.getElementById("description");
    descriptionElement.innerText = event.Description;

    const imageElement = document.getElementById("event-image");
    const attendBtnElement = document.getElementById("attend-button");
    if (event.Category === "Conference") {
      imageElement.src = "/images/conference.jpg";
      attendBtnElement.style.backgroundColor = "#B26F75";
    }
    if (event.Category === "Social") {
      imageElement.src = "/images/social.jpg";
      attendBtnElement.style.backgroundColor = "#769AB2";
    }

    if (event.Category === "Vísindaferð") {
      imageElement.src = "/images/visindaferd.jpg";
      attendBtnElement.style.backgroundColor = "#5E9991";
    }

    // Expanded area on card
    const bottomAreaElement = document.getElementById("bottom-area");
    const expanderBtnElement = document.getElementById("expand-button");
    expanderBtnElement.addEventListener("click", function () {
      expanderBtnElement.classList.toggle("active");
      if (bottomAreaElement.style.display === "block") {
        bottomAreaElement.style.display = "none";
      } else {
        bottomAreaElement.style.display = "block";
      }
    });

    const name = localStorage.getItem("userName");
    if (event.Attending.includes(name)) {
      attendBtnElement.innerText = "Going";
    } else {
      attendBtnElement.innerText = "Join";
    }

    attendBtnElement.setAttribute("data-events_id", event._id);

    attendBtnElement.onclick = function clickAttend() {
      if (event.Attending.includes(name)) {
        const updatedAddendingList = event.Attending.filter((listName) => {
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
        console.log("trying to add");
        event.Attending.push(name);
        updateEvent(event._id, event);

        attendBtnElement.style.backgroundColor = "#5E9991";
        attendBtnElement.innerText = "Going";
      }
    };
  });

  let attendingButton = document.getElementById("attendingButton");

  let test = document.createElement("ul");
  console.log("test", result[0].Attending);
  result[0].Attending.forEach((studentName) => {
    let listItem = document.createElement("li");
    listItem.innerText = studentName;
    test.appendChild(listItem);
  });
  test.classList.add("popup");

  attendingButton.addEventListener("click", function () {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    popup.appendChild(test);
  });
});

//

const inputField = document.getElementById("inputField");
const addMessageButton = document.getElementById("addMessageButton");
const chatMessages = document.getElementById("chatMessages");
const noCommentsYetMessage = document.getElementById("noCommentsYetMessage");
const userComment = localStorage.getItem("userName");

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
};

function emptyInput() {
  if (inputField.value === "") {
    return true;
  } else {
    return false;
  }
}

// Chatbox
addMessageButton.addEventListener("click", function () {
  if (emptyInput()) return;
  noCommentsYetMessage.remove();
  var theDate = document.createElement("p");
  var paragraph = document.createElement("p");
  const commenterName = document.createElement("p");
  commenterName.textContent = userComment;
  theDate.classList.add("date-styling");
  theDate.innerText = new Date().toLocaleString("is", dateFormat);
  paragraph.innerText = inputField.value;
  paragraph.classList.add("message-styling");
  chatMessages.appendChild(commenterName);
  chatMessages.appendChild(paragraph);
  chatMessages.appendChild(theDate);
  inputField.value = "";
});

inputField.addEventListener("keypress", function (addByEnterBtn) {
  if (addByEnterBtn.key === "Enter") {
    addMessageButton.click();
  }
});
