class List {
  // your code here
  constructor(title){
    this.title = title
    this.tasks = [];
  }

  render(){
    return `
    <div id="${this.title}">
      <h2>${this.title}<button id="button-${this.title}" onclick="deleteList(this)">X</button></h2>
    </div>
    `
  }

  renderTasks(newTask){
    const taskListDiv = document.getElementById(this.title);
    taskListDiv.appendChild(newTask.render());
  }
}
