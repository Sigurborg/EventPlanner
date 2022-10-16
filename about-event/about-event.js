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
    const imageElement = document.createElement("img");

    titleElement.innerText = event.Title;
    categoryElement.innerText = event.Category;
    attendingElement.innerText = event.Attending.length;
    startDateElement.innerText =
      new Date(event.Starting).toLocaleString("is", dateFormat) +
      " - " +
      new Date(event.Ending).toLocaleTimeString("is", timeFormat);

    ownerElement.innerText = "Added by " + event.Owner;
    // attendBtnElement.innerText = "See you there?";

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

    // We use the class names here to reference later in CSS for styling
    imageElement.classList.add("images");
    titleElement.classList.add("card-title");
    categoryElement.classList.add("card-category");
    attendingElement.classList.add("card-attending");
    startDateElement.classList.add("card-startdate");
    ownerElement.classList.add("card-owner");
    cardElement.classList.add("card");
    attendBtnElement.classList.add("card-button");

    cardElement.appendChild(imageElement);
    cardElement.appendChild(titleElement);
    cardElement.appendChild(categoryElement);
    cardElement.appendChild(attendingElement);
    cardElement.appendChild(startDateElement);
    cardElement.appendChild(ownerElement);
    cardElement.appendChild(attendBtnElement);
    eventList.appendChild(cardElement);

    // Attend button
    //    attendBtnElement.setAttribute("data-events_id", event._id)
    //    attendBtnElement.onclick = function clickAttend() {
    //      const name = localStorage.getItem("userName");
    //      event.Attending.push(name);
    //      updateEvent(event._id, event);
    //
    //      attendBtnElement.style.backgroundColor = "green";
    //      attendBtnElement.innerText = "Going";
    //    };

    const name = localStorage.getItem("userName");
    if (event.Attending.includes(name)) {
      attendBtnElement.innerText = "Going";
    } else {
      attendBtnElement.innerText = "Join";
    }

    attendBtnElement.setAttribute("data-events_id", event._id);

    attendBtnElement.onclick = function clickAttend() {
      const name = localStorage.getItem("userName");

      if (event.Attending.includes(name)) {
        console.log("here");
        const updatedAddendingList = event.Attending.filter((listName) => {
          console.log("trying to remove");
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
  ...timeFormat,
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

// test.innerText = Attending.userName

// const attendingUsers = event.Attending.values();

// We want the value from the attending button.
// Instead of the lenght, we want the names.

// // Attend button
// attendBtnElement.setAttribute("data-events_id", event._id);
//
// attendBtnElement.onclick = function clickAttend() {
//   const name = localStorage.getItem("userName");
//   event.Attending.push(name);
//   updateEvent(event._id, event);
//
//   attendBtnElement.style.backgroundColor = "green";
//   attendBtnElement.innerText = "Going";
// };
