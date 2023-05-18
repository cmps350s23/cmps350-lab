// import { readIdeas } from "@/app/actions";
// import Ideas from "@/app/ideas";

// export default async function Home() {
//   const ideas = await readIdeas();

//   return <Ideas ideas={ideas} />;
// }

"use client";

import { useState, useEffect } from "react";
import { createUserAction } from "@/app/actions";
import { readIdeas } from "@/app/actions";
import Ideas from "@/app/ideas";

export default function Home() {
  const [ideas, setIdeas] = useState([]);
  const [user, setUser] = useState();
  const [stale, setStale] = useState(1);

  const signal = setStale;

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      createUserAction().then((user) => {
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

  return <Ideas ideas={ideas} user={user} signal={signal} />;
}
