"use client";

import { useState, useEffect } from "react";
import { createUser, readIdeas } from "@/app/actions";
import Ideas from "@/app/ideas";
import Protected from "@/components/protected";

export default function Home() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [ideas, setIdeas] = useState([]);
  const [stale, setStale] = useState(true);

  useEffect(() => {
    async function checkUser() {
      if (!localStorage.getItem("user")) {
        const user = await createUser();
        setUser(user.id);
        localStorage.setItem("user", user.id);
      } else {
        setUser(localStorage.getItem("user"));
      }
    }
    checkUser().then();
  }, []);

  useEffect(() => {
    if (user && stale) {
      readIdeas(user).then((ideas) => setIdeas(ideas));
      setStale(false);
    }
  }, [user, stale]);

  const signal = () => setStale(true);

  return (
    <Protected email={email}>
      <header></header>
      <main className="mx-auto max-w-md">
        <Ideas ideas={ideas} user={user} email={email} signal={signal} />
      </main>
    </Protected>
  );
}
