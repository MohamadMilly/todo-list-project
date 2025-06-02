import {database} from "./storage.js";
import {storageService} from "./storage.js";



class project {
    constructor(projectTitle) {
        
        this.projectTitle = projectTitle;
        this.tasks = [];
    }
     deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.getId() !== id);
      database.save();
     }
     
     
     edit(newprojectTitle) {
     this.projectTitle = newprojectTitle;
     database.save();
     }

     addTask(task) {
      this.tasks.push(task);
      database.save();
      
     }
     
    }
    
   function editTaskInfo(projectTitle,taskId,taskTitle,description,important,date) {
     const index = getProjectIndex(projectTitle);
     let editedTask = database.getDataBase()[index].tasks.find(task => task.getId() === taskId);
       
     editedTask.editTask(taskTitle,description,important,date);
    database.save();
   }
     
  class task {
  static IdCounter = localStorage.getItem("taskIdCounter") 
                      ? JSON.parse(localStorage.getItem("taskIdCounter")) 
                      : 0;
                      
  #id;
  
  constructor(title, description, important, date) {
    this.#id = task.IdCounter++;
    localStorage.setItem("taskIdCounter",task.IdCounter); 
    
    this.title = title;
    this.description = description;
    this.completed = false;
    this.important = important;
    this.date = date;
  }

  toggleComplete() {
    this.completed = !this.completed;
    database.save();

  }

  editTask(newTitle, newDescription, newImportant, newDate) {
    this.title = newTitle;
    this.description = newDescription;
    this.important = newImportant;
    this.date = newDate;
  }

  getId() {
    return this.#id;
  }
}





function setProjectInfo(projectTitle) {
  const Newproject = new project(projectTitle);
  database.addProject(Newproject);
  
 }
 

 
 

 function setTaskInfo(projectTitle,taskTitle,description,important,date) {
    const index = database.getProjectIndex(projectTitle);
    database.getDataBase()[index].tasks.push(new task(taskTitle,description,important,date));
    database.save();
   
    
    
 }
 


 

 







function completed(data) {
 return data.map(project => ({
    projectTitle: project.projectTitle,
    tasks: project.tasks.filter(task => task.completed)
  }));
}


function uncompleted(data) {
 
  return data.map(project => ({
    projectTitle: project.projectTitle,
    tasks: project.tasks.filter(task => !task.completed)
  }));
}




function important(data) {
  return data.map(project => ({
    projectTitle: project.projectTitle,
    tasks: project.tasks.filter(task => task.important)
  }));
}

const currentDate = new Date();

function overdue(data) {
    return data.map(project => ({
        projectTitle: project.projectTitle,
        tasks: project.tasks.filter(task => {
            const taskDate = new Date(task.date);
            return currentDate > taskDate && !task.completed;
        })
    }));
}


function upComing(data) {
    return data.map(project => ({
        projectTitle: project.projectTitle,
        tasks: project.tasks.filter(task => {
            const taskDate = new Date(task.date); 
            return taskDate > currentDate && !task.completed;
        })
    }));
}


function getProjectIndex(projectTitle) {
    for(let x in database.getDataBase()) {
       if(database.getDataBase()[x].projectTitle === projectTitle) {
        return x;
       }
    
    }
 }


 



export {completed,uncompleted,important,overdue,upComing};

export {project , task };
export {getProjectIndex};
export {setProjectInfo,setTaskInfo}
export {editTaskInfo};


if (!localStorage.getItem("Projects")) {
    
    const project1 = new project("Ordinary routine");
    database.addProject(project1);

    const task1 = new task("Studying", "Studying Maths for 2 hours", false, "2025-2-15");
    project1.addTask(task1);

  
    database.save();
}















