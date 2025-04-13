import { faFile, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { existsSync, readFileSync } from "fs";
import Link from "next/link";
import Markdown from "react-markdown";
import type { Metadata } from 'next' 
 
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
    title: pageName
  }
}
export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ page: string[] }> }) {
  const { page: pageArray } = await params;
  const filePath = `wiki/${decodeURIComponent(pageArray.join("/"))}.md`;
  let file;
  let pageName;
  let error = false;
  
  // NOTE: There may be a flaw that allows users to access files outside of the wiki folder.
  // This is a very minor security risk, as the app runs in Docker and private pages don't exist.
  // May make sense to fix before posting Kubernetes manifests, as Pods get a kube-api-access mount (/var/run/secrets/kubernetes.io/serviceaccount).
  // It isn't fixed only because I wasn't able to actually make the issue happen, so I'm not sure how to go about fixing it. 
  // decodeURIComponent() may actually prevent this from happening, but I'm noting it anyways! - ael :3

  if (existsSync(filePath)) {
    file = readFileSync(filePath).toString();
    pageName = filePath.split("/").pop()?.replace(".md", "") || "Untitled";
  } else {
    file = "The page you are looking for does not exist. Please check the URL and try again.";
    pageName = "404 Error";
    error = true;
  }

  return (
    <div className="p-8 md:p-20 flex flex-col gap-2 items-center">
      <h1 className="text-3xl font-semibold mb-2"><FontAwesomeIcon icon={faFile} /> {pageName}</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <Markdown>{file}</Markdown>
      </div>
      {error && <Link href="/" className="hover:text-sky-500 bg-slate-500 rounded-full p-2"><FontAwesomeIcon icon={faHome} /> Go to Home</Link>}
    </div>
  );
}