// dialogs 

import './styles.css';
import { showDialog , closeDialog , toggleStar } from "./UI.js";
import {project , task, uncompleted} from "./todo.js";
import { ShowProjects , showTasks , showMainTitle} from "./UI.js";
import {database} from "./storage.js";
import { getProjectIndex } from "./todo.js";
import { setProjectInfo , setTaskInfo } from "./todo.js";
import { editTaskInfo } from "./todo.js";


  import { upComing } from "./todo.js";

import { overdue } from "./todo.js";


import {important} from "./todo.js";
import { storageService } from "./storage.js";

import {completed} from "./todo.js";





const todosContainer = document.querySelector(".todos-container");

function restore() {
    const stored = localStorage.getItem("Projects");

    // Check if there is stored data
    if (!stored) {
        console.warn("No stored projects found.");
        return;
    }

    let storedData;
     
        storedData = JSON.parse(stored);

      


    
    database.dataBase = [];
     
    storedData.forEach(projectData => {
        if (!projectData || !projectData.projectTitle) {
            console.warn("Skipping invalid project entry:", projectData);
            return;
        }

        const newProject = new project(projectData.projectTitle);
        
        if (Array.isArray(projectData.tasks)) {
            projectData.tasks.forEach(taskData => {
                if (!taskData || !taskData.title) {
                    console.warn("Skipping invalid task entry:", taskData);
                    return;
                }

                const newTask = new task(taskData.title, taskData.description, taskData.important, taskData.date);
                newTask.completed = taskData.completed;
                newProject.tasks.push(newTask);
            });
        }

        database.addProject(newProject);
    });

    
    console.log("Projects and tasks restored successfully!");
}

restore();







const currentSection = (() => {
  let IamInSection;
  return {
    getSection: () => IamInSection,
    moveToSection: (section)=> IamInSection = section
  }
})();


document.addEventListener("DOMContentLoaded", ()=> {
  currentSection.moveToSection(database);
  showMainTitle("Projects");
  ShowProjects(todosContainer,currentSection.getSection());
})








const projectsSectionButton = document.querySelector(".projects-section");
const completedSectionButton = document.querySelector(".completed-section");
const unCompletedSectionButton = document.querySelector(".uncompleted-section");
const importantSectionButton = document.querySelector(".important-section");
const overdueSectionButton = document.querySelector(".overdue-section");
const upComingSectionButton = document.querySelector(".upcoming-section");

projectsSectionButton.addEventListener("click",()=>{
   currentSection.moveToSection(database);
  ShowProjects(todosContainer,database);
  showMainTitle("Projects");
  
})

completedSectionButton.addEventListener("click",()=>{
  const  completedData =new storageService(completed(database.getDataBase()),"Completed");
  currentSection.moveToSection(completedData);
  ShowProjects(todosContainer,completedData);
  showMainTitle("Completed");
})


unCompletedSectionButton.addEventListener("click",()=>{
  const unCompletedData =new storageService(uncompleted(database.getDataBase()),"Uncompleted");
  currentSection.moveToSection(unCompletedData);
  ShowProjects(todosContainer,unCompletedData);
  showMainTitle("Uncompleted");
})

importantSectionButton.addEventListener("click",()=>{
  const importantData =new storageService(important(database.getDataBase()),"Important");
  currentSection.moveToSection(importantData);
  ShowProjects(todosContainer,importantData);
  showMainTitle("Important")
  
})

overdueSectionButton.addEventListener("click",()=>{
  
const overdueData =new storageService(overdue(database.getDataBase()),"Overdue");
currentSection.moveToSection(overdueData);
ShowProjects(todosContainer,overdueData);
showMainTitle("Overdue");
})

upComingSectionButton.addEventListener("click",()=>{
const upComingData =new storageService(upComing(database.getDataBase()),"Upcoming")
currentSection.moveToSection(upComingData);
ShowProjects(todosContainer,upComingData);
  
showMainTitle("Upcoming")
})




function updateCurrentSection() {
  const name = currentSection.getSection().getName();
  
  let updatedData;
  switch(name) {
    case "Completed":
      updatedData = new storageService(completed(database.getDataBase()), "Completed");
      break;
    case "Uncompleted":
      updatedData = new storageService(uncompleted(database.getDataBase()), "Uncompleted");
      break;
    case "Important":
      updatedData = new storageService(important(database.getDataBase()), "Important");
      break;
    case "Overdue":
      updatedData = new storageService(overdue(database.getDataBase()), "Overdue");
      break;
    case "Upcoming":
      updatedData = new storageService(upComing(database.getDataBase()), "Upcoming");
      break;
    default:
      updatedData = database;
      break;
  }
  
  currentSection.moveToSection(updatedData);
  return updatedData;
}



















const addingTaskDialog = document.querySelector(".Adding-task-dialog");
const closeTaskDialogBtn = document.querySelector(".close-adding-task");
const openTaskDialogBtn = document.querySelector(".open-task-dialog");

openTaskDialogBtn.addEventListener("click",()=>{
    showDialog(addingTaskDialog);
})


closeTaskDialogBtn.addEventListener("click",()=>{
    closeDialog(addingTaskDialog);
})



const addingProjectDialog = document.querySelector(".Adding-project-dialog");
const closeProjectDialogBtn = document.querySelector(".close-adding-project");
const openProjectDialogBtn = document.querySelector(".open-project-dialog");


openProjectDialogBtn.addEventListener("click",()=>{
    showDialog(addingProjectDialog);
})


closeProjectDialogBtn.addEventListener("click",()=>{
  closeDialog(addingProjectDialog);
})

/* star toggling */ 

const toggleStarCheckbox = document.querySelector(".hidden-checkbox");
const emptyStar = document.querySelector(".star-empty");
const filledStar = document.querySelector(".star-filled");

toggleStarCheckbox.addEventListener("change",()=>{
    toggleStar(toggleStarCheckbox,emptyStar,filledStar);
})

/* current project selected */

const currentProject = (() => {
  let IamInProject = "" ;
  return {
    getProject: () => IamInProject,
    moveToProject: (project)=> IamInProject = project
  };
})();





/* getting data  */ 
 
 
 function editProject(projectTitle,newprojectTitle) {
  database.getDataBase()[getProjectIndex(projectTitle)].edit(newprojectTitle);
 }
  

/* buttons to add task-project */

 const addingTaskBtn = document.querySelector(".add-task-in-dialog");
 const addingProjectBtn = document.querySelector(".add-project-in-dialog");
 
/* project inputs */



addingProjectBtn.addEventListener("click", () => {

 let projectTitle = document.querySelector(".projectTitle-input").value;
 setProjectInfo(projectTitle);
 
 
 ShowProjects(todosContainer,updateCurrentSection());
  

  closeDialog(addingProjectDialog);

  document.querySelector(".projectTitle-input").value = "";
  
  
})

/* task inputs */
addingTaskBtn.addEventListener("click",() =>{
 const taskTitle = document.querySelector(".taskTitle-input").value;
 const taskDescription = document.querySelector(".description-input").value;
 const taskDate = document.querySelector(".date-input").value;
 const importantTask = document.querySelector(".important-checkbox").checked;
 
 if(currentProject.getProject()) {
  setTaskInfo(currentProject.getProject(),taskTitle,taskDescription,importantTask,taskDate);
  showTasks(currentProject.getProject(),todosContainer,updateCurrentSection());
  
  

  closeDialog(addingTaskDialog);
 }
 else {
  alert("choose a project to put the task in");
 }
})


const projectEditingDialog = document.querySelector(".Editing-project-dialog");
const newProjectTitle = document.querySelector(".EditprojectTitle-input");
const editProjectButton = document.querySelector(".Edit-project-in-dialog");
const closeEditingProject = document.querySelector(".close-editing-project");






         const EditingTaskBtn = document.querySelector(".Edit-task-in-dialog");
         const closeEditingTask = document.querySelector(".close-editing-task");
         const taskEditingDialog = document.querySelector(".Editing-task-dialog");
         const editedEmptyStar = document.querySelector(".edit-star-empty");
         const editedFilledStar = document.querySelector(".edit-star-filled");
         const EditTaskImportanceCheckbox = document.querySelector(".Editimportant-checkbox");
 





 EditTaskImportanceCheckbox.addEventListener("click",()=>{
  toggleStar(EditTaskImportanceCheckbox,editedEmptyStar,editedFilledStar);
 })




closeEditingTask.addEventListener("click",()=>{
  closeDialog(taskEditingDialog);
})


closeEditingProject.addEventListener("click",()=>{
  closeDialog(projectEditingDialog);
})




todosContainer.addEventListener("click" , (event) => {
      
    if(currentProject.getProject()) {
     const target = event.target;
     const taskContainer = target.closest(".task-container");


    if(!taskContainer) return ;
    
     

    const index = database.getProjectIndex(currentProject.getProject());
    
    const taskId = taskContainer.querySelector(".task-title").id;

    
    
      

    
    if (target.matches(".delete-task-button, .delete-task-button *")) {
        database.getDataBase()[index].deleteTask(Number(taskId));
        showTasks(currentProject.getProject(),todosContainer,updateCurrentSection());
  
    } 
    else if (target.matches(".edit-task-button, .edit-task-button *"))  {
    showDialog(taskEditingDialog);
    EditingTaskBtn.addEventListener("click",()=>{
         const EditedtaskTitle = document.querySelector(".EdittaskTitle-input").value;
         const EditedtaskDescription = document.querySelector(".Editdescription-input").value;
         const EditedtaskDate = document.querySelector(".Editdate-input").value;
         
        
  
        editTaskInfo(currentProject.getProject(),Number(taskId),EditedtaskTitle,EditedtaskDescription,EditTaskImportanceCheckbox.checked,EditedtaskDate);
        showTasks(currentProject.getProject(),todosContainer,updateCurrentSection())
        closeDialog(taskEditingDialog);
    })

    }
    else if (target.matches(".task-checkbox, .task-checkbox *")) {
     
     
     
   
     database.getDataBase()[index].tasks.find(task => task.getId() === Number(taskId)).toggleComplete();
       showTasks(currentProject.getProject(),todosContainer,updateCurrentSection());
       
    
     
    }
}
})

const backButton = document.querySelector(".back-button");

todosContainer.addEventListener("click", (event) => {
    const target = event.target;
    const projectContainer = target.closest(".project");
   
    if (!projectContainer) return;
    
    const projectTitle = projectContainer.querySelector("h2").textContent;

    if (target.matches(".delete-button, .delete-button *")) {
        database.deleteProject(projectTitle);
        ShowProjects(todosContainer,updateCurrentSection());
    } else if (target.matches(".edit-button, .edit-button *")) {
        showDialog(projectEditingDialog);
        editProjectButton.onclick = () => {
            database.editProject(projectTitle, newProjectTitle.value);
            ShowProjects(todosContainer,updateCurrentSection());
            closeDialog(projectEditingDialog);
        };
    } else if (target.closest(".project-title")) {
        
        backButton.style.display = "block";
        
        showTasks(projectTitle,todosContainer,updateCurrentSection());
        showMainTitle(`${projectTitle} > Tasks`);
        currentProject.moveToProject(projectTitle);
        openProjectDialogBtn.disabled = true;
    }
});








backButton.addEventListener("click",()=>{
  ShowProjects(todosContainer,currentSection.getSection());
  backButton.style.display = "none";
  showMainTitle(currentSection.getSection().getName());
  openProjectDialogBtn.disabled = false;
  
  currentProject.moveToProject("");
})


export {projectEditingDialog ,newProjectTitle,editProjectButton};
export {currentProject};
export {currentSection};





















