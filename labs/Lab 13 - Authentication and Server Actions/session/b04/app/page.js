"use client";

import { useState, useEffect } from "react";
import Ideas from "@/app/ideas";
import { createUser, readIdeas } from "@/app/actions";
import { Magic } from "magic-sdk";

// export default async function Home() {
//   const ideas = await readIdeas();

//   return <Ideas ideas={ideas} user={user} />;
// }

export default function Home() {
  const [user, setUser] = useState();
  const [ideas, setIdeas] = useState([]);
  const [stale, setStale] = useState(1);
  const [emailInput, setEmailInput] = useState("");
  const [magic, setMagic] = useState(
    new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY)
  );

  const signal = setStale;

  const login = async (e) => {
    e.preventDefault();
    const token = await magic.auth.loginWithEmailOTP({ email: emailInput });
    console.log(token);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      createUser().then((user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      });
    }
  }, []);

  useEffect(() => {
    if (user && stale) {
      readIdeas(user.id).then((ideas) => setIdeas(ideas));
      setStale(0);
    }
  }, [user, stale]);

  return (
    <>
      <Ideas ideas={ideas} user={user} signal={signal} />
      <form onSubmit={login}>
        <input
          className="border rounded p-1"
          type="email"
          placeholder="jane@doe.com"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <button className="rounded bg-zinc-800 text-zinc-50 px-2 py-1">
          Login
        </button>
      </form>
    </>
  );
}
