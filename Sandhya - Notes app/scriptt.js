let titleValue = document.querySelector('.title')

const descriptionvalue = document.querySelector('.description')

const addButton = document.querySelector('.add')

const toDo = document.querySelector('.toDo')

const redBtn = document.querySelector('.red')

const container = document.querySelector('.container')

const form = document.querySelector('.form')
const addAndUpdateBtn = document.querySelector(".add")
// console.log(addAndUpdateBtn)

let addBtnId = "";

toDo.addEventListener('click', (e) => {
  form.style.display = "block"
  container.style.filter = "blur(100px)"
})

redBtn.addEventListener('click', () => {
  form.style.display = "none"
  container.style.filter = "blur(0px)"
})

fetch('http://localhost:3000/notes')
  .then(jsonVal => jsonVal.json())
  .then(allValues => {
    for (let i = 0; i < allValues.length; i++) {
      //here i created all the needed divs and lis
      let mainDiv = document.createElement('div')
      let firstDiv = document.createElement('div')
      let secondDiv = document.createElement('div')
      let thirddDiv = document.createElement('div')
      let thirdmainDiv = document.createElement('div')
      let title = document.createElement('li')
      let description = document.createElement('li')
      let date = document.createElement('li')
      let line = document.createElement('div')
      let more = document.createElement('img')

      //here i added attributes(classess and ids) to needed one
      mainDiv.setAttribute('class', 'notes')
      title.setAttribute('class', 'title')
      description.setAttribute('class', 'description')
      date.setAttribute('class', 'date')
      line.setAttribute('class', 'line')
      more.setAttribute('class', 'moreicon')
      thirddDiv.setAttribute('class', "thirddDiv")
      thirdmainDiv.setAttribute('class', "thirdmainDiv")

      //here i inserted the innertext and src to the needed
      title.innerText = `Title: ${allValues[i].title}`
      description.innerText = `Description:  ${allValues[i].description}`
      const d = new Date()
      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      date.innerText = `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
      more.src = 'dots.png'

      //here i appended all the things into div
      firstDiv.append(title)
      firstDiv.append(description)
      secondDiv.append(line)
      thirddDiv.append(date)
      thirddDiv.append(more)
      mainDiv.append(firstDiv)
      mainDiv.append(secondDiv)
      thirdmainDiv.append(thirddDiv)
      mainDiv.append(thirdmainDiv)
      container.append(mainDiv)
      //here i added event for more button for delete and edit
      //  
      //here i created all the needed divs and lis
      const moreDiv = document.createElement('div')
      const editBtn = document.createElement('button')
      const deleteBtn = document.createElement('button')

      //here i added attributes(classess and ids) to needed one
      editBtn.setAttribute('class', "editBtn")
      deleteBtn.setAttribute('class', "deleteBtn")
      moreDiv.setAttribute('class', "morediv")

      //here i inserted the innertext and src to the needed
      editBtn.innerText = "edit"
      deleteBtn.innerText = "delete"

      //here i added value for delete and edit button for do the tasks
      deleteBtn.setAttribute("id", allValues[i].id)
      editBtn.setAttribute("id", allValues[i].id)

      //here i apped the things
      moreDiv.append(editBtn)
      moreDiv.append(deleteBtn)
      thirddDiv.append(moreDiv)

      more.addEventListener('click', () => {
        moreDiv.classList.toggle("active")
      })

      window.addEventListener("click", (e) => {
        if (e.target === container) {
          moreDiv.classList.remove("active")
        }
      })

      deleteBtn.addEventListener("click", (e) => deleteLogic(e))

      editBtn.addEventListener("click", (e) => editLogic(e))
    }
  })
  
addAndUpdateBtn.addEventListener("click", (e) => getAndPutLogic())

function deleteLogic(e) {
  let deleteVal = e.target.id
  fetch(`http://localhost:3000/notes/${deleteVal}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: null
  })
    .then(jsonVal => jsonVal.json())
    .then(allValues => console.log(allValues))
    .catch(err => console.log(err))
}


function editLogic(e) {
  let editVal = e.target.id
  addBtnId = e.target.id;
  form.style.display = "block"
  container.style.filter = "blur(100px)"

  addButton.innerText = "UPDATE"

  fetch(`http://localhost:3000/notes/${editVal}`)
    .then(jsonVal => jsonVal.json())
    .then(allValues => {
      titleValue.value = allValues.title
      descriptionvalue.value = allValues.description
    })
    .catch(err => console.log(err))
}



function getAndPutLogic() {
  if (titleValue.value == "" || descriptionvalue.value == "") {
    alert('please insert value')
  }
  else {

    let fetchLink = addBtnId === "" ? 'http://localhost:3000/notes' : 'http://localhost:3000/notes/' + addBtnId
    fetch(fetchLink, {
      method: addBtnId === "" ? "POST" : "PUT",
      body: JSON.stringify({
        title: titleValue.value,
        description: descriptionvalue.value
      }),
      headers: {
        'Content-Type': 'application/json',
      },

    })
      .then(jsonVal => jsonVal.json())
      .then(allValues => console.log(allValues))
      .catch(err => console.log(err))

  }
}

