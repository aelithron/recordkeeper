import { getPageList } from "@/get-pages"
import { WikiLink } from "@/types";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListPages from "./list.module";
import { Metadata } from "next";
import CreatePage from "./create.module";

export const metadata: Metadata = {
  title: "Edit Pages",
}
export const dynamic = 'force-dynamic';

export default function Page() {
  if (process.env.WEBEDITOR !== "true") {
    return (
      <div className="p-8 md:p-20 flex flex-col gap-2 items-center">
        <h1 className="text-3xl font-semibold mb-2"><FontAwesomeIcon icon={faPencil} /> Edit Pages</h1>
        <p>Web editor is disabled.</p>
      </div>
    )
  }
  const pages: WikiLink[] = getPageList();
  return (
    <div className="p-8 md:p-20 flex flex-col gap-2 items-center">
      <h1 className="text-3xl font-semibold mb-2"><FontAwesomeIcon icon={faPencil} /> Edit Pages</h1>
      <CreatePage />
      <p>Select a page to edit:</p>
      <ListPages pages={pages} />
    </div>
  )
}