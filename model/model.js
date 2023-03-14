export default class Model {
  constructor() {
    this.taskList = {};
    this.localStorageTasks=JSON.parse(localStorage.getItem('localStorageTasks'));
    if(this.localStorageTasks)
        this.taskList=this.localStorageTasks;
  }

  addTask = (taskName) => {
    let taskObj = this.createTaskObject(taskName);
    let taskID = taskObj.id;
    this.taskList[taskID] = taskObj;
    this.commitChange(this.taskList);
    return;
  };

  createTaskObject(taskName) {
    return {
      taskName: taskName,
      id: Date.now(),
      status: 0,
    };
  }

  onChangeInTodos = (callback) => {
    this.displayTodo = callback;
  };

  removeTask(taskId) {
    delete this.taskList[`${taskId}`];
    this.commitChange(this.taskList);
  }

  changeTaskStatus(taskId,newTaskStatus){
    this.taskList[taskId].status=newTaskStatus;
    this.commitChange(this.taskList);
  }

  saveTaskName(taskId,newTaskName){
    this.taskList[taskId].taskName=newTaskName;
    this.commitChange(this.taskList);
  }

  commitChange(taskList){
    this.displayTodo(taskList);
    localStorage.setItem('localStorageTasks', JSON.stringify(taskList))
  }
}
