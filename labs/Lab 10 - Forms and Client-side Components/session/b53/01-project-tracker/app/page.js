"use client";
import { useState } from "react";

export default function Home() {
  const [projects, setProjects] = useState([
    {
      title: "1",
      completed: false,
      tasks: [
        {
          title: "1.1",
          completed: false,
        },
        {
          title: "1.2",
          completed: true,
        },
        {
          title: "1.3",
          completed: false,
        },
      ],
    },
    {
      title: "2",
      completed: true,
      tasks: [
        {
          title: "2.1",
          completed: false,
        },
        {
          title: "2.2",
          completed: true,
        },
      ],
    },
  ]);

  return (
    <div>
      {/* {Math.random()} */}
      <Projects projects={projects} setProjects={setProjects} />
    </div>
  );
}

function Projects({ projects, setProjects }) {
  return (
    <div>
      {projects.map((project) => (
        <Project
          title={project.title}
          completed={project.completed}
          tasks={project.tasks}
          projects={projects}
          setProjects={setProjects}
        />
      ))}
    </div>
  );
}

function Project({ title, completed, tasks, projects, setProjects }) {
  return (
    <div className="mb-10">
      <div className="flex gap-x-2 mb-3">
        <span>{title}</span>
        <button
          className=""
          onClick={(e) => {
            setProjects((projects) => {
              const newProjects = [...projects];

              const project = newProjects.find(
                (project) => project.title === title
              );
              project.completed = !project.completed;
              project.tasks.forEach(
                (task) => (task.completed = project.completed)
              );

              return newProjects;
            });
          }}
        >
          <img src={`icons/${completed ? "check-" : ""}square.svg`} />
        </button>
        <button className="">
          <img src="icons/x-circle.svg" />
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

function Tasks({ tasks, projectTitle, projects, setProjects }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          title={task.title}
          completed={task.completed}
          projectTitle={projectTitle}
          projects={projects}
          setProjects={setProjects}
        />
      ))}
      <form className="flex gap-x-2">
        <input
          id={`new-task-title-${projectTitle}`}
          className="p-2 border rounded"
        />{" "}
        <button
          onClick={(e) => {
            e.preventDefault();

            setProjects((projects) => {
              const newProjects = [...projects];
              const title = document
                .querySelector(`#new-task-title-${projectTitle}`)
                .value.trim();

              const project = newProjects.find(
                (project) => project.title === projectTitle
              );

              if (!project.tasks.find((task) => task.title === title)) {
                project.tasks.push({
                  title,
                  completed: false,
                });

                project.completed = false;
              }

              return newProjects;
            });

            // document.querySelector(`#new-task-title-${projectTitle}`).value =
            //   "";
          }}
        >
          <img src="icons/plus-circle.svg" />
        </button>
      </form>
    </div>
  );
}

function Task({ title, completed, projectTitle, projects, setProjects }) {
  return (
    <div className="mb-3">
      <div className="flex gap-x-2">
        <span>{title}</span>
        <button
          className=""
          onClick={(e) =>
            setProjects((projects) => {
              const newProjects = [...projects];

              const project = newProjects.find(
                (project) => project.title === projectTitle
              );
              const task = project.tasks.find((task) => task.title === title);
              task.completed = !task.completed;

              if (project.tasks.every((task) => task.completed)) {
                project.completed = true;
              }
              if (project.tasks.some((task) => !task.completed)) {
                project.completed = false;
              }

              return newProjects;
            })
          }
        >
          <img src={`icons/${completed ? "check-" : ""}square.svg`} />
        </button>
        <button
          className=""
          onClick={(e) =>
            setProjects((projects) => {
              const newProjects = [...projects];

              const project = newProjects.find(
                (project) => project.title === projectTitle
              );
              const taskIndex = project.tasks.findIndex(
                (task) => task.title === title
              );
              project.tasks.splice(taskIndex, 1);

              if (project.tasks.every((task) => task.completed)) {
                project.completed = true;
              }
              if (project.tasks.some((task) => !task.completed)) {
                project.completed = false;
              }

              return newProjects;
            })
          }
        >
          <img src="icons/x-circle.svg" />
        </button>
      </div>
    </div>
  );
}
