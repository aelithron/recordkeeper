import { faFile, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { existsSync, readFileSync } from "fs";
import Link from "next/link";
import type { Metadata } from 'next'
import EditPage from "./edit.module";
 
 
export async function generateMetadata({ params }: { params: Promise<{ page: string[] }> },): Promise<Metadata> {
  const { page: pageArray } = await params;
  const filePath = `wiki/${decodeURIComponent(pageArray.join("/"))}.md`;
  let pageName;
  if (existsSync(filePath)) {
    pageName = filePath.split("/").pop()?.replace(".md", "") || "Untitled";
  } else {
    pageName = "404 Error";
  }
 
  return {
    title: `Edit ${pageName}`
  }
}
export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ page: string[] }> }) {
  const { page: pageArray } = await params;
  const filePath = `wiki/${decodeURIComponent(pageArray.join("/"))}.md`;
  let file;
  let pageName;
  let error = false;

  if (existsSync(filePath)) {
    file = readFileSync(filePath).toString();
    pageName = filePath.split("/").pop()?.replace(".md", "") || "Untitled";
  } else {
    file = "The page you are looking for does not exist. Please check the URL and try again.";
    pageName = "404 Error";
    error = true;
  }

  return (
    <div className="p-8 md:p-20 flex flex-col gap-2 items-center text-center justify-center place-content-center">
      <h1 className="text-3xl font-semibold mb-2"><FontAwesomeIcon icon={faFile} /> {pageName}</h1>
      {!error && <EditPage pageContent={file} path={decodeURIComponent(pageArray.join("/"))} />}
      {error && <Link href="/" className="hover:text-sky-500 bg-slate-500 rounded-full p-2"><FontAwesomeIcon icon={faHome} /> Go Home</Link>}
    </div>
  );
}