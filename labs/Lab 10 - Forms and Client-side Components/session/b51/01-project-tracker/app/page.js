"use client";

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

import { useState, useEffect } from "react";

export default function Home() {
  const [projects, setProjects] = useState([
    {
      title: "Project 1",
      complete: false,
      tasks: [
        { title: "Task 1.1", complete: false },
        { title: "Task 1.2", complete: false },
        { title: "Task 1.3", complete: true },
      ],
    },
    {
      title: "Project 2",
      complete: false,
      tasks: [
        { title: "Task 2.1", complete: false },
        { title: "Task 2.2", complete: false },
        { title: "Task 2.3", complete: true },
      ],
    },
  ]);

  return (
    <>
      <Projects projects={projects} setProjects={setProjects} />
    </>
  );
}

function Projects({ projects, setProjects }) {
  return (
    <div>
      {projects.map((project) => (
        <Project
          key={project.title}
          title={project.title}
          complete={project.complete}
          tasks={project.tasks}
          projects={projects}
          setProjects={setProjects}
        />
      ))}
    </div>
  );
}

function Project({ title, complete, tasks, projects, setProjects }) {
  return (
    <div className="mb-3">
      <div>
        {title}
        <button
          className="border"
          onClick={(_) =>
            setProjects((projects) => {
              const newProjects = [...projects];

              const project = newProjects.find((p) => p.title === title);
              project.complete = !project.complete;
              project.tasks.forEach(
                (task) => (task.complete = project.complete)
              );

              return newProjects;
            })
          }
        >
          {complete ? "complete" : "not complete"}
        </button>
        <button
          className="border"
          onClick={(_) =>
            setProjects((projects) => {
              const newProjects = [...projects];

              const projectIndex = newProjects.findIndex(
                (p) => p.title === title
              );
              newProjects.splice(projectIndex, 1);

              return newProjects;
            })
          }
        >
          Delete
        </button>
      </div>
      <Tasks
        tasks={tasks}
        projectTitle={title}
        projects={projects}
        setProjects={setProjects}
      />
    </div>
  );
}

function ProjectInput() {}

function Tasks({ tasks, projects, projectTitle, setProjects }) {
  function addTask(e) {
    e.preventDefault();
    const taskTitle = document
      .querySelector(`#new-task-${projectTitle.split(" ").join("_")}`)
      .value.trim();

    const project = projects.find((p) => p.title === projectTitle);

    if (taskTitle && !project.tasks.find((task) => task.title === taskTitle)) {
      setProjects((projects) => {
        const newProjects = [...projects];

        const project = newProjects.find((p) => p.title === projectTitle);
        project.tasks.push({
          title: taskTitle,
          complete: false,
        });

        return newProjects;
      });
      document.querySelector(
        // a proper id should be used for every project and task
        `#new-task-${projectTitle.split(" ").join("_")}`
      ).value = "";
    }
  }

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.title}
          title={task.title}
          complete={task.complete}
          projectTitle={projectTitle}
          projects={projects}
          setProjects={setProjects}
        />
      ))}
      <form className="flex gap-x-2">
        <input
          className="border border-solid"
          id={`new-task-${projectTitle.split(" ").join("_")}`}
          type="text"
        />
        {/* <input
          className="cursor-pointer"
          type="submit"
          value="Add"
          onClick={addTask}
        /> */}
        <button className="cursor-pointer" onClick={addTask}>
          <img src="icons/plus-circle.svg" />
        </button>
      </form>
    </div>
  );
}

function Task({ title, complete, projectTitle, projects, setProjects }) {
  return (
    <div className="flex gap-x-2">
      {title}
      <button
        onClick={(_) =>
          setProjects((projects) => {
            const newProjects = [...projects];

            const project = newProjects.find((p) => p.title === projectTitle);
            const task = project.tasks.find((t) => t.title === title);
            task.complete = !task.complete;

            return newProjects;
          })
        }
      >
        <img src={`icons/${complete ? "check-" : ""}square.svg`} />
      </button>
      <button
        onClick={(_) =>
          setProjects((projects) => {
            const newProjects = [...projects];

            const project = newProjects.find((p) => p.title === projectTitle);
            const taskIndex = project.tasks.findIndex((t) => t.title === title);
            project.tasks.splice(taskIndex, 1);

            return newProjects;
          })
        }
      >
        <img src="icons/x-circle.svg" />
      </button>
    </div>
  );
}

function TaskInput() {}

// document.addEventListener("DOMContentLoaded", () => {
//   let tasks = [];

//   const renderTasks = () => {
//     if (tasks.length) {
//       document.querySelector("#task-reset").classList.remove("hidden");
//     } else {
//       document.querySelector("#task-reset").classList.add("hidden");
//     }

//     document.querySelector("#tasks").innerHTML = null;
//     tasks.forEach((task) => {
//       const container = document.createElement("div");
//       container.classList.add("task");
//       if (task.complete) {
//         container.classList.add("complete");
//       }

//       const titleDiv = document.createElement("div");
//       titleDiv.classList.add("task-title");
//       titleDiv.innerHTML = task.title;
//       const completeButton = document.createElement("button");
//       completeButton.innerHTML = `<img src="icons/${
//         task.complete ? "check-" : ""
//       }square.svg" alt="delete task" />`;
//       completeButton.addEventListener("click", () => {
//         completeTask(task.title);
//       });
//       // const completeCheck = document.createElement("input");
//       // completeCheck.type = "checkbox";
//       // completeCheck.checked = task.complete;
//       // completeCheck.addEventListener("click", () => {
//       //   completeTask(task.title);
//       // });
//       const deleteButton = document.createElement("button");
//       deleteButton.disabled = !task.complete;
//       deleteButton.innerHTML = `<img src="icons/x-circle.svg" alt="delete task" />`;
//       deleteButton.addEventListener("click", () => {
//         deleteTask(task.title);
//       });

//       container.appendChild(titleDiv);
//       container.appendChild(completeButton);
//       // container.appendChild(completeCheck);
//       container.appendChild(deleteButton);
//       document.querySelector("#tasks").appendChild(container);
//     });
//   };

//   const addTask = () => {
//     const title = document.querySelector("#new-task-title").value.trim();
//     if (title && !tasks.find((task) => task.title === title)) {
//       tasks.push({
//         title,
//         complete: false,
//       });
//       document.querySelector("#new-task-title").value = "";
//     }

//     renderTasks();
//   };

//   const clearTasks = () => {
//     tasks = [];
//     renderTasks();
//   };

//   const completeTask = (title) => {
//     const task = tasks.find((task) => task.title === title);
//     task.complete = !task.complete;
//     renderTasks();
//   };

//   const deleteTask = (title) => {
//     const index = tasks.findIndex((task) => task.title === title);
//     tasks.splice(index, 1);
//     renderTasks();
//   };

//   document.querySelector("#add-task").addEventListener("click", addTask);
//   document.querySelector("#clear-tasks").addEventListener("click", clearTasks);
// });
