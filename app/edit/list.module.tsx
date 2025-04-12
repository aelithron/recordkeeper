"use client";
import { WikiLink } from "@/types";
import { faFolder, faFile, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export const dynamic = 'force-dynamic';

export default function ListPages({ pages }: { pages: WikiLink[] }) {
  const [openFolder, setOpenFolder] = useState<string>("");
  return (
    <div>
      {pages.map((link) => (
        <div key={link.path} className="flex flex-col gap-2">
          {link.type === "folder" && <div>
            <button onClick={() => openFolder === link.path ? setOpenFolder("") : setOpenFolder(link.path)} className="flex items-center gap-2 text-white hover:text-sky-500 ml-6">
              <FontAwesomeIcon icon={faFolder} /> {link.name}
            </button>
            {openFolder === link.path && <div className="ml-6">
              {link.children?.map((child) => (
                <Link
                  key={child.path}
                  href={`/edit/${child.path}`}
                  className="flex items-center gap-2 text-white hover:text-sky-500 ml-6"
                >
                  <FontAwesomeIcon icon={faFile} />
                  <span>{child.name}</span>
                </Link>
              ))}
            </div>}
          </div>}
          {(link.type === "file") && <Link
            href={`/edit/${link.path}`}
            className="flex items-center gap-2 text-white hover:text-sky-500 ml-6"
          >
            <FontAwesomeIcon icon={faFile} />
            <span>{link.name}</span>
          </Link>}
          {(link.type === "home") && <Link
            href={`/edit/index`}
            className="flex items-center gap-2 text-white hover:text-sky-500 ml-6"
          >
            <FontAwesomeIcon icon={faHome} />
            <span>{link.name}</span>
          </Link>}
        </div>
      ))}
    </div>
  )
}