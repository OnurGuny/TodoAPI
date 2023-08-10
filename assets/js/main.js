qs=s=> document.querySelector(s);
qsA=s=> document.querySelectorAll(s);

const todoForm=qs("#todoForm")
const addTodo = qs("#addTodo");
const tasks = qs(".tasks");
const filterBtns = qsA("filterBtns");

function addingTodo (e){
    e.preventDefault();
    if(addTodo.value===""){
        alert("Please don't be lazy share us what needs to be done ?")
        return;
    }
    tasks.innerHTML +=
     `<li>
        <div class="view">
            <input class="toggle" type="checkbox">
            <label class="todoLabel">${addTodo.value}</label>
            <input type="edit" class="edit" value="${addTodo.value}">
            <button class="destroy">x</button>
        </div>
    </li>`;
    addTodo.value="";
    savedata();
    bindClicks();

}
todoForm.addEventListener("submit", addingTodo)

for (const filter of document.querySelectorAll(".filterBtns input")) {
    filter.addEventListener("click",function(){
        tasks.classList.value="tasks " + this.value; 
    });
}
function markTodo(){
    this.classList.toggle("complete")
    savedata();
}
function removeTodo(){
    this.parentElement.parentElement.remove();
    savedata();
}
function editTodo(e) {
    if(e.key === 'Enter') {
        this.previousElementSibling.innerText = this.value;
        this.parentElement.classList.remove('editing');
        this.previousElementSibling.style.display = 'inline';
        this.parentElement.childNodes[5].style.display="none"
        savedata();
    }  
}
function showTodoEdit() {
    this.parentElement.classList.add('editing');
    this.style.display = "none";
    this.parentElement.childNodes[5].style.display="inline"
    const currValue = this.nextElementSibling.value;
    this.nextElementSibling.value = '';
    this.nextElementSibling.value = currValue;
    this.nextElementSibling.focus();
    savedata()
}
function bindClicks(){
    for (const btn of qsA(".destroy")) {
        btn.addEventListener("click", removeTodo);    
    }
    for (const btn of qsA("li")) {
        btn.addEventListener("click", markTodo);    
        
    }
    qsA("label").forEach(x=>x.addEventListener("dblclick", showTodoEdit))
    qsA(".edit").forEach(x=>x.addEventListener("keydown", editTodo))
    savedata();
}

function savedata() {
    localStorage.setItem("data", tasks.innerHTML);
}
function loaddata() {
   tasks.innerHTML = localStorage.getItem("data");
}
loaddata();
bindClicks();