const addButtonLow = document.querySelector("#addButtonLow");
const addButtonHigh = document.querySelector("#addButtonHigh");
const container = document.querySelector("#container");
const highPriority = document.querySelector("#HIGH");
const lowPriority = document.querySelector("#LOW");

const PRIORITY = {
  LOW: "LOW",
  HIGH: "HIGH",
};

const TASK_STATUS = {
  DONE: "Done",
  TODO: "To Do",
};

let tasks = [];

function createNewTask(inputText, targetContainer) {
  const newTask = {
    id: Date.now(),
    text: inputText,
    status: TASK_STATUS.TODO,
    priority: "",
  };
  const taskContainer = targetContainer.querySelector("h1");
  if (taskContainer && taskContainer.parentElement.id === PRIORITY.HIGH) {
    newTask.priority = PRIORITY.HIGH;
  } else {
    newTask.priority = PRIORITY.LOW;
  }
  tasks.push(newTask);
  const newTaskElement = document.createElement("div");
  const template = document.querySelector("#newTask");
  const clonedTemplate = template.content.cloneNode(true);
  newTaskElement.className = "newTask";
  const spanElement = clonedTemplate.querySelector(".newSpan");
  spanElement.textContent = inputText;
  spanElement.id = newTask.id;
  targetContainer.appendChild(clonedTemplate);
  renderTasks();
  console.log(tasks);
}

function renderTasks() {
  const taskList = document.querySelector(".newSpan");
  const currentTaskIds = Array.from(taskList.children).map((task) =>
    Number(task.id)
  );
  const newTasks = tasks.filter((task) => !currentTaskIds.includes(task.id));
  newTasks.forEach((task) => {
    task.priority === PRIORITY.HIGH ? highPriority : lowPriority;
  });
}

function addDivClick(event, targetContainer) {
  const inputText = event.target.parentElement.querySelector("input").value;
  createNewTask(inputText, targetContainer);
  event.target.parentElement.querySelector("input").value = "";
  event.target.parentElement.querySelector("input").focus();
  event.preventDefault();
}

function getTaskId(parentNode) {
  const spanElement = parentNode.querySelector(".newSpan");
  return Number(spanElement.id);
}

function deleteTask(event) {
  const closeButton = event.target.closest("label.close");
  if (closeButton) {
    const parentNode = event.target.closest(".task");
    const taskId = getTaskId(parentNode);
    tasks = tasks.filter((task) => task.id !== taskId);
    parentNode.remove();
  }
}

function changeStatus(event) {
  if (event.target.type !== "checkbox") return;
  const isChecked = event.target.checked;
  const parentNode = event.target.closest(".task");
  parentNode.classList.toggle("completed");
  const taskId = getTaskId(parentNode);
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.status = isChecked ? TASK_STATUS.DONE : TASK_STATUS.TODO;
  }
  renderTasks();
}

addButtonHigh.addEventListener("click", function (event) {
  addDivClick(event, highPriority);
});

addButtonLow.addEventListener("click", function (event) {
  addDivClick(event, lowPriority);
});

container.addEventListener("click", deleteTask);

container.addEventListener("click", changeStatus);
