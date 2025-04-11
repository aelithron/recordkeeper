import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { readFileSync, existsSync } from "fs";
import ReactMarkdown from "react-markdown";

export default function Home() {
  let file;
  if (existsSync("wiki/index.md")) {
    file = readFileSync("wiki/index.md").toString();
  } else {
    file = "# The wiki has no `index.md` file! This is an error, please create one!"
    console.error("The wiki has no index.md file! This is an error, please create one!");
  }

  return (
    <div className="p-8 md:p-20 flex flex-col gap-2">
      <h1 className="text-3xl font-semibold"><FontAwesomeIcon icon={faHome} /> Home</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <ReactMarkdown>{file}</ReactMarkdown>
      </div>
    </div>
  );
}