"use client";
import { useState } from "react";
import { getAuthHeader } from "@/lib/getAuthHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function MovePage({ currentPageName, currentPageFolder }: { currentPageName: string, currentPageFolder: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pageName, setPageName] = useState<string>(currentPageName);
  const [folder, setFolder] = useState<string>(currentPageFolder);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const oldPath = currentPageFolder ? `${currentPageFolder}/${currentPageName}` : currentPageName;
    const path = folder ? `${folder}/${pageName}` : pageName;
    if (oldPath === path) {
      alert("You cannot move the page to the same location.");
      return;
    }
    const confirmMove = confirm(`Are you sure you want to move the page from ${oldPath} to ${path}? (Make sure to save before moving, as it forgets any unsaved changes!)`);
    if (!confirmMove) {
      setIsOpen(false);
      setPageName(currentPageName);
      setFolder(currentPageFolder);
      return;
    }
    const res = await fetch("/api/move", {
      method: "POST",
      headers: {
        ...getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPath, path }),
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

  if (!isOpen) { return <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-slate-500 rounded-xl px-3 mt-4"><FontAwesomeIcon icon={faArrowRight} /> Move Page</button> }
  if (currentPageFolder === "" && currentPageName === "index" && isOpen) {
    return (
      <div className="flex flex-row gap-2 align-middle bg-slate-500 border-2 border-slate-600 mt-4 p-3 rounded-xl text-center justify-between">
        <h1>You are unable to move the root (aka home) page~</h1>
        <button onClick={() => setIsOpen(!isOpen)}><FontAwesomeIcon icon={faX} /></button>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2 items-center">
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col md:flex-row gap-2 align-middle bg-slate-500 border-2 border-slate-600 mt-4 p-3 rounded-xl">
        <input type="text" onChange={(e) => setPageName(e.target.value)} value={pageName} placeholder="Page Name" className="p-2 border-2 border-slate-700 bg-slate-600 text-white rounded-md" />
        <input type="text" onChange={(e) => setFolder(e.target.value)} value={folder} placeholder="Folder (blank if root)" className="p-2 border-2 border-slate-700 bg-slate-600 text-white rounded-md" />
        <button type="submit" className="p-2 bg-gray-500 border-gray-600 border-2 rounded-full px-3">Move</button>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="ml-2"><FontAwesomeIcon icon={faX} /></button>
      </form>
    </div>
  )
}