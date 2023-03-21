export default class Controller {
  constructor(model) {
    this.model = model;
  }

  binddisplayTodo = (displayTasks,emptyDivs) => {
    this.displayTasks = displayTasks;
    this.emptyDivs=emptyDivs;
  };

  displayTodo = () => {
    this.emptyDivs();
    for (let i in this.model.taskList) {
      this.displayTasks(this.model.taskList[i]);
    }
  };

  handleAddTask = (taskName) => {
    this.model.addTask(taskName);
  };

  handleRemoveTask = (taskId) => {
    this.model.removeTask(taskId);
  };

  handleChangeTaskStatus = (taskId, newStatus) => {
    this.model.changeTaskStatus(taskId, newStatus);
  };

  handleSaveTaskName = (taskId, newTaskName) => {
    this.model.saveTaskName(taskId, newTaskName);
  };
}
