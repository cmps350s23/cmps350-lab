"use client";

import { useState, useEffect, useRef } from "react";
import { createIdea, deleteIdea } from "@/app/actions";
import { PlusCircle, XCircle } from "react-feather";

export default function Ideas({ ideas, user, email, signal }) {
  // const [title, setTitle] = useState("");
  const newIdeaTitle = useRef();
  const newIdeaForm = useRef();

  return (
    <main>
      <div className="text-center mb-2">{user}</div>
      <div className="text-center mb-2">{email}</div>
      <div className="border rounded mb-2">
        {ideas.map((idea) => (
          <form
            className="flex align-middle p-2"
            key={idea.id}
            action={async (formData) => {
              await deleteIdea(idea.id);
              await signal();
            }}
          >
            <div className="grow">{idea.title}</div>
            <button>
              <XCircle size={22} />
            </button>
          </form>
        ))}
      </div>
      <form
        className="flex align-middle gap-x-2 p-2"
        // action={async (formData) => {
        //   const result = await createIdea({  title: newIdeaTitle.current.value });
        //   console.log(result);
        //   if (result) {
        //     setTitle("");
        //     // newIdeaForm.current.reset();
        //   }
        // }}
        ref={newIdeaForm}
      >
        <input
          className="border rounded p-1 grow"
          type="text"
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
          placeholder="Idea"
          ref={newIdeaTitle}
        />
        <button
          formAction={async (formData) => {
            const result = await createIdea({
              title: newIdeaTitle.current.value,
              userId: user,
            });

            if (result) {
              // setTitle("");
              newIdeaForm.current.reset();
              await signal();
            }
          }}
        >
          <PlusCircle size={22} />
        </button>
      </form>
    </main>
  );
}
