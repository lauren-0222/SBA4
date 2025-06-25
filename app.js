let savedTaskArray = JSON.parse(localStorage.getItem("taskData")) || [];

const taskTableBodyElement = document.getElementById("taskList");
const addTaskButtonElement = document.getElementById("addTaskButton");

addTaskButtonElement.onclick = function () {
  const title = document.getElementById("taskName").value;
  const category = document.getElementById("taskCategory").value;
  const deadline = document.getElementById("taskDeadline").value;
  const status = document.getElementById("taskStatus").value;

  if (!title || !category || !deadline) {
    alert("Fill all fields");
    return;
  }

  savedTaskArray.push({ title, category, deadline, status });
  saveTasksToLocalStorage();
  updateTaskTable();
};

function updateTaskTable () 
  taskTableBodyElement.innerHTML = "";
  const statusFilter = document.getElementById("filterStatus").value;
  const categoryFilter = document.getElementById("filterCategory").value;
  const categories = new Set();

  for (let i = 0; i < savedTaskArray.length; i++) {
    let task = savedTaskArray[i];

    if (task.status !== "Completed" && task.deadline < new Date().toISOString().split("T")[0]) {
      task.status = "Overdue";
    }

    categories.add(task.category);

    if ((statusFilter === "All" || task.status === statusFilter) &&
        (categoryFilter === "All" || task.category === categoryFilter)) {
      let row = "<tr><td>" + task.title + "</td><td>" + task.category + "</td><td>" + task.deadline + "</td><td>" + task.status + "</td>";
      row += "<td><select onchange='changeTaskStatus(" + i + ", this.value)'>";
      row += "<option" + (task.status === "In Progress" ? " selected" : "") + ">In Progress</option>";
      row += "<option" + (task.status === "Completed" ? " selected" : "") + ">Completed</option>";
      row += "</select></td></tr>";
      taskTableBodyElement.innerHTML += row;
    }
  }

  const categoryDropdown = document.getElementById("filterCategory");
  categoryDropdown.innerHTML = "<option>All</option>";
  categories.forEach(function (name) {
    categoryDropdown.innerHTML += "<option>" + name + "</option>";
  });
