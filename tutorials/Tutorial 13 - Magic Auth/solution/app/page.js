"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity } from "react-feather";

export default function Home() {
  const [user, setUser] = useState();
  const [secret, setSecret] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          router.push("/auth");
        }
      })
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (user) {
      fetch("/api/secret")
        .then((response) => response.json())
        .then((data) => setSecret(data))
        .catch((error) => console.error(error));
    }
  }, [user]);

  return (
    user && (
      <main className="flex justify-between gap-3 rounded border p-5">
        <div className="flex flex-col">
          <span>{user?.name}</span>
          <span className="font-mono text-sm">{user.email}</span>
          <span>{new Date(user.created).toLocaleString()}</span>
          <span>{user.provider}</span>
          <span className="font-semibold">{secret?.secret}</span>
          <span className="mt-2 underline">
            <Link href="/auth">
              <Activity size={18} />
            </Link>
          </span>
        </div>
        <div className="w-32">
          <img
            className="h-32 w-32 rounded-full"
            src={user?.picture}
            alt="user picture"
          />
        </div>
      </main>
    )
  );
}
