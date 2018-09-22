const store = { lists: [], tasks: [] }
document.addEventListener('DOMContentLoaded', () => {
  // your solution here
  // grab DOM elements
  const listDiv = document.getElementById("lists");
  const listForm = document.getElementById("create-list-form");
  const taskForm = document.getElementById("create-task-form");

  listForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = e.target.querySelector("#new-list-title").value;
    const isTitleUnique = store.lists.find( (taskList) => taskList.title === userInput) ? false : true;
    if(isTitleUnique){
      const taskList = new List(userInput);
      const taskListElement = document.createElement("option")
      taskListElement.value = taskList.title;
      taskListElement.innerText = taskList.title;
      store.lists.push(taskList);
      listDiv.innerHTML += taskList.render();
      taskForm.style.display = 'block';
      taskForm.querySelector('option').innerText = taskList.title
      taskForm.querySelector('option').value = taskList.title
      taskForm.querySelector('option').selected = true;
      if(store.lists.length > 0){
        taskForm.querySelector('select').appendChild(taskListElement);
      }
    } else {
      alert("List titles must be unique");
    }
  });

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userSelect = document.getElementById("parent-list").value
    const taskDescription = document.getElementById("new-task-description").value;
    let taskPriority = document.getElementById("new-task-priority").value;
    const taskList = store.lists.find( (list) => {
      return list.title === userSelect
    });
    const isDescUnique = taskList.tasks.find( (task) => task.description === taskDescription) ? false : true;
    if(isDescUnique){
      if(!taskPriority){
        taskPriority = 'low';
      }
      const newTask = new Task(taskDescription, taskPriority, taskList.title);
      store.tasks.push(newTask);
      taskList.tasks.push(newTask);
      taskList.renderTasks(newTask);
    } else {
      alert("Task Descriptions must be unique.");
    }
  });

});

function deleteList(button){
  const taskForm = document.getElementById("create-task-form");
  const taskListTitle = button.id.split("-")[1];
  const foundTaskList = store.lists.find( (taskList) => taskList.title === taskListTitle);
  const taskListDiv = document.getElementById(taskListTitle);
  taskListDiv.parentNode.removeChild(taskListDiv);
  if(foundTaskList.tasks.length !== 0){
    for(let i = 0; i < store.tasks.length; i++){
      if(store.tasks[i].listTitle === foundTaskList.title){
        store.tasks.splice(store.tasks[i], 1);
      }
    }
  }
  store.lists.splice(store.lists.indexOf(foundTaskList), 1);
  if(store.lists.length === 0){
    taskForm.style.display = 'none';
  }
}

function deleteTask(button){
  const taskDesc = button.id.split("-")[1];
  const foundTaskList = store.lists.find( (taskList) => taskList.title === button.parentElement.parentElement.parentElement.id);
  const foundTask = foundTaskList.tasks.find( (task) => task.description === taskDesc);
  const taskDisplay = document.getElementById(taskDesc);
  taskDisplay.parentNode.removeChild(taskDisplay);
  foundTaskList.tasks.splice(foundTaskList.tasks.indexOf(foundTask), 1);
  if(!foundTaskList){
    foundTaskList = [];
  }
}
