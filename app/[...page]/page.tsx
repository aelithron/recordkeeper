import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { existsSync, readFileSync } from "fs";
import ReactMarkdown from "react-markdown";

export default async function Page({ params }: { params: { page: string[] } }) {
  const filePath = `wiki/${(await(params)).page.join("/")}.md`;
  let file;
  let pageName;
  if (existsSync(filePath)) {
    file = readFileSync(filePath).toString();
    pageName = filePath.split("/").pop()?.replace(".md", "") || "Untitled";
  } else {
    file = "The page you are looking for does not exist. Please check the URL and try again.";
    pageName = "404 Error";
  }

  return (
    <div className="p-8 md:p-20 flex flex-col gap-2">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faFile} /> {pageName}</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <ReactMarkdown>{file}</ReactMarkdown>
      </div>
    </div>
  );
}