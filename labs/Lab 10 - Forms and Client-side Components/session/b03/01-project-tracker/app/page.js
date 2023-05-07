"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [foo, setFoo] = useState(false);

  useEffect(() => {
    setProjects([
      {
        title: "Project 1",
        completed: true,
        tasks: [
          { title: "Task 1.1", completed: true },
          { title: "Task 1.2", completed: true },
        ],
      },
      {
        title: "Project 2",
        completed: false,
        tasks: [
          { title: "Task 2.1", completed: true },
          { title: "Task 2.2", completed: false },
        ],
      },
      {
        title: "Project 3",
        completed: false,
        tasks: [{ title: "Task 3.1", completed: true }],
      },
      {
        title: Math.random() * 100,
        completed: false,
        tasks: [],
      },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <Projects projects={projects} setProjects={setProjects} setFoo={setFoo} />
  );
}

function Projects({ projects, setProjects, setFoo }) {
  return (
    <div className="p-3 max-w-screen-md mx-auto">
      <div className="border rounded-lg">
        {projects.map((project) => (
          <Project project={project} />
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const value = document.querySelector("#project-input").value;

          setProjects((projects) => {
            return [...projects, { title: value, completed: false, tasks: [] }];
          });
          // setProjects([
          //   ...projects,
          //   { title: value, completed: false, tasks: [] },
          // ]);
        }}
      >
        <input
          id="project-input"
          className="border mt-2 rounded-lg"
          type="text"
        />
        <input type="submit" value="+" />
      </form>
      <button
        onClick={(_) => {
          setFoo(Math.random());
        }}
      >
        action
      </button>
    </div>
  );
}

function Project({ project }) {
  return (
    <div className="border p-2">
      <div className="flex gap-2 rounded justify-between">
        <div className="font-medium">{project.title}</div>
        <div className="flex gap-2">
          <div
            className={`${
              project.completed ? "text-green-500" : "text-red-500"
            }`}
          >
            {project.completed ? "true" : "false"}
          </div>
          <div>
            <button>delete</button>
          </div>
        </div>
      </div>
      <Tasks tasks={project.tasks} />
    </div>
  );
}

function Tasks({ tasks }) {
  return (
    <>
      <div>
        {tasks.map((task) => (
          <Task task={task} />
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input className="border mt-2 rounded-lg" type="text" />
        <input type="submit" value="+" />
      </form>
    </>
  );
}

function Task({ task }) {
  return (
    <div className="flex gap-2 rounded justify-between">
      <div>{task.title}</div>
      <div className="flex gap-2">
        <div>{task.completed ? "true" : "false"}</div>
        <div>
          <button>delete</button>
        </div>
      </div>
    </div>
  );
}
