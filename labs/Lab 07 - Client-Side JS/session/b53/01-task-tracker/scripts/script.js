document.addEventListener("DOMContentLoaded", () => {
  let tasks = [];

  const renderTasks = () => {
    document.querySelector("#tasks").innerHTML = null;

    if (tasks.length) {
      document.querySelector("#task-reset").classList.remove("hidden");
    } else {
      document.querySelector("#task-reset").classList.add("hidden");
    }

    tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      if (task.complete) {
        taskDiv.classList.add("complete");
      }

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("task-title");
      titleDiv.innerHTML = task.title;

      const completeCheck = document.createElement("input");
      completeCheck.type = "checkbox";
      completeCheck.checked = task.complete;

      completeCheck.addEventListener("click", () => completeTask(task.title));

      const deleteButton = document.createElement("button");

      deleteButton.addEventListener("click", () => deleteTask(task.title));

      const deleteImg = document.createElement("img");
      deleteImg.src = "images/x-circle.svg";
      deleteImg.alt = "delete task";

      deleteButton.appendChild(deleteImg);

      taskDiv.appendChild(titleDiv);
      taskDiv.appendChild(completeCheck);
      taskDiv.appendChild(deleteButton);

      document.querySelector("#tasks").appendChild(taskDiv);
    });
  };

  const addTask = () => {
    const title = document.querySelector("#new-task-title").value.trim();

    if (title && !tasks.find((task) => task.title === title)) {
      tasks.push({
        title,
        complete: false,
      });

      document.querySelector("#new-task-title").value = "";
    }

    renderTasks();
  };

  const completeTask = (title) => {
    const task = tasks.find((task) => task.title === title);
    task.complete = !task.complete;

    renderTasks();
  };

  const deleteTask = (title) => {
    const index = tasks.findIndex((task) => task.title === title);
    // if (tasks[index].complete) {
    tasks.splice(index, 1);

    renderTasks();
    // }
  };

  const clearTasks = () => {
    tasks = [];

    renderTasks();
  };

  document.querySelector("#add-task").addEventListener("click", addTask);
  document.querySelector("#clear-tasks").addEventListener("click", clearTasks);
});
