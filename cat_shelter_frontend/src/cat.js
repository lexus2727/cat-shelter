const catFormFields = `
<label><strong>Name: </strong></label><br/>
    <input type="text" id="name"><br/>
    <input type="hidden" id="catId">

    <label><strong>Age: </strong></label><br/>
    <input type="integer" id="age"><br/>  

    <label>Sex: </strong></label><br/>
    <input type="text" id="sex"><br/>  

    <label><strong>Description: </strong></label><br/>
    <textarea id="description" rows="3" cols="20"></textarea><br/>

    <label><strong>Status: </strong></label><br/>
    <input type="text" id="status"><br/><br/>`

    class Cat {
        constructor(data) {
            this.id = data.id
            this.name = data.name 
            this.sex = data.sex
            this.age = data.age
            this.description = data.description 
            this.status = data.status
            
            this.events = data.events.sort((a,b) => (a.updated_at < b.updated_at) ? 1 : ((b.updated_at < a.updated_at) ? -1 : 0)); 
        }

        static newCatForm() {
            let newCatFormDiv = document.getElementById('cat-form')
            newCatFormDiv.innerHTML = `
            <form onsubmit="createCat(); return false;">` + 
            catFormFields + 
            `<input type="submit" value="Add New Cat" style="color:white;background-color:green">
            </form>
            <br/>`
        }

        static editCatForm() {
            let editCatFormDiv = document.getElementById('cat-form')
            editCatFormDiv.innerHTML = `
            <form onsubmit="updateCat(); return false;">` + 
            catFormFields + 
            `<input type="submit" value="Update Info">
            </form>
            <br/>`
        }
    
    }

    function getCats() {
        fetch("http://localhost:3000/cats")
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            renderCatsHtml(data)
            addCatsClickListeners()
            addEventsClickListeners()
        })
    }

  // Create new cat
    function createCat() {
        const cat = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            sex: document.getElementById('sex').value,
            description: document.getElementById('description').value,
            status: document.getElementById('status').value,
        }

        fetch("http://localhost:3000/cats", {
        method: 'POST',
        body: JSON.stringify(cat),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(cat => {
         clearCatsHtml()
         getCats()
         Cat.newCatForm()
      });
    
}

// Click on cat's name to view/hide additional info
function showMoreInfo() {
    console.log("this", this)
    console.log(this.parentElement.querySelector('.additional-info'))
    toggleHideDisplay(this.parentElement.querySelector('.additional-info'))
}

// Issue a patch when edit form is submitted
function updateCat() {
    let catId = this.event.target.catId.value

    const cat = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        sex: document.getElementById('sex').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
    }

    fetch(`http://localhost:3000/cats/${catId}`, {
        method: 'PATCH',
        body: JSON.stringify(cat),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(cat => {
         clearCatsHtml()
         getCats()
         Cat.newCatForm()
        });
}

function editCat() {
    let catId = this.parentElement.getAttribute('data-cat-id')

    // Populate the cat form with cat's info
        fetch(`http://localhost:3000/cats/${catId}`)
        .then(resp => resp.json())
        .then(data => {
            Cat.editCatForm()
            let catForm = document.getElementById('cat-form')
            catForm.querySelector('#name').value = data.name 
            catForm.querySelector('#catId').value = data.id 
            catForm.querySelector('#sex').value = data.sex
            catForm.querySelector('#description').value = data.description
            catForm.querySelector('#age').value = data.age
            catForm.querySelector('#status').value = data.status
        })
}

//  delete a cat
function deleteCat() {
    let catId = this.parentElement.getAttribute('data-cat-id')
    
    fetch(`http://localhost:3000/cats/${catId}`, {
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(json => {
          let selectedCat = document.querySelector(`.card[data-cat-id="${catId}"]`) 
          selectedCat.remove()
      })
}

// add clicks
function addCatsClickListeners() {
    document.querySelectorAll('.cat-name').forEach(element => {
       element.addEventListener("click", showMoreInfo)
   })

   document.querySelectorAll('.edit-cat-button').forEach(element => {
       element.addEventListener("click", editCat)
   })

   document.querySelectorAll('.delete-cat-button').forEach(element => {
       element.addEventListener("click", deleteCat)
   })

   document.querySelector('.sort-button').addEventListener("click", sortCats)
   
}

function sortCats() { 

    fetch("http://localhost:3000/cats")
    .then(resp => resp.json())
    .then(data => {

        data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 
        console.log(data)
        clearCatsHtml()
        renderCatsHtml(data)
        addCatsClickListeners()
        addEventsClickListeners()
    })


}

function clearCatsHtml() {
    let catsIndex = document.getElementById("cats-list")
    catsIndex.innerHTML = ''
}

Cat.prototype.catEventsHtml = function () {

	let catEvents = this.events.map(event => {
        let date = parseDate(event.updated_at)

        return (`
        <div class="card" event-id="${event.id}" >
        <i>Last update: </i>${date} <br/>
        <strong>Title: </strong>${event.title} <br/>
        <strong>Description: </strong>${event.description} <br/>
        
        <button class="edit-event-button" style="background-color:orange">Edit Record</button>  
        <button class="delete-event-button" style="background-color:red">Delete Record</button>  
        </div>
		`)
    }).join('')

    return (catEvents)
}

Cat.prototype.catHtml = function () {
     
    return `<div class="card" data-cat-id="${this.id}">
            <button class="view-events-cat-button" style="background-color:blue">View Record</button>  
            <button class="edit-cat-button" style="background-color:orange">Edit Info</button>  
            <button class="delete-cat-button" style="background-color:red">Delete Cat</button>
            </br></br>
            <strong class="cat-name">${this.name}</strong> <br/>
            <strong>Age: </strong>${this.age} years young <br/>
            <strong>Sex: </strong>${this.sex} <br/>
            <strong>Description: </strong>${this.description}<br/>
            <strong>Status: </strong>${this.status}<br/>
            </div>
        </div>` 
}

Cat.prototype.addEventButton = function () {

    let addNewEventButton = document.createElement('button')
    addNewEventButton.className = 'add-event-button'
    addNewEventButton.id = this.id 
    addNewEventButton.innerText = "Add Event"
    addNewEventButton.style.backgroundColor = "green"
     
    return addNewEventButton

}

function renderCatsHtml(data) {
    let catsIndex = document.getElementById("cats-list")

    data.forEach((cat) => {
  
        let eventsIndexHtml = document.createElement('div')
        eventsIndexHtml.className = 'events'
        eventsIndexHtml.style.display = 'none'
        let emptyEventsHtml = eventsIndexHtml
          

        let newCat = new Cat(cat)
        eventsIndexHtml.innerHTML = newCat.catEventsHtml()     
   
        catsIndex.innerHTML += newCat.catHtml() 
   
        let selectedCatHtml = document.querySelector(`.card[data-cat-id="${newCat.id}"]`)           
        selectedCatHtml.append(eventsIndexHtml.childElementCount ? eventsIndexHtml : emptyEventsHtml )
        selectedCatHtml.querySelector('.events').appendChild(newCat.addEventButton())

    });

}


