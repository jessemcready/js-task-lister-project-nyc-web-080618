class Task {
  // your code here
  constructor(description, priority="low", listTitle){
    this.description = description
    this.priority = priority
    this.listTitle = listTitle;
  }

  render(){
    let taskElement = document.createElement('span');
    taskElement.id = this.description;
    taskElement.innerHTML = `<p>Description: ${this.description}</p><p>Priority: ${this.priority}<button id="taskButton-${this.description}" onclick="deleteTask(this)">X</button></p><hr>`
    return taskElement;
  }
}
