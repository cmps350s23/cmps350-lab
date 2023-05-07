"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [foo, setFoo] = useState(0);

  // const [a, setA] = useState(0);
  // const [b, setB] = useState(1);

  // useEffect(() => {
  //   setB(!b);
  // }, [a]);
  // useEffect(() => {
  //   setA(!a);
  // }, [b]);

  useEffect(() => {
    async function fetchProjects() {
      return await fetch("/api/projects").then((res) => res.json());
    }

    fetchProjects().then((data) => setProjects(data));
    // const data = [
    //   {
    //     title: "Project 1",
    //     completed: true,
    //     tasks: [{ title: "Task 1.1", completed: true }],
    //   },
    //   {
    //     title: "Project 2",
    //     completed: false,
    //     tasks: [
    //       { title: "Task 2.1", completed: true },
    //       { title: "Task 2.2", completed: false },
    //     ],
    //   },
    //   {
    //     title: "Project 3",
    //     completed: false,
    //     tasks: [{ title: "Task 3.1", completed: false }],
    //   },
    //   {
    //     title: "Project 4",
    //     completed: false,
    //     tasks: [{ title: "Task 4.1", completed: false }],
    //   },
    //   {
    //     title: Math.random() * 100,
    //     completed: false,
    //     tasks: [{ title: "Task 4.1", completed: false }],
    //   },
    // ];
    // setProjects(data);
  }, [foo]);

  useEffect(() => {}, []);

  return (
    <Projects projects={projects} setProjects={setProjects} setFoo={setFoo} />
  );
}

function Projects({ projects, setProjects, setFoo }) {
  return (
    <div
      className="m-4 mx-auto max-w-md"
      style={{
        backgroundColor:
          "#" + Math.floor(Math.random() * 16777215).toString(16),
      }}
    >
      <div className="border rounded-lg">
        {projects.map((project) => (
          <Project key={project.title} project={project} />
        ))}
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const title = document.querySelector("#new-project").value;

          setProjects((projects) => [
            ...projects,
            { title, completed: false, tasks: [] },
          ]);

          // setProjects([
          //   ...projects,
          //   { title: "foo", completed: false, tasks: [] },
          // ]);
        }}
      >
        <input
          id="new-project"
          className="border rounded mt-2 p-1"
          type="text"
        />
      </form>
      <button onClick={() => setFoo(Math.random())}>click me!</button>
    </div>
  );
}

function Project({ project }) {
  return (
    <div
      className="p-3 border even:bg-zinc-100"
      style={{
        backgroundColor:
          "#" + Math.floor(Math.random() * 16777215).toString(16),
      }}
    >
      <div className="flex justify-between">
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
    <div
      style={{
        backgroundColor:
          "#" + Math.floor(Math.random() * 16777215).toString(16),
      }}
    >
      {tasks.map((task) => (
        <Task key={task.title} task={task} />
      ))}
    </div>
  );
}

function Task({ task }) {
  return (
    <div
      className="flex justify-between"
      style={{
        backgroundColor:
          "#" + Math.floor(Math.random() * 16777215).toString(16),
      }}
    >
      <div className="font-light">{task.title}</div>
      <div className="flex gap-2">
        <div
          className={`${task.completed ? "text-green-500" : "text-red-500"}`}
        >
          {task.completed ? "true" : "false"}
        </div>
        <div>
          <button>delete</button>
        </div>
      </div>
    </div>
  );
}
