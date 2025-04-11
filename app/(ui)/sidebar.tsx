"use client";
import type { WikiLink } from "@/types";
import { faBars, faFile, faFolder, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar({ pages }: { pages: WikiLink[] }) {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [path, setPath] = useState<string>("/");
  if (!isOpen) {
    return <button onClick={() => setIsOpen(!isOpen)} className="rounded-full bg-slate-500 px-3 py-2 ml-4 mt-4 fixed hover:text-sky-500 text-white"><FontAwesomeIcon icon={faBars} /></button>;
  }

  return (
    <div className="bg-slate-500 flex flex-col gap-2 w-1/4 h-full fixed top-0 left-0 z-50 overflow-y-auto">
      <button onClick={() => setIsOpen(!isOpen)} className="px-3 py-2 ml-4 mt-4 text-left hover:text-sky-500 text-white"><FontAwesomeIcon icon={faBars} /></button>
      <h1 className="font-semibold text-xl text-center">Recordkeeper</h1>
      {pages.map((link) => (
        <div key={link.path}>
          {link.type === "folder" && <button onClick={() => {setPath(link.path)}} className="flex items-center gap-2 text-white hover:text-sky-500 ml-6">
            <FontAwesomeIcon icon={faFolder} /> {link.name}
          </button>}
          {link.type === "file" && <Link
            href={link.path}
            className="flex items-center gap-2 text-white hover:text-sky-500 ml-6"
            onClick={() => setIsOpen(false)}
          >
            {link.type === "file" && <FontAwesomeIcon icon={faFile} />}
            {link.type === "home" && <FontAwesomeIcon icon={faHome} />}
            <span className={`${pathName === link.path && "underline"}`}>{link.name}</span>
          </Link>}
        </div>
      ))}
    </div>
  );
}