document.addEventListener("DOMContentLoaded", () => {
  const tasks = [
    {
      title: "Task 1",
      complete: false,
    },
    {
      title: "Task 2",
      complete: true,
    },
    {
      title: "Task 3",
      complete: false,
    },
    {
      title: "Task 4",
      complete: true,
    },
  ];

  const addTask = () => {
    const title = document.querySelector("#new-task-title").value.trim();
    // if (!title || tasks.find((task) => task.title === title)) {
    //   return;
    // }

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
    tasks.splice(index, 1);
    renderTasks();
  };

  const clearTasks = () => {
    // tasks = [];
    while (tasks.length) {
      tasks.pop();
    }
    renderTasks();
  };

  // document.deleteTask = deleteTask;

  const renderTasks = () => {
    const tasksDiv = document.querySelector("#tasks");
    tasksDiv.innerHTML = null;

    // tasksDiv.innerHTML = tasks
    //   .map(
    //     (task) =>
    //       `<div class="task">
    //   <div class="task-title">${task.title}</div>
    //   <input type="checkbox" ${task.complete ? "checked" : ""}/>
    // <button onclick='deleteTask("${task.title}")'>
    //     <img src="images/x-circle.svg" alt="delete task" />
    //   </button>
    // </div>`
    //   )
    //   .join("");

    tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      if (task.complete) {
        taskDiv.classList.add("complete");
      }

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("task-title");
      titleDiv.innerText = task.title;

      const completeCheckbox = document.createElement("input");
      completeCheckbox.type = "checkbox";
      completeCheckbox.checked = task.complete;
      completeCheckbox.addEventListener("click", () =>
        completeTask(task.title)
      );

      const deleteButton = document.createElement("button");
      const deleteImage = document.createElement("img");
      deleteImage.src = "images/x-circle.svg";
      deleteImage.alt = "delete task";
      deleteButton.appendChild(deleteImage);
      deleteButton.addEventListener("click", () => deleteTask(task.title));

      taskDiv.appendChild(titleDiv);
      taskDiv.appendChild(completeCheckbox);
      taskDiv.appendChild(deleteButton);

      tasksDiv.appendChild(taskDiv);
    });

    if (tasks.length) {
      document.querySelector("#task-reset").classList.remove("hidden");
    } else {
      document.querySelector("#task-reset").classList.add("hidden");
    }
  };

  document.querySelector("#add-task").addEventListener("click", addTask);
  document.querySelector("#task-reset").addEventListener("click", clearTasks);

  renderTasks();
});
