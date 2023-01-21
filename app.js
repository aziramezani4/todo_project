let animals = []


function addItem(value) {
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify(
            {
                id: Math.floor(Math.random()*1000)+1,
                text: value,
                completed: false
            }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            animals.push(json)
            renderList(animals)
        });


}

function updateItem(item){
    fetch(`http://localhost:3000/todos/${item.id}`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then(
            (json) => 
           document.getElementById('id02').style.display='none',
        //     // console.log(animals),
        renderList(animals)
        )
}


fetch('http://localhost:3000/todos')
    .then(response => response.json())
    .then((json) => {
        // debugger;
        animals = json
        renderList(animals)
    });

const addBtn = document.getElementById("add")

addBtn.addEventListener('click', add)

function add() {
    const inputElem = document.getElementById('todoInput')
    const inputValue = inputElem.value
    const isDuplicated = animals.filter((item) => {
        if (item.text === inputValue) {
            return item;
        }
    });
    if (isDuplicated.length > 0) {
        alert(`"${inputValue}"item is duplicated`)
    } else {
        addItem(inputValue)
    }

    inputElem.value = "";
    renderList(animals)
}

function renderList(animalsArray) {
    let list = ``;

    animalsArray.forEach((animal) => {
        // console.log(animal.text)
        list =
            list +
            `<li style="list-style:none;font-size:30px;" data-id="${animal.id}" class="${animal.completed ? "marked" : "notmarked"}">${animal.text}
            <div style="width: 20%;border-radius: 10px;
            margin: 0 auto;display: inline;"> <button style="width: 20%;border-radius: 10px;
     margin: 5 auto;display: inline;" onclick="editfunc('${animal.id}')">Edit</button>
     <button style="width: 20%;border-radius: 10px;
     margin: 5 auto;background-color:red;display: inline;" onclick="deletefunc('${animal.id}')">Delete</button></li></div>`

    })
    document.getElementById('todoList').innerHTML = list
}
{/* <button data-id="${animal.id}">Edit</button>   */}
    //  <button data-id="${animal.id}">delete</button></li>
function deletefunc(id){
  let btn1 = document.getElementById('id01').style.display='block';
           fetch(`http://localhost:3000/todos/${id}`,{
            method:'DELETE'
          }) 
          .then((json) => {
            var f;
            var filteredElements = animals.filter(function(item, id) { f = id; return item.id == id; });
            animals.splice(f, 1)
            renderList(animals)
          });
          
}
function editfunc(id){
    let btn1 = document.getElementById('id02').style.display='block';
    const editArrayItem = animals.filter((item) => {
        if (item.id == id) {
           currentUpdateItem = item;
            return item;
        }
    });
    const editValue = editArrayItem[0].text

    document.getElementById(
        "id02"
    ).innerHTML = `<input type="text" id="todoUpdateInput" 
         value="${editValue}" placeholder="update"/>
    <button style="width: 20%;border-radius: 10px;" id="update">Update</button>`;

    const todoUpdateInput = document.getElementById("todoUpdateInput")
    const updateBtn = document.getElementById('update')

    updateBtn.addEventListener('click', function () {
        currentUpdateItem.text = todoUpdateInput.value
        updateItem(currentUpdateItem)
    });
  }

document.body.addEventListener("click", (e) => {
    if (e.target.tagName === 'LI') {
        const id = e.target.getAttribute("data-id")
        animals.map(item => {
            if (item.id == id) {
                item.completed = true
                return item
            } else {
                return item
            }
        })
        renderList(animals)
    } else if (e.target.tagName === "BUTTON") {
        const id = e.target.getAttribute("data-id");
        let currentUpdateItem = {};
        if (e.target.innerHTML === "Edit") {
            const editArrayItem = animals.filter((item) => {
                if (item.id == id) {
                   currentUpdateItem = item;
                    return item;
                }
            });
            const editValue = editArrayItem[0].text

            document.getElementById(
                "inputContainer"
            ).innerHTML = `<input type="text" id="todoUpdateInput"
                 value="${editValue}" placeholder="update"/>
            <button id="update">Update</button>`;

            const todoUpdateInput = document.getElementById("todoUpdateInput")
            const updateBtn = document.getElementById('update')

            updateBtn.addEventListener('click', function () {
                currentUpdateItem.text = todoUpdateInput.value
                updateItem(currentUpdateItem)
                // animals = animals.map((item) => {
                //     if (item.id == id) {
                //         item.text = todoUpdateInput.value
                //         return item;
                //     } else {
                //         return item;
                //     }
                // });

            });
        } else if (e.target.innerHTML === "delete") {
    
            onclick="document.getElementById('id01').style.display='block'"
        //   fetch(`http://localhost:3000/todos/${id}`,{
        //     method:'DELETE'
        //   });
        }
        renderList(animals);
    } else {
        console.log("you are not clicked on li")
    }
})

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
