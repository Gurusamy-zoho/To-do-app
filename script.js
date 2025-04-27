
// function addTasks() {
//   let input = document.getElementById("input-box").value.trim(); 

//   if (input === '') {
//      showBox("Enter a task")
//       return;
//   }

//   if (localStorage.getItem(input)) {
//       showBox("Task already exists.");
//       return;
//   }

//   localStorage.setItem(input, input);

  

//   let editIcon = document.createElement('span')
//   editIcon.classList.add('editIcon')
//   editIcon.innerHTML=`<i class="fas fa-edit"></i>`;
  
//   let li = document.createElement('li');
//   li.textContent = input;

//   let span = document.createElement('span');
//   span.classList.add('delete');
//   span.innerHTML = `<p>&times;</p>`;
//   span.addEventListener('click', (e) => {
//       localStorage.removeItem(input); 
//       e.stopPropagation(); 
//       li.remove();
//   });

//   editIcon.addEventListener('click',(e)=>{
//     showUpdateBox(li,input)
//   })
  

//   li.appendChild(editIcon);
//   li.appendChild(span);
//   document.querySelector('ul').appendChild(li);

//   li.addEventListener('click', () => {
//       li.classList.toggle('checked');
//   });

//   document.getElementById("input-box").value = "";
// }

// function loadTasksFromLocalStorage() {
//     let Tasks = [];

//     for (let i = 0; i < localStorage.length; i++) {
//         let taskKey = localStorage.key(i);  
//         let taskValue = localStorage.getItem(taskKey);  

//         Tasks.push({ key: taskKey, name: taskValue });
//     }

//     Tasks.forEach(task => {
//         let li = document.createElement('li');
//         li.textContent = task.name;

//         let editIcon = document.createElement('span');
//         editIcon.classList.add('editIcon');
//         editIcon.innerHTML = `<i class="fas fa-edit"></i>`;

//         let span = document.createElement('span');
//         span.classList.add('delete');
//         span.innerHTML = `<p>&times;</p>`;

//         span.addEventListener('click', (e) => {
//             e.stopPropagation();
//             localStorage.removeItem(task.name); 
//             li.remove();
//         });

//         editIcon.addEventListener('click', (e) => {
//             e.stopPropagation();
//             showUpdateBox(li, task.name);
//         });

//         li.appendChild(editIcon);
//         li.appendChild(span);
//         document.querySelector('ul').appendChild(li);

//         li.addEventListener('click', () => {
//             li.classList.toggle('checked');
//         });
//     });
// }


// window.onload = function() {
//   loadTasksFromLocalStorage();
// };

// function showBox(msg) {
//     document.getElementById("alert-msg").innerText=msg
//     document.getElementById("topBox").classList.add("show");
//     return;
//   }

//   function hideBox() {
//     document.getElementById("topBox").classList.remove("show");
//   }

//   let currentEditLi = null;
//   let currentOldTaskName = "";

//   function showUpdateBox(liElement,oldTaskName){
//     currentEditLi = liElement;
//     currentOldTaskName = oldTaskName;
//     document.getElementById("promiseBox").classList.add("showUpdateBox");
//     return;
//   }


// function hideUpdateBox() {
//     let updatedInput = document.getElementById("updated-input-box").value.trim();

//     if (updatedInput === "") {
//         document.getElementById("update-Error").innerHTML = "<p>Enter a task name</p>";
//         document.getElementById("update-Error").classList.add("update-Error");
//         return;
//     } else if (localStorage.getItem(updatedInput)) {
//         document.getElementById("update-Error").innerHTML = "<p>Already this task exists</p>";
//         document.getElementById("update-Error").classList.add("update-Error");
//         return;
//     } else {
//         localStorage.removeItem(currentOldTaskName);
//         localStorage.setItem(updatedInput, updatedInput);

//         currentEditLi.childNodes[0].textContent = updatedInput;

//         document.getElementById("promiseBox").classList.remove("showUpdateBox");
//         document.getElementById("updated-input-box").value = "";
//         document.getElementById("update-Error").innerHTML = "";
//     }
// }



//   function cancelUpdatedBox(){
//     document.getElementById("promiseBox").classList.remove("showUpdateBox");
//   }

let tasks = [];

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = storedTasks;

    tasks.forEach(task => {
        createTaskElement(task.name, task.isCompleted);
    });
}

function createTaskElement(name, isCompleted = false) {
    let li = document.createElement('li');
    li.textContent = name;

    if (isCompleted) {
        li.classList.add('checked');
    }

    let editIcon = document.createElement('span');
    editIcon.classList.add('editIcon');
    editIcon.innerHTML = `<i class="fas fa-edit"></i>`;

    let span = document.createElement('span');
    span.classList.add('delete');
    span.innerHTML = `<p>&times;</p>`;

    span.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(name);
        li.remove();
    });

    editIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        showUpdateBox(li, name);
    });

    li.appendChild(editIcon);
    li.appendChild(span);
    document.querySelector('ul').appendChild(li);

    li.addEventListener('click', () => {
        li.classList.toggle('checked');
        toggleTaskCompleted(name);
    });
}

function addTasks() {
    let input = document.getElementById("input-box").value.trim();

    if (input === '') {
        showBox("Enter a task");
        return;
    }

    if (tasks.find(task => task.name === input)) {
        showBox("Task already exists.");
        return;
    }

    const newTask = { name: input, isCompleted: false };
    tasks.push(newTask);
    saveTasksToLocalStorage();
    createTaskElement(input);

    document.getElementById("input-box").value = "";
}

function deleteTask(taskName) {
    tasks = tasks.filter(task => task.name !== taskName);
    saveTasksToLocalStorage();
}

function toggleTaskCompleted(taskName) {
    tasks.forEach(task => {
        if (task.name === taskName) {
            task.isCompleted = !task.isCompleted;
        }
    });
    saveTasksToLocalStorage();
}

function updateTask(oldName, newName) {
    const task = tasks.find(task => task.name === oldName);
    if (task) {
        task.name = newName;
    }
    saveTasksToLocalStorage();
}

function showBox(msg) {
    document.getElementById("alert-msg").innerText = msg;
    document.getElementById("topBox").classList.add("show");
    return;
}

function hideBox() {
    document.getElementById("topBox").classList.remove("show");
    return;
}

let currentEditLi = null;
let currentOldTaskName = "";

function showUpdateBox(liElement, oldTaskName) {
    currentEditLi = liElement;
    currentOldTaskName = oldTaskName;
    document.getElementById("promiseBox").classList.add("showUpdateBox");
    return;
}

function hideUpdateBox() {
    let updatedInput = document.getElementById("updated-input-box").value.trim();

    if (updatedInput === "") {
        document.getElementById("update-Error").innerHTML = "<p>Enter a task name</p>";
        document.getElementById("update-Error").classList.add("update-Error");
        document.getElementById("updated-input-box").classList.add("update-error-input");
        return;
    } else if (tasks.find(task => task.name === updatedInput)) {
        document.getElementById("update-Error").innerHTML = "<p>Already this task exists</p>";
        document.getElementById("update-Error").classList.add("update-Error");
        document.getElementById("updated-input-box").classList.add("update-error-input");
        return;
    } else {
        updateTask(currentOldTaskName, updatedInput);

        currentEditLi.childNodes[0].textContent = updatedInput;
        document.getElementById("promiseBox").classList.remove("showUpdateBox");
        document.getElementById("updated-input-box").value = "";
        document.getElementById("update-Error").innerHTML = "";
    }
    return;
}

function cancelUpdatedBox() {
    document.getElementById("promiseBox").classList.remove("showUpdateBox");
}

window.onload = function () {
    loadTasksFromLocalStorage();
};
