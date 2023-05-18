"use client";

import { useState, useEffect } from "react";
import { Magic } from "magic-sdk";

export default function Login() {
  const [email, setEmail] = useState();
  const [magic, setMagic] = useState(
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC)
  );

  useEffect(() => {
    async function checkLogin() {
      if (await magic.user.isLoggedIn()) {
        const info = await magic.user.getInfo();
        console.log(info);
        setEmail(info.email);
      }
    }
    checkLogin().then();
  }, []);

  async function login() {
    const result = await magic.auth.loginWithEmailOTP({
      email: "georges.younes@qu.edu.qa",
    });
    console.log(result);
  }

  return (
    <button className="border rounded px-2 py-1" onClick={login}>
      Login
    </button>
  );
}
