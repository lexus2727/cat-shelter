class Event {
    constructor(data) {
        this.id = data.id
        this.title = data.title 
        this.cat_id = data.cat_id
        this.description = data.description
        this.updated_at = data.updated_at
        this.created_at = data.created_at
    }

}

function addEvent() {     
    const event = {
        title: document.getElementById('title').value,
        description: document.getElementById('event-description').value,
        cat_id: document.getElementById('event-catId').value 
    }

    fetch("http://localhost:3000/events", {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json())
    .then(event => {
         clearCatsHtml()
         getCats()
      });
}

function renderEventFormFields(catId) {
    return `<label><strong>Title: </strong></label><br/>
    <input type="text" id="title"><br/>
    <input type="hidden" id="event-catId" value="${catId}">
    <label><strong>Description:   </strong></label><br/>
    <input type="text" id="event-description"><br/>  
    <input type="submit" value="Submit" style="color:white;background-color:orange">
    `  
}

function renderNewEventForm() {
    let catId = this.getAttribute('id')
    this.style.display = "none"
    let eventsHtml = this.parentElement
    let eventForm = document.createElement('form')
    eventForm.setAttribute("onsubmit", "addEvent(); return false;")
    eventForm.innerHTML = renderEventFormFields(catId)
    eventsHtml.appendChild(eventForm)
}

function addEventsClickListeners() {
    document.querySelectorAll('.view-events-cat-button').forEach(element => {
        element.addEventListener('click', viewCatEvents)
    })

    document.querySelectorAll('.add-event-button').forEach(element => {
        element.addEventListener('click', renderNewEventForm)
    })
    
    document.querySelectorAll('.edit-event-button').forEach(element => {
        element.addEventListener("click", editEvent)
    })

    document.querySelectorAll('.delete-event-button').forEach(element => {
        element.addEventListener("click", deleteEvent)
    })

}

function deleteEvent() {
    let eventId = this.parentElement.getAttribute('event-id')

    fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(json => {
          let selectedEvent = document.querySelector(`.card[event-id="${eventId}"]`) 
          selectedEvent.remove()
      })
}

function updateEvent() { 
    let eventId = this.event.target.parentElement.getAttribute('event-id')     
    let eventElement = document.querySelector(`.card[event-id="${eventId}"]`)
        
     let event = {
         title: eventElement.querySelector('#title').value, 
         description: eventElement.querySelector('#event-description').value, 
         cat_id: eventElement.querySelector('#event-catId').value,
     }

     fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(data => {
         clearCatsHtml()
         getCats()  
         Cat.newCatForm()
    })
}

function renderEventForm (catId) {
    let eventForm = document.createElement('form')
    eventForm.setAttribute("onsubmit", "updateEvent(); return false;")
    eventForm.innerHTML = renderEventFormFields(catId)
    return eventForm 
}

function populateEventForm(data) { 
    let event = new Event(data)
    let eventForm = renderEventForm(event.cat_id)
    
    eventForm.querySelector('#title').value = event.title 
    eventForm.querySelector('#event-description').value = event.description 
    eventForm.querySelector('#event-catId').value = event.cat_id 
    document.querySelector(`.card[event-id="${event.id}"]`).appendChild(eventForm)
}

function editEvent() { 
    toggleHideDisplay(this)

    let eventId = this.parentElement.getAttribute('event-id')
    console.log("eventId", eventId)
    fetch(`http://localhost:3000/events/${eventId}`)
    .then(resp => resp.json())
    .then(data => {

        populateEventForm(data)
 
    })

}

function viewCatEvents() {
    Cat.newCatForm()
    let catSelectedHtml = this.parentElement.querySelector('.events')
    toggleHideDisplay(catSelectedHtml)
}

 


