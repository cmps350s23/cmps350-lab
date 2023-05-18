"use client";

import { useState, useEffect, useRef } from "react";
import { createIdea, deleteIdea } from "@/app/actions";
import { PlusCircle, XCircle } from "react-feather";

export default function Ideas({ ideas, user, email, signal }) {
  const newIdeaTitle = useRef();
  const newIdeaForm = useRef();
  useEffect(() => {
    // alert("Coocoo!");
    // localStorage
  }, []);

  return (
    <main
    // style={{
    //   backgroundColor:
    //     "#" + Math.floor(Math.random() * 16777216).toString(16),
    // }}
    >
      <div className="text-center">{user}</div>
      <div className="text-center">{email}</div>
      <form
        action={async (formData) => {
          await createIdea({ title: newIdeaTitle.current.value, userId: user });
          await signal();
          newIdeaForm.current.reset();
        }}
        className="flex gap-x-2 p-3.5 mb-1"
        ref={newIdeaForm}
      >
        <input
          className="border rounded p-1 grow"
          type="text"
          name="title"
          placeholder="Idea"
          ref={newIdeaTitle}
        />
        <button>
          <PlusCircle size={22} />
        </button>
      </form>
      <div className="border rounded p-2">
        {ideas.map((idea) => (
          <form className="flex gap-x-2 p-1" key={idea.id}>
            <input type="hidden" name="id" value={idea.id} />
            <div className="grow">{idea.title}</div>
            <button
              formAction={async (formData) => {
                await deleteIdea(idea.id);
                await signal();
              }}
            >
              <XCircle size={22} />
            </button>
          </form>
        ))}
      </div>
    </main>
  );
}
