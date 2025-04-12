"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/edit");
    } else if (res.status === 401) {
      alert("Incorrect password!");
    } else if (res.status === 429) {
      alert("Too many attempts. Please try again later.");
    } else {
      alert("An unknown error occurred");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-slate-600 border-2 bg-slate-500 p-2 rounded-xl"
        required
      />
      <button type="submit" className="bg-green-400 text-white p-2 rounded-full">Login</button>
    </form>
  );
}