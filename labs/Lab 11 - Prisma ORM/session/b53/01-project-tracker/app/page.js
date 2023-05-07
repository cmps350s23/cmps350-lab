"use client";

import { useState, useEffect } from "react";

export default function Page() {
  // const [projects, setProjects] = useState([
  //   {
  //     id: 1,
  //     title: "Project 1",
  //     complete: false,
  //     tasks: [
  //       { id: 1, title: "Task 1.1", complete: false },
  //       { id: 2, title: "Task 1.2", complete: true },
  //       { id: 3, title: "Task 1.3", complete: false },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "Project 2",
  //     complete: false,
  //     tasks: [
  //       { id: 1, title: "Task 2.1", complete: false },
  //       { id: 2, title: "Task 2.2", complete: true },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: "Project 3",
  //     complete: false,
  //     tasks: [{ id: 1, title: "Task 3.1", complete: false }],
  //   },
  // ]);
  const [projects, setProjects] = useState([]);

  // const ps = await fetch("").then(res => res.json());

  useEffect(() => {
    async function fetchProjects() {
      return await fetch("/api/projects").then((res) => res.json());
    }

    fetchProjects().then((data) => setProjects(data));
  }, []);

  return (
    <>
      <div>
        <Projects projects={projects} setProjects={setProjects} />
        <form
          className="px-3 flex justify-between gap-x-2 shrink-0"
          onSubmit={(e) => {
            e.preventDefault();
            createProject(projects, setProjects);
          }}
        >
          <input
            id="new-project-title"
            className="border border-solid border-slate-400 rounded grow p-1"
            type="text"
            placeholder="Project"
            // onKeyUp={(e) => {
            //   if (e.key === "Enter") {
            //     createProject(projects, setProjects);
            //   }
            // }}
          />
          <button>
            <img src="/icons/plus-circle.svg" alt="create" />
          </button>
        </form>
      </div>
    </>
  );
}

function Projects({ projects, setProjects }) {
  if (projects && projects.length) {
    return (
      <div className="mb-5">
        {projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            projects={projects}
            setProjects={setProjects}
          />
        ))}
      </div>
    );
  }
}

function Project({ project, projects, setProjects }) {
  return (
    <div className="p-3 border border-b-0 border-solid border-black first:rounded-t last:border-b last:rounded-b even:bg-slate-100">
      <div className="flex justify-between gap-x-2 shrink-0">
        <div
          className={`font-medium ${project.complete ? "line-through" : ""}`}
        >
          {project.title}
        </div>
        <div className="flex justify-between gap-x-1 shrink-0">
          <button
            onClick={(_) => toggleProject(project, projects, setProjects)}
          >
            <img
              src={`/icons/${project.complete ? "check-" : ""}square.svg`}
              alt="complete"
            />
          </button>
          <button
            onClick={(_) => deleteProject(project, projects, setProjects)}
          >
            <img src="/icons/x-circle.svg" alt="delete" />
          </button>
        </div>
      </div>
      <Tasks project={project} projects={projects} setProjects={setProjects} />
    </div>
  );
}

function Tasks({ project, projects, setProjects }) {
  return (
    <div className="mt-2">
      {project.tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          project={project}
          projects={projects}
          setProjects={setProjects}
        />
      ))}
      <form
        className="flex justify-between gap-x-2 mt-2 shrink-0"
        onSubmit={(e) => {
          e.preventDefault();
          createTask(project, projects, setProjects);
        }}
      >
        <input
          id={`new-task-title-${project.id}`}
          className="border border-solid border-slate-400 rounded grow p-1"
          type="text"
          placeholder="Task"
          // onKeyUp={(e) => {
          //   if (e.key === "Enter") {
          //     createTask(project, projects, setProjects);
          //   }
          // }}
        />
        <button>
          <img src="/icons/plus-circle.svg" alt="create" />
        </button>
      </form>
    </div>
  );
}

function Task({ task, project, projects, setProjects }) {
  return (
    <div className="flex justify-between gap-x-2 shrink-0">
      <div className={task.complete ? "line-through" : ""}>{task.title}</div>
      <div className="flex justify-between gap-x-1 shrink-0">
        <button
          onClick={(_) => toggleTask(task, project, projects, setProjects)}
        >
          <img
            src={`/icons/${task.complete ? "check-" : ""}square.svg`}
            alt="complete"
          />
        </button>
        <button
          onClick={(_) => deleteTask(task, project, projects, setProjects)}
        >
          <img src="/icons/x-circle.svg" alt="delete" />
        </button>
      </div>
    </div>
  );
}

function createProject(projects, setProjects) {
  setProjects((projects) => {
    const title = document
      .querySelector("#new-project-title")
      .value.trim()
      .replace(/\s\s+/g, " ");

    if (title && projects.every((p) => p.title !== title)) {
      document.querySelector("#new-project-title").value = "";

      const _projects = [...projects];

      _projects.push({
        id: Math.max(0, Math.max(..._projects.map((p) => p.id))) + 1,
        title,
        complete: false,
        tasks: [],
      });

      return _projects;
    }
    return projects;
  });
}

function toggleProject(project, projects, setProjects) {
  setProjects((projects) => {
    const _projects = [...projects];

    const _project = _projects.find((p) => p.id === project.id);
    _project.tasks.forEach((task) => (task.complete = !_project.complete));
    _project.complete = !_project.complete;

    return _projects;
  });
}

function deleteProject(project, projects, setProjects) {
  setProjects((projects) => {
    const _projects = [...projects];

    const _pindex = _projects.findIndex((p) => p.id === project.id);
    _projects.splice(_pindex, 1);

    return _projects;
  });
}

function createTask(project, projects, setProjects) {
  setProjects((projects) => {
    const title = document
      .querySelector(`#new-task-title-${project.id}`)
      .value.trim()
      .replace(/\s\s+/g, " ");

    if (title && project.tasks.every((t) => t.title !== title)) {
      document.querySelector(`#new-task-title-${project.id}`).value = "";

      const _projects = [...projects];

      const _project = _projects.find((p) => p.id === project.id);
      _project.tasks.push({
        id: Math.max(0, Math.max(..._project.tasks.map((t) => t.id))) + 1,
        title,
        complete: false,
      });
      updateProjectStatus(_project);

      console.log(project);

      return _projects;
    }
    return projects;
  });
}

function toggleTask(task, project, projects, setProjects) {
  setProjects((projects) => {
    const _projects = [...projects];

    const _project = _projects.find((p) => p.id === project.id);
    const _task = _project.tasks.find((t) => t.id === task.id);

    _task.complete = !_task.complete;
    updateProjectStatus(_project);

    return _projects;
  });
}

function deleteTask(task, project, projects, setProjects) {
  setProjects((projects) => {
    const _projects = [...projects];

    const _project = _projects.find((p) => p.id === project.id);
    const _tindex = _project.tasks.findIndex((t) => t.id === task.id);
    _project.tasks.splice(_tindex, 1);
    updateProjectStatus(_project);

    return _projects;
  });
}

function updateProjectStatus(project) {
  project.complete =
    project.tasks.length && project.tasks.every((t) => t.complete);
}
