import { readFileSync } from "fs";
import ReactMarkdown from "react-markdown";

export default function Page({ params }: { params: { page: string[] } }) {
  const filePath = `wiki/${params.page.join("/")}.md`;
  const file = readFileSync(filePath).toString();
  return (
    <div className="p-8 md:p-20 flex flex-col gap-2">
      <h1 className="text-3xl font-semibold">Page Title</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <ReactMarkdown>{file}</ReactMarkdown>
      </div>
    </div>
  );
}