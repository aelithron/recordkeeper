"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  function handleLogout() {
    const logoutUrl = `${window.location.origin}/api/logout`;
    fetch(logoutUrl).then(() => {
      router.push("/editor-login");
    });
  }
  return <button onClick={() => handleLogout()} className="underline hover:text-sky-500">Log Out</button>;
}