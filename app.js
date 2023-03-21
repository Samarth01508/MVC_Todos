import View from "./view/view.js";
import Model from "./model/model.js";
import Controller from "./controller/controller.js";
//localStorage.clear();

class todosApp{
    constructor(controller,model,view){
        this.controller=controller;
        this.model=model;
        this.view=view;
        this.controller.binddisplayTodo(this.view.displayTasks,this.view.emptyDivs);
        this.model.onChangeInTodos(this.controller.displayTodo);
        this.controller.displayTodo();
        this.view.addTaskEventListener(this.controller.handleAddTask);
        this.view.removeEventListener(this.controller.handleRemoveTask);
        this.view.statusButtonEventListener(this.controller.handleChangeTaskStatus);
        this.view.editTaskNameEventListener();
        this.view.saveTaskNameEventListener(this.controller.handleSaveTaskName);
    }
}
const model=new Model();
const controller=new Controller(model);
const view=new View();
const app=new todosApp(controller,model,view);