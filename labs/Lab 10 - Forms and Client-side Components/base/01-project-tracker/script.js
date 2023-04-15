document.addEventListener("DOMContentLoaded", () => {
  let tasks = [];

  const renderTasks = () => {
    if (tasks.length) {
      document.querySelector("#task-reset").classList.remove("hidden");
    } else {
      document.querySelector("#task-reset").classList.add("hidden");
    }

    document.querySelector("#tasks").innerHTML = null;
    tasks.forEach((task) => {
      const container = document.createElement("div");
      container.classList.add("task");
      if (task.complete) {
        container.classList.add("complete");
      }

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("task-title");
      titleDiv.innerHTML = task.title;
      const completeButton = document.createElement("button");
      completeButton.innerHTML = `<img src="icons/${
        task.complete ? "check-" : ""
      }square.svg" alt="delete task" />`;
      completeButton.addEventListener("click", () => {
        completeTask(task.title);
      });
      // const completeCheck = document.createElement("input");
      // completeCheck.type = "checkbox";
      // completeCheck.checked = task.complete;
      // completeCheck.addEventListener("click", () => {
      //   completeTask(task.title);
      // });
      const deleteButton = document.createElement("button");
      deleteButton.disabled = !task.complete;
      deleteButton.innerHTML = `<img src="icons/x-circle.svg" alt="delete task" />`;
      deleteButton.addEventListener("click", () => {
        deleteTask(task.title);
      });

      container.appendChild(titleDiv);
      container.appendChild(completeButton);
      // container.appendChild(completeCheck);
      container.appendChild(deleteButton);
      document.querySelector("#tasks").appendChild(container);
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

  const clearTasks = () => {
    tasks = [];
    renderTasks();
  };

  const completeTask = (title) => {
    const task = tasks.find((task) => task.title === title);
    task.complete = !task.complete;
    renderTasks();
  };

  const deleteTask = (title) => {
    const index = tasks.findIndex((task) => task.title === title);
    tasks.splice(index, 1);
    renderTasks();
  };

  document.querySelector("#add-task").addEventListener("click", addTask);
  document.querySelector("#clear-tasks").addEventListener("click", clearTasks);
});
