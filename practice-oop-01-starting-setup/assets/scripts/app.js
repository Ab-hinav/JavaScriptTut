
class DOMHelper{
    static moveElement(elementId, newDestinationSelectorId){
        const element = document.getElementById(elementId);
       const newDestinationSelector = document.querySelector(newDestinationSelectorId);
       newDestinationSelector.append(element);
    }

    static clearEventListeners(element){
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }
}

class Component{

    constructor(hostElementId, insertBefore = false){
        if (hostElementId){
            this.hostElementId = document.getElementById(hostElementId);
        }else{
            this.hostElementId = document.body;
        }
        this.insertBefore = insertBefore;
    }

    detach(){
        if (this.element){
        this.element.remove();
        }
        // this.closeNotifierFn();
    }

    attach(){
        // console.log(this.element);
        this.hostElementId.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element);
    
    }

}


class Tooltip extends Component{

    constructor(closeNotifierFn,text,itemId){

        super(itemId,false);
        this.closeNotifierFn = closeNotifierFn;
        this.text = text;
        this.create();
        
        console.log(text);
    }

    closeTooltip = () => {
    this.detach();
    this.closeNotifierFn();
    }

    create(){
        // console.log('fsd');
        const tooltip = document.createElement('div');
        tooltip.className = 'card';
        tooltip.textContent = this.text;
        this.element = tooltip;
        tooltip.addEventListener('click', this.closeTooltip);
        
    }


}


class ProjectItem {
    hasActiveTooltip = false;
    constructor(id,title,switchProjectHandler,type){
        this.id = id;
        this.title = title;
        this.updateProjectListHandler = switchProjectHandler;
        this.connectSwitchButton(type);
        this.connectMoreInfoButton();
       
    }

    showMoreInfoHandler(){
        if (this.hasActiveTooltip){
            return;
        }
        const toolTipText = document.getElementById(this.id).dataset.extraInfo;
        console.log(toolTipText);
        const tooltip = new Tooltip(() => this.hasActiveTooltip = false,toolTipText,this.id);
        tooltip.attach();
        this.hasActiveTooltip = true;
    }

    connectMoreInfoButton(){

        const projectItemElement = document.getElementById(this.id);
        const moreInfoBtn = projectItemElement.querySelector('button:first-of-type');
        // console.log(moreInfoBtn);
        moreInfoBtn.addEventListener('click',this.showMoreInfoHandler.bind(this));

    }

    connectSwitchButton(type){
        const projectItemElement = document.getElementById(this.id);
        let switchBtn = projectItemElement.querySelector('button:last-of-type');
        // add event listener to switch project lists
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.textContent = type === 'active' ? 'Finish':'Acive';
        
        switchBtn.addEventListener('click', this.updateProjectListHandler.bind(null,this.id));
    }

    updateProject(updateProjectListHandler,type){
        this.updateProjectListHandler = updateProjectListHandler;
        this.connectSwitchButton(type);
    }

    

}


class ProjectList {
    projectList = [];
    constructor(type){
        this.type = type;
        const projItems = document.querySelectorAll(`#${type}-projects li`);
        console.log(projItems);
        for (let projItem of projItems){
            this.projectList.push(new ProjectItem(projItem.id, projItem.title,this.switchProject.bind(this),this.type));
        }
    }

    setSwitchProjectHandler(switchProjectHandler){
        this.switchProjectHandler = switchProjectHandler;
    }

    addProject(project){
        this.projectList.push(project);
    //    this.projectList.push(this);
        console.log(this);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.updateProject(this.switchProject.bind(this), this.type);

    }
     

    

    switchProject(projectId){
        this.switchProjectHandler(this.projectList.find(projItem => projItem.id === projectId));
        this.projectList = this.projectList.filter(projItem => projItem.id !== projectId);
    }

}


class App{
    static init(){
        let activeProjectList = new ProjectList('active');
        let finishedProjectList = new ProjectList('finished');
        activeProjectList.setSwitchProjectHandler(finishedProjectList.addProject.bind(finishedProjectList));
        finishedProjectList.setSwitchProjectHandler(activeProjectList.addProject.bind(activeProjectList));
    }
}


App.init();
