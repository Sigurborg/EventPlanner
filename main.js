// Here we are getting a list of all the expander "buttons"
const expanders = document.getElementsByClassName("expander")

// Looping through all expanders
for(let i = 0; i < expanders.length; i++) {
    // Adding event listener for the click event to all expanders
    expanders[i].addEventListener('click', () => {
        /* Here we are getting the matching expandable card area element for the
        expander that is being clicked at this moment*/
        const expandableArea = document.getElementById(`card-area-${i}`);

        // Toggling on and off the 'show' class
        if (expandableArea.classList.contains('show')) {
            expandableArea.classList.remove('show')
        }
        else {
            expandableArea.classList.add('show');
        }
    })
}