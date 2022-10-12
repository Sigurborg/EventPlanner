// This takes you to the main events page after you've signed in
/*const name = localStorage.getItem("userName");
if (name) {
  window.location.replace("/index.html");
}*/
// Using local storage to "set" and "get"
function getName() {
  const userName = document.getElementById("user-name").value;
  localStorage.setItem("userName", userName);
  window.location.replace("/index.html");
}

// Submit button. Once clicked it will get the name from local storage
const submitButton = document.getElementById("submit-name");

submitButton.addEventListener("click", getName);
