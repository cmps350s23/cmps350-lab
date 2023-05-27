"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { GitHub, Loader } from "react-feather";

export default function Auth() {
  const router = useRouter();
  const [magic, setMagic] = useState();
  // const [user, setUser] = useState();
  const [action, setAction] = useState();

  useEffect(() => {
    setMagic(
      new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY, {
        extensions: [new OAuthExtension()],
      })
    );

    fetch("/api/user")
      .then((response) => {
        if (response.ok) {
          setAction("Logout");
          return response.json();
        } else {
          setAction("Login");
        }
      })
      .then((data) => {
        // setUser(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <form
        className="flex justify-around"
        onSubmit={async (event) => {
          event.preventDefault();

          if (!magic) {
            return;
          }

          if (action === "Logout") {
            await fetch("/api/logout");
            await magic.user.logout();
            router.push("/");
          } else if (action === "Login") {
            await magic.oauth.loginWithRedirect({
              provider: "github",
              redirectURI: new URL("/login", window.location.origin).href,
            });
          }
        }}
      >
        {action ? (
          <button className="login flex items-center gap-2 rounded border px-2 py-1">
            <GitHub size={18} />
            <span>{action}</span>
          </button>
        ) : (
          <Loader size={18} />
        )}
      </form>
    </main>
  );
}
