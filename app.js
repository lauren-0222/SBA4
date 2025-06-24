let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addTaskBtn");

addBtn.onclick = function () {
  const name = document.getElementById("taskName").value;
  const cat = document.getElementById("taskCategory").value;
  const date = document.getElementById("taskDeadline").value;
  const status = document.getElementById("taskStatus").value;
  if (!name || !cat || !date) return alert("Fill all fields");
  tasks.push({ name: name, cat: cat, date: date, status: status });
  save();
  show();
};

function show() {
  taskList.innerHTML = "";
  let filterS = document.getElementById("filterStatus").value;
  let filterC = document.getElementById("filterCategory").value;
  let cats = new Set();
  for (let i = 0; i < tasks.length; i++) {
    let t = tasks[i];
    if (t.status !== "Completed" && t.date < new Date().toISOString().split("T")[0]) t.status = "Overdue";
    cats.add(t.cat);
    if ((filterS === "All" || t.status === filterS) && (filterC === "All" || t.cat === filterC)) {
      let row = "<tr><td>" + t.name + "</td><td>" + t.cat + "</td><td>" + t.date + "</td><td>" + t.status + "</td>";
      row += "<td><select onchange=\"update(" + i + ", this.value)\">";
      row += "<option" + (t.status === "In Progress" ? " selected" : "") + ">In Progress</option>";
      row += "<option" + (t.status === "Completed" ? " selected" : "") + ">Completed</option>";
      row += "</select></td></tr>";
      taskList.innerHTML += row;
    }
  }
  let catSel = document.getElementById("filterCategory");
  catSel.innerHTML = '<option>All</option>';
  cats.forEach(function (c) {
    catSel.innerHTML += '<option>' + c + '</option>';
  });
  save();
}

function update(i, val) {
  tasks[i].status = val;
  show();
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("filterStatus").onchange = show;
document.getElementById("filterCategory").onchange = show;
show();
