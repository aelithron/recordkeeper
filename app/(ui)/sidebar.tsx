"use client";
import type { WikiLink } from "@/types";
import { faBars, faFile, faFolder, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Sidebar({ pages }: { pages: WikiLink[] }) {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openFolder, setOpenFolder] = useState<string>("");
  if (!isOpen) {
    return <button onClick={() => setIsOpen(!isOpen)} className="rounded-full bg-slate-500 px-3 py-2 ml-4 mt-4 fixed hover:text-sky-500 text-white"><FontAwesomeIcon icon={faBars} /></button>;
  }

  return (
    <div className="bg-slate-500 flex flex-col gap-2 opacity-97 w-screen md:w-1/4 h-full fixed top-0 left-0 z-50 overflow-y-auto">
      <div className="flex justify-between">
        <button onClick={() => setIsOpen(!isOpen)} className="px-3 py-2 ml-4 mt-4 text-left hover:text-sky-500 text-white"><FontAwesomeIcon icon={faBars} /></button>
        <a href="https://github.com/aelithron/recordkeeper" target="_blank" className="px-3 py-2 mr-4 mt-4 text-left hover:text-sky-500 text-white"><FontAwesomeIcon icon={faGithub} /></a>
      </div>
      <h1 className="font-semibold text-xl text-center">Recordkeeper</h1>
      {pages.map((link) => (
        <div key={link.path}>
          {link.type === "folder" && <div>
            <button onClick={() => openFolder === link.path ? setOpenFolder("") : setOpenFolder(link.path)} className="flex items-center gap-2 text-white hover:text-sky-500 ml-6">
              <FontAwesomeIcon icon={faFolder} /> {link.name}
            </button>
            {openFolder === link.path && <div className="ml-6">
              {link.children?.map((child) => (
                <Link
                  key={child.path}
                  href={`/${child.path}`}
                  className="flex items-center gap-2 text-white hover:text-sky-500 ml-6"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faFile} />
                  <span className={`${decodeURIComponent(pathName) === `/${child.path}` && "underline"}`}>{child.name}</span>
                </Link>
              ))}
            </div>}
          </div>}
          {(link.type === "file" || link.type === "home") && <Link
            href={`/${link.path}`}
            className="flex items-center gap-2 text-white hover:text-sky-500 ml-6"
            onClick={() => setIsOpen(false)}
          >
            {link.type === "file" && <FontAwesomeIcon icon={faFile} />}
            {link.type === "home" && <FontAwesomeIcon icon={faHome} />}
            <span className={`${decodeURIComponent(pathName) === `/${link.path}` && "underline"}`}>{link.name}</span>
          </Link>}
        </div>
      ))}
    </div>
  );
}