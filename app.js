let taskData = JSON.parse(localStorage.getItem("taskData")) || [];

const listElement = document.getElementById("taskList");
const createBtn = document.getElementById("addTaskBtn");

createBtn.onclick = function () {
  const inputName = document.getElementById("taskName").value;
  const inputType = document.getElementById("taskCategory").value;
  const inputDue = document.getElementById("taskDeadline").value;
  const inputState = document.getElementById("taskStatus").value;

  if (!inputName || !inputType || !inputDue) return alert("Fill all fields");

  taskData.push({
    title: inputName,
    category: inputType,
    deadline: inputDue,
    status: inputState
  });

  persistTasks();
  renderTasks();
};

function renderTasks() {
  listElement.innerHTML = "";
  const selectedStatus = document.getElementById("filterStatus").value;
  const selectedCategory = document.getElementById("filterCategory").value;
  const uniqueCategories = new Set();

  for (let idx = 0; idx < taskData.length; idx++) {
    let task = taskData[idx];

    if (task.status !== "Completed" && task.deadline < new Date().toISOString().split("T")[0]) {
      task.status = "Overdue";
    }

    uniqueCategories.add(task.category);

    if (
      (selectedStatus === "All" || task.status === selectedStatus) &&
      (selectedCategory === "All" || task.category === selectedCategory)
    ) {
      let rowHTML = "<tr><td>" + task.title + "</td><td>" + task.category + "</td><td>" + task.deadline + "</td><td>" + task.status + "</td>";
      rowHTML += `<td><select onchange="changeStatus(${idx}, this.value)">`;
      rowHTML += `<option${task.status === "In Progress" ? " selected" : ""}>In Progress</option>`;
      rowHTML += `<option${task.status === "Completed" ? " selected" : ""}>Completed</option>`;
      rowHTML += "</select></td></tr>";
      listElement.innerHTML += rowHTML;
    }
  }

  const categoryFilter = document.getElementById("filterCategory");
  categoryFilter.innerHTML = "<option>All</option>";
  uniqueCategories.forEach(function (catOption) {
    categoryFilter.innerHTML += `<option>${catOption}</option>`;
  });

  persistTasks();
}

function changeStatus(index, newStatus) {
  taskData[index].status = newStatus;
  renderTasks();
}

function persistTasks() {
  localStorage.setItem("taskData", JSON.stringify(taskData));
}

document.getElementById("filterStatus").onchange = renderTasks;
document.getElementById("filterCategory").onchange = renderTasks;

renderTasks();
