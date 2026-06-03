let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

let currentFilter = "all";

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", e=>{
if(e.key==="Enter"){
addTask();
}
});

function addTask(){

const text = taskInput.value.trim();

if(text==="") return;

tasks.push({
id:Date.now(),
text:text,
completed:false
});

saveTasks();

taskInput.value="";

renderTasks();
}

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function renderTasks(){

taskList.innerHTML="";

let filtered = tasks;

if(currentFilter==="active"){
filtered = tasks.filter(task=>!task.completed);
}

if(currentFilter==="completed"){
filtered = tasks.filter(task=>task.completed);
}

filtered.forEach(task=>{

const li=document.createElement("li");

li.className=`task ${task.completed ? "completed" : ""}`;

li.innerHTML=`
<div class="task-left">
<input type="checkbox" ${task.completed ? "checked" : ""}>
<span>${task.text}</span>
</div>

<div class="task-right">
<button class="edit">
<i class="fas fa-edit"></i>
</button>

<button class="delete">
<i class="fas fa-trash"></i>
</button>
</div>
`;

const checkbox=li.querySelector("input");

checkbox.addEventListener("change",()=>{
task.completed=!task.completed;
saveTasks();
renderTasks();
});

li.querySelector(".delete").addEventListener("click",()=>{
tasks=tasks.filter(t=>t.id!==task.id);
saveTasks();
renderTasks();
});

li.querySelector(".edit").addEventListener("click",()=>{

const updated=prompt("Edit Task",task.text);

if(updated && updated.trim()!==""){
task.text=updated.trim();
saveTasks();
renderTasks();
}

});

taskList.appendChild(li);

});

updateStats();
}

function updateStats(){

const total=tasks.length;

const completed=tasks.filter(task=>task.completed).length;

const active=total-completed;

document.getElementById("totalTasks").textContent=total;

document.getElementById("activeTasks").textContent=active;

document.getElementById("completedTasks").textContent=completed;
}

document.querySelectorAll(".filter").forEach(btn=>{

btn.addEventListener("click",()=>{

document
.querySelectorAll(".filter")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

currentFilter=btn.dataset.filter;

renderTasks();

});

});

renderTasks();
