import View from "../view/view.js";
import Model from "../model/model.js";
//localStorage.clear();
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.displayTodo(this.model.taskList);
    this.model.onChangeInTodos(this.displayTodo);
    this.view.addTaskEventListener(this.handleAddTask);
    this.view.removeEventListener(this.handleRemoveTask);
    this.view.statusButtonEventListener(this.handleChangeTaskStatus);
    this.view.editTaskNameEventListener();
    this.view.saveTaskNameEventListener(this.handleSaveTaskName);
  }

  displayTodo = (taskList) => {
    this.view.emptyDivs();
    for (let i in taskList) {
      if (taskList[i].status == 0) this.view.markTaskIncomplete(taskList[i]);
      else this.view.markTaskComplete(taskList[i]);
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

const todo_app = new Controller(new Model(), new View());
