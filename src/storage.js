


const stored = localStorage.getItem("Projects");

const data = stored ? JSON.parse(stored) : [];


class storageService {
  constructor(database,databaseName) {
    this.dataBase = database;
    this.dataBaseName = databaseName;
    
  }
  
  getName() {
    return this.dataBaseName;
  }
  
  addProject(project) {
        this.dataBase.push(project);
        this.save();
    }
        
    getDataBase() {
      return this.dataBase;
    }
    
     
    deleteProject(projectTitle) {
     const index = this.getProjectIndex(projectTitle);
     this.dataBase.splice(index,1);
     this.save();
    }
     
    getProjectIndex(projectTitle) {
    for(let x in this.dataBase) {
       if(this.dataBase[x].projectTitle === projectTitle) {
        return x;
       }
     
    }
 }
    editProject(projectTitle,newTitle) {
      this.dataBase[this.getProjectIndex(projectTitle)].projectTitle = newTitle;
      this.save();
    }
     
    save() {
      localStorage.setItem(this.dataBaseName,JSON.stringify(this.dataBase));
     }
     

    
    

}












const database = new storageService(data,"Projects");

export {database , storageService};









