/*
event is an object like this one:
{
  Category:"guide", //what kind of event is this?
  Attending:["Smári", "Siggi", "Pedro"], //who is participating in this event?
  Title:"test event", //What is the name of this event?
  Owner:"Smári", //who created this event?
  Description:"This is a very nice guide", //Any detail about this event goes here
  Starting: new Date(), //when does the event start (using the Date web API)
  Ending: new Date() //when does the event end (using the Date web API)
}
How to create a custom date is described here: https://www.w3schools.com/js/js_dates.asp
id is a string that can be found in the objects that come from getEvents (named _id)
*/
​
//start by adding an event to the database by calling this function (you can copy the object above to use as your first event):
const addEvent = async (event)=>{
  return await fetch("https://tskoli-intranet-api-h7.vercel.app/api/v1/calendar",{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event)
  })
  .then(r=>r.json())
}
​
//if you did not get an error calling addEvent you can try to call this function and see if it comes out of the database:
const getEvents = async ()=>{
  return await fetch("https://tskoli-intranet-api-h7.vercel.app/api/v1/calendar")
  .then(r=>r.json())
}
​
//if you have been successful so far try to copy the _id and change the event a bit and call this function:
const updateEvent = async (id, event)=>{
  return await fetch(`https://tskoli-intranet-api-h7.vercel.app/api/v1/calendar/${id}`,{
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event)
  })
  .then(r=>r.json())
}
​
//The last thing to try is the delete function:
const deleteEvent = async (id)=>{
  return await fetch(`https://tskoli-intranet-api-h7.vercel.app/api/v1/calendar/${id}`,{
    method:"DELETE",
  })
}