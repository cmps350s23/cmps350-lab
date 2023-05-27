"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { Loader } from "react-feather";

export default function Login() {
  const [magic, setMagic] = useState();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setMagic(
      new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY, {
        extensions: [new OAuthExtension()],
      })
    );
  }, []);

  useEffect(() => {
    async function login() {
      // if (
      //   searchParams.get("provider") &&
      //   searchParams.get("state") &&
      //   searchParams.get("magic_credential") &&
      //   searchParams.get("magic_oauth_request_id")
      // ) {
      if (searchParams.get("magic_credential")) {
        const result = await magic.oauth.getRedirectResult();
        const data = {
          email: result.oauth.userInfo.email,
          name: result.oauth.userInfo.name,
          picture: result.oauth.userInfo.picture,
          provider: result.oauth.provider,
        };

        return { token: result.magic.idToken, data };
      }
    }

    if (magic && searchParams && router) {
      login()
        .then((result) =>
          fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(result),
          })
        )
        .then((_) => router.push("/"))
        .catch((error) => console.error(error));
    }
  }, [magic, searchParams, router]);

  return (
    <main className="flex justify-around">
      <Loader size={18} />
    </main>
  );
}
