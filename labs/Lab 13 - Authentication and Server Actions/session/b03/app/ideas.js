"use client";

import { Magic } from "magic-sdk";
import { useState, useRef } from "react";
import { createIdeaAction, deleteIdeaAction } from "@/app/actions";
import { PlusCircle, XCircle } from "react-feather";

export default function Ideas({ ideas, user, signal }) {
  const [magic, setMagic] = useState(
    new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY)
  );
  const newIdeaForm = useRef();

  // useEffect(() => {
  //   setMagic(new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY));
  // }, []);

  const login = async (email) => {
    const token = await magic.auth.loginWithEmailOTP({
      email: "jane@example.com",
    });
  };

  return (
    <>
      <header className="flex justify-between">
        <h1 className="font-semibold text-lg">Ideas</h1>
        <div>{user?.id ?? ""}</div>
      </header>
      <main className="">
        {ideas.map((idea) => (
          <form className="flex gap-x-2" key={idea.id}>
            <div className="grow">{idea.title}</div>
            <button
              formAction={async (formData) => {
                await deleteIdeaAction(formData);
                await signal(1);
              }}
            >
              <XCircle size={22} />
            </button>
            <input type="text" hidden={true} name="idea-id" value={idea.id} />
          </form>
        ))}
        <form
          ref={newIdeaForm}
          className="flex gap-x-2"
          action={async (formData) => {
            await createIdeaAction(formData);
            newIdeaForm.current.reset();
            await signal(1);
          }}
        >
          <input
            className="mt-2 border p-1 rounded grow"
            type="text"
            name="idea-title"
            placeholder="Idea"
          />
          <input type="text" hidden={true} value={user?.id} name="user-id" />
          <button>
            <PlusCircle size={22} />
          </button>
        </form>
        <form>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await login();
            }}
            className="rounded px-2 py-1 bg-zinc-800 text-zinc-50"
          >
            Login
          </button>
        </form>
      </main>
    </>
  );
}
