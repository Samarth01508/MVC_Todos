export default class View {
  constructor() {
    let todos = document.getElementById("To-do-list");

    let task_input_element = document.createElement("input");
    task_input_element.setAttribute("id", "task-input");
    task_input_element.setAttribute("placeholder", "Enter your task");

    let addTaskButton = document.createElement("button");
    addTaskButton.setAttribute("id", "addTask-button");
    addTaskButton.innerHTML = "Add Task";

    let taskDivsContainer = document.createElement("div");
    taskDivsContainer.setAttribute("id", "task-div-container");

    let IncompleteTasksHeading = document.createElement("h3");
    IncompleteTasksHeading.innerText = "Incomplete-Tasks";
    let incompleteTaskList = document.createElement("div");
    incompleteTaskList.setAttribute("id", "Incomplete-task-list");
    let CompletedTasksHeading = document.createElement("h3");
    CompletedTasksHeading.innerText = "Completed-Tasks";
    let completedTaskList = document.createElement("div");
    completedTaskList.setAttribute("id", "Completed-task-list");

    incompleteTaskList.appendChild(IncompleteTasksHeading);
    completedTaskList.appendChild(CompletedTasksHeading);
    taskDivsContainer.appendChild(incompleteTaskList);
    taskDivsContainer.appendChild(completedTaskList);

    todos.appendChild(task_input_element);
    todos.appendChild(addTaskButton);
    todos.appendChild(taskDivsContainer);
  }

  createStatusdiv = (status) => {
    let statusDiv = document.createElement("div");
    statusDiv.setAttribute("id", `${status}-task-list`);
    let statusHeading = document.createElement("h3");
    statusHeading.innerText = `${status}-Tasks:`;
    statusDiv.appendChild(statusHeading);

    return statusDiv;
  };

  addTaskEventListener = (handler) => {
    let addTaskButton = document.getElementById("addTask-button");

    addTaskButton.addEventListener("click", function () {
      let task_input_element = document.getElementById("task-input");
      let taskName = task_input_element.value;

      if (!task_input_element.value) {
        alert("Enter any task");
        return;
      } else {
        handler(taskName);
        task_input_element.value = "";
      }
    });
  };

  createTaskElement = (taskObject, status) => {
    let taskElement = document.createElement("li");
    taskElement.setAttribute("id", taskObject.id);

    let tasknameAndEditSpan = document.createElement("span");
    tasknameAndEditSpan.setAttribute("class", "task-name-span");
    this.createLabelAndEditElement(tasknameAndEditSpan, taskObject.taskName);
    let removeButton = this.createRemoveButton();
    let statusButton = this.createStatusButton(status);
    taskElement.appendChild(tasknameAndEditSpan);
    taskElement.appendChild(removeButton);
    taskElement.appendChild(statusButton);

    return taskElement;
  };

  markTaskIncomplete = (taskObject) => {
    let taskElement = this.createTaskElement(taskObject, "Complete");
    let incompleteTaskList = document.getElementById("Incomplete-task-list");
    incompleteTaskList.appendChild(taskElement);
    return;
  };

  markTaskComplete = (taskObject) => {
    let taskElement = this.createTaskElement(taskObject, "Incomplete");
    let completedTaskList = document.getElementById("Completed-task-list");
    completedTaskList.appendChild(taskElement);
    return;
  };

  createLabelAndEditElement = (spanElement, taskName) => {
    let taskLabelElement = document.createElement("label");
    taskLabelElement.innerHTML = taskName;
    taskLabelElement.setAttribute("class", "task-name-label");
    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.setAttribute("class", "edit-btn");
    spanElement.appendChild(taskLabelElement);
    spanElement.appendChild(editButton);
  };

  editTaskNameEventListener = () => {
    let divContainer = document.getElementById("task-div-container");
    divContainer.addEventListener("click", (event) => {
      if (event.target.className == "edit-btn") {
        let taskElement = event.target.parentElement.parentElement;
        let taskid = taskElement.id;
        let labelAndEditSpan = taskElement.querySelector("span.task-name-span");
        let editBtn = taskElement.querySelector(
          "span.task-name-span button.edit-btn"
        );
        let labelElement = taskElement.querySelector(
          "span.task-name-span label.task-name-label"
        );
        let taskName = labelElement.innerHTML;
        editBtn.remove();
        labelElement.remove();
        this.createInputAndSaveElement(labelAndEditSpan, taskName);
      }
    });
  };

  createInputAndSaveElement = (spanElement, taskName) => {
    let inputElement = document.createElement("input");
    inputElement.setAttribute("class", "task-edit-input");
    inputElement.value = taskName;
    let saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save";
    saveBtn.setAttribute("class", "save-btn");
    spanElement.appendChild(inputElement);
    spanElement.appendChild(saveBtn);
    inputElement.focus();
  };

  saveTaskNameEventListener = (saveTaskNameHandler) => {
    let divContainer = document.getElementById("task-div-container");
    divContainer.addEventListener("click", (event) => {
      if (event.target.className == "save-btn") {
        let taskElement = event.target.parentElement.parentElement;
        let taskid = taskElement.id;
        let inputAndSaveSpan = taskElement.querySelector("span.task-name-span");
        let saveBtn = taskElement.querySelector(
          "span.task-name-span button.save-btn"
        );
        let inputElement = taskElement.querySelector(
          "span.task-name-span input.task-edit-input"
        );
        let newTaskName = inputElement.value;
        saveBtn.remove();
        inputElement.remove();
        this.createLabelAndEditElement(inputAndSaveSpan, newTaskName);
        saveTaskNameHandler(taskid, newTaskName);
      }
    });
  };

  createRemoveButton = () => {
    let removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove-btn");
    removeButton.innerHTML = "Remove";
    return removeButton;
  };

  removeEventListener = (removeTaskHandler) => {
    let divContainer = document.getElementById("task-div-container");
    divContainer.addEventListener("click", (event) => {
      if (event.target.className == "remove-btn") {
        let taskid = event.target.parentElement.id;
        removeTaskHandler(taskid);
      }
    });
  };

  createStatusButton = (status) => {
    let statusButton = document.createElement("button");
    statusButton.innerHTML = status;
    statusButton.setAttribute("class", `${status}-btn`);
    return statusButton;
  };

  statusButtonEventListener = (statusHandler) => {
    let divContainer = document.getElementById("task-div-container");
    divContainer.addEventListener("click", (event) => {
      if (event.target.className == "Complete-btn") {
        let taskId = event.target.parentElement.id;
        statusHandler(taskId, 1);
      } else if (event.target.className == "Incomplete-btn") {
        let taskId = event.target.parentElement.id;
        statusHandler(taskId, 0);
      }
    });
  };

  emptyDivs = () => {
    let incompleteDiv = document.getElementById("Incomplete-task-list");
    let completedDiv = document.getElementById("Completed-task-list");
    while (incompleteDiv.firstChild) {
      incompleteDiv.removeChild(incompleteDiv.firstChild);
    }
    while (completedDiv.firstChild) {
      completedDiv.removeChild(completedDiv.firstChild);
    }
    let incompleteTaskHeading = document.createElement("h3");
    incompleteTaskHeading.innerText = "Incomplete-tasks";
    incompleteDiv.appendChild(incompleteTaskHeading);
    let completedTasksHeading = document.createElement("h3");
    completedTasksHeading.innerText = "Completed-tasks";
    completedDiv.appendChild(completedTasksHeading);
    return;
  };
}
