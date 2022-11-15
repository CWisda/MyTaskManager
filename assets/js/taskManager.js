const createTaskHtml = (id, name, description, assignedTo, date, status) => {

    const html = `   
    <li class="list-group-item" data-task-id=${id}>
    <div class="card bg-light" style="width: 18rem">
       <div class="card-body">
         <div class="row">
         <h5 class="col-sm-8 card-title">${name}</h5>
         <a href="#" class="col-sm-4 card-link btn btn-primary">${status}</a>
         </div>
         <p class="card-text fw-bold">${assignedTo}</p>
         <p class="card-text fw-bold">${date}</p>
         <h6 class="card-subtitle mb-2 text-muted">Description</h6>
         <p class="card-text">${description}</p>
         </div>
         <br>
         <div class="d-flex justify-content-end mb-3 mx-1">
         <a href="#" class="done-button card-link btn btn-success">Complete</a>
         <a href="#" class="card-link btn btn-danger">Delete</a>
         </div>
       </div>
     </div>
</li> 
`
return html
}

class TaskManager {
    constructor(currentId) {
        this.tasks = [];
        this.currentId = 0;
    } 
    addTask(name, description, assignedTo, dueDate, status) {
        const task = {
           id: this.currentId++,
           name: name,
           description: description,
           assignedTo: assignedTo,
           dueDate: dueDate,
           status: 'TODO'
    };
    this.tasks.push(task)
}
render() {
    let tasksHtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
        let currentTask = this.tasks[i];
        const currentDate = new Date(this.tasks[i].dueDate);
        let formattedDate = currentDate.toDateString();
        let taskHtml = createTaskHtml(
            this.tasks[i].id,
            this.tasks[i].name, 
            this.tasks[i].description, 
            this.tasks[i].assignedTo, 
            formattedDate, 
            this.tasks[i].status
        );
        tasksHtmlList.push(taskHtml);
    }
    const tasksHtml = tasksHtmlList.join('\n');
    const taskList = document.getElementById('taskList'); // add id to ul //
    taskList.innerHTML = tasksHtml;

}
getTaskById(taskId) {
    let foundTask = taskId; 
    for (let i = 0; i < this.tasks.length; i++) {
    let task = this.tasks[i];
    if (task.id === taskId) {
        foundTask = task;
    }
} 
    return foundTask;
}
save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
    const currentId = JSON.stringify(this.currentId);
    localStorage.setItem('currentId', currentId);
}
load() {
    const tasksJson = localStorage.getItem('tasks');
    this.tasks = JSON.parse(tasksJson);
    const currentId = localStorage.getItem('currentId');
    this.currentId = Number(currentId);   
}
deleteTask(taskId) {
    let newTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
        let task = this.tasks[i];
        if (task.id != taskId) {
            newTasks.push(task)
        }
    }
        this.tasks = newTasks;
}
}