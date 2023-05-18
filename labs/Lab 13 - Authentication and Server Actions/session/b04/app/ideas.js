"use client";

import { useRef } from "react";
import { createIdeaAction, deleteIdeaAction } from "@/app/actions";
import { PlusCircle, XCircle } from "react-feather";

export default function Ideas({ ideas, user, signal }) {
  const newIdeaForm = useRef();

  return (
    <>
      <header className="flex justify-between">
        <h1 className="font-semibold text-lg">Ideas</h1>
        <div>{user?.id}</div>
      </header>
      <main>
        <div className="border rounded py-2">
          {ideas.map((idea) => (
            <form key={idea.id} className="px-3 justify-between flex">
              <div>{idea.title}</div>
              <button
                formAction={async (formData) => {
                  await deleteIdeaAction(formData);
                  await signal(1);
                }}
              >
                <XCircle size={18} />
              </button>
              <input type="hidden" name="idea-id" value={idea.id} />
            </form>
          ))}
        </div>
        <form
          ref={newIdeaForm}
          action={async (formData) => {
            await createIdeaAction(formData);
            newIdeaForm.current.reset();
            await signal(1);
          }}
          className="justify-between mt-3 flex gap-2 px-3"
        >
          <input className="border rounded p-1" type="text" name="idea-title" />
          <button className="">
            <PlusCircle size={22} />
          </button>
          <input type="hidden" name="user-id" value={user?.id} />
        </form>
      </main>
    </>
  );
}
