// dialogs 
import { database } from "./storage.js";
import {projectEditingDialog,newProjectTitle,editProjectButton} from "./index.js";
import { getProjectIndex } from "./todo.js";
import { currentProject } from "./index.js";

import { editTaskInfo } from "./todo.js";
import { currentSection } from "./index.js";


function showDialog(dialog) {
dialog.showModal();

} 

function closeDialog(dialog) {
    dialog.close();
}




/* star toggling */ 
function toggleStar(starCheckbox,emptyStar,filledStar) {
if (starCheckbox.checked) {
    emptyStar.style.display = "none";
        filledStar.style.display = "inline-block";
}
else {
         emptyStar.style.display = "inline-block";
        filledStar.style.display = "none";
    }
}



export {toggleStar,showDialog,closeDialog};
/* global container for all content */



function ShowProjects(todosContainer,database) {
    
    todosContainer.textContent = "";
    database.getDataBase().forEach(project => {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project");
    const projectTitleContainer = document.createElement("div");
    
    projectTitleContainer.classList.add("project-title");
    const projectTitle = document.createElement("h2");
    projectTitleContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectTitleContainer);


    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#BB271A"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
   
    editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`
   
   
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container-in-project");
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);
    projectContainer.appendChild(buttonsContainer);
    projectTitle.textContent = project.projectTitle;

    todosContainer.appendChild(projectContainer);

    const type = document.createElement("div");
    type.classList.add("section-destinction");
     destinctSection(currentSection,type);
    projectContainer.appendChild(type);
    
   
    
     
    
});
 







}

function showMainTitle(mainTitle) {
 const mainTitleElement = document.querySelector(".main-title");
 mainTitleElement.textContent = mainTitle;
}


function showTasks(projectTitle,todosContainer,database) {
todosContainer.textContent = "";

const index = database.getProjectIndex(projectTitle);




database.getDataBase()[index].tasks.forEach(task => {
const taskContainer = document.createElement("div");
const taskTitle = document.createElement("h3");
const taskDescription = document.createElement("p");
const taskCheckbox = document.createElement("input");
taskCheckbox.type = "checkbox";
const checkbox_title_container = document.createElement("div");
const taskImportant = document.createElement("div");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task-button");
    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#BB271A"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
    const editButton = document.createElement("button");
    editButton.classList.add("edit-task-button");
   
    editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`
    
    const taskButtonsContainer = document.createElement("div");
    taskButtonsContainer.classList.add("edit-buttons-container-in-task");
    taskButtonsContainer.appendChild(editButton);
    taskButtonsContainer.appendChild(deleteButton);

    taskContainer.appendChild(taskButtonsContainer);

if(task.important) {

    taskImportant.innerHTML = `<svg width="32px" fill="rgb(223, 223, 26)"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
        </svg>`;

}
        else {
            taskImportant.innerHTML = `<svg width="32px" stroke="rgb(223, 223, 26)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>`;
        }



const taskDate = document.createElement("div");



taskDescription.textContent = task.description;
taskDate.textContent = task.date;
taskTitle.textContent = task.title;


taskContainer.classList.add("task-container");
taskCheckbox.classList.add("task-checkbox");
checkbox_title_container.classList.add("task-title-container");
taskDescription.classList.add("task-description");
taskImportant.classList.add("task-importance");
taskDate.classList.add("task-date");
taskTitle.classList.add("task-title");

taskTitle.id = `${task.getId()}`;



checkbox_title_container.appendChild(taskCheckbox);
checkbox_title_container.appendChild(taskTitle);

taskContainer.appendChild(checkbox_title_container);
taskContainer.appendChild(taskDescription);
taskContainer.appendChild(taskImportant);
taskContainer.appendChild(taskDate);


todosContainer.appendChild(taskContainer);






if(task.completed) {
    taskCheckbox.checked = true;
    taskTitle.style["text-decoration"] = "line-through";
}




})

}


function destinctSection(currentSection,element) {
 switch (currentSection.getSection().getName()) {
  case "Projects" :
  element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="24px" fill="rgb(57, 55, 55)"><path d="M320-320h480v-120H698q-21 37-58 58.5T560-360q-42 0-79-21.5T422-440H320v120Zm240-120q34 0 57-23.5t23-56.5h160v-280H320v280h160q0 33 23.5 56.5T560-440ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-240h480-480Z"/></svg>`;
   break;

  case "Completed" :
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="green"><path d="M422-297.33 704.67-580l-49.34-48.67L422-395.33l-118-118-48.67 48.66L422-297.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z"/></svg>`;
    break;
  
  case "Uncompleted" :
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="red"><path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm30-193.33 120-120 120 120L646.67-360l-120-120 120-120L600-646.67l-120 120-120-120L313.33-600l120 120-120 120L360-313.33Zm-2 126.66h244L773.33-358v-244L602-773.33H358L186.67-602v244L358-186.67ZM480-480Z"/></svg>`;
    break;

  case "Important" :
    element.innerHTML = `<svg width="32px" fill="rgb(223, 223, 26)"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
         <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
        </svg>`;
        break;

  case "Overdue" :
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="red"><path d="m622-288.67 48.67-48.66-155.34-156v-195.34h-66.66v222l173.33 178ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-82.33 31.5-155.33 31.5-73 85.83-127.34Q251.67-817 324.67-848.5T480-880q82.33 0 155.33 31.5 73 31.5 127.34 85.83Q817-708.33 848.5-635.33T880-480q0 82.33-31.5 155.33-31.5 73-85.83 127.34Q708.33-143 635.33-111.5T480-80Zm0-400Zm0 333.33q137.67 0 235.5-97.83 97.83-97.83 97.83-235.5 0-137.67-97.83-235.5-97.83-97.83-235.5-97.83-137.67 0-235.5 97.83-97.83 97.83-97.83 235.5 0 137.67 97.83 235.5 97.83 97.83 235.5 97.83Z"/></svg>`;
    break;

  case "Upcoming" :
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="green"><path d="M146.67-120q-27 0-46.84-19.83Q80-159.67 80-186.67v-210q0-27 19.83-46.83 19.84-19.83 46.84-19.83H354q0 52.66 36.78 88.66 36.79 36 89.34 36 52.55 0 89.21-36 36.67-36 36.67-88.66h207.33q27 0 46.84 19.83Q880-423.67 880-396.67v210q0 27-19.83 46.84Q840.33-120 813.33-120H146.67Zm0-66.67h666.66v-210H658.67q-20.34 56.34-68.5 90.5Q542-272 480-272t-111.5-34.17q-49.5-34.16-67.17-90.5H146.67v210Zm563.33-346L662.67-580 800-717.33 847.33-670 710-532.67Zm-460 0L112.67-670 160-717.33 297.33-580 250-532.67Zm196.67-116V-840h66.66v191.33h-66.66Zm-300 462h666.66-666.66Z"/></svg>`;
    break;



 }

}
















export {ShowProjects , showTasks , showMainTitle} ;
















