"use client";
import { useState } from "react";
import { getAuthHeader } from "@/lib/getAuthHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pageName, setPageName] = useState<string>("");
  const [folder, setFolder] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const path = folder ? `${folder}/${pageName}` : pageName;
    const res = await fetch("/api/create", {
      method: "POST",
      headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    });
    const data = await res.json();
    if (res.ok) {
      setIsOpen(false);
      setPageName("");
      setFolder("");
      router.push(`/edit/${path}`);
    } else {
      alert("Error creating page: " + data.error);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      {!isOpen && <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-emerald-500 rounded-full px-3"><FontAwesomeIcon icon={faPlus} /> Create Page</button>}
      {isOpen && <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col md:flex-row gap-2 align-middle bg-slate-500 border-2 border-slate-600 p-3 rounded-xl">
        <input type="text" onChange={(e) => setPageName(e.target.value)} placeholder="Page Name" className="p-2 border-2 border-slate-700 bg-slate-600 text-white rounded-md" />
        <input type="text" onChange={(e) => setFolder(e.target.value)} placeholder="Folder (blank if root)" className="p-2 border-2 border-slate-700 bg-slate-600 text-white rounded-md" />
        <button type="submit" className="p-2 bg-emerald-500 border-emerald-600 border-2 rounded-full px-3">Create</button>
      </form>}
    </div>
  )
}