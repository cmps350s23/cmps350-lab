"use client";

import { useState, useEffect, useRef } from "react";
import { readIdeas, createUser } from "@/app/actions";
import { Magic } from "magic-sdk";
import Ideas from "@/app/ideas";

// export default async function Home() {
//   const ideas = await readIdeas();

//   return <Ideas ideas={ideas} />;
// }

export default function Home() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [ideas, setIdeas] = useState([]);
  const [stale, setStale] = useState(true);
  const [magic, setMagic] = useState(
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC)
  );
  const emailInput = useRef();

  async function signal() {
    setStale(true);
    // setIdeas(await readIdeas());
  }

  async function login(email) {
    const result = await magic.auth.loginWithEmailOTP({
      email,
    });
    console.log(result);
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    } else {
      createUser().then((user) => {
        setUser(user.id);
        localStorage.setItem("user", user.id);
      });
    }

    magic.user.getInfo().then((info) => setEmail(info.email));
  }, []);

  useEffect(() => {
    if (stale) {
      readIdeas(user).then((ideas) => setIdeas(ideas ?? []));
      setStale(false);
    }
  }, [stale]);

  useEffect(() => {
    readIdeas(user).then((ideas) => setIdeas(ideas ?? []));
  }, [user]);

  return (
    <div>
      <Ideas ideas={ideas} user={user} email={email} signal={signal} />
      <form className="flex gap-x-2 mt-2">
        <input
          className="grow border rounded p-1"
          type="text"
          placeholder="Email address"
          ref={emailInput}
        />
        <button
          className="bg-zinc-900 text-zinc-100 font-medium px-2 py-1 rounded"
          onClick={async (e) => {
            e.preventDefault();
            await login(emailInput.current.value);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
