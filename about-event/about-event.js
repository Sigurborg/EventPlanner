let inputField = document.getElementById('inputField');
let addMessageButton = document.getElementById('addMessageButton');
let chatMessages = document.getElementById('chatMessages');
let noCommentsYetMessage = document.getElementById('noCommentsYetMessage');


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
    if (inputField.value==="") { 
           return true 
    } else { 
           return false
}}


addMessageButton.addEventListener('click', function(){
    if (emptyInput()) return
    noCommentsYetMessage.remove()
    var theDate = document.createElement ('p')
    var paragraph = document.createElement('p')
    theDate.classList.add('date-styling')
    theDate.innerText = new Date().toLocaleString("is", dateFormat)
    paragraph.innerText = inputField.value
    paragraph.classList.add('message-styling')
    chatMessages.appendChild(theDate)
    chatMessages.appendChild(paragraph)
    inputField.value = ""
})


inputField.addEventListener('keypress', function(addByEnterBtn) {
    if (addByEnterBtn.key === "Enter") {
      addMessageButton.click();
    }
})