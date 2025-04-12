import { getPageList } from "@/get-pages"
import { WikiLink } from "@/types";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListPages from "./list.module";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Pages",
}

export default function Page() {
  const pages: WikiLink[] = getPageList();
  return (
    <div className="p-8 md:p-20 flex flex-col gap-2 items-center">
      <h1 className="text-3xl font-semibold mb-2"><FontAwesomeIcon icon={faPencil} /> Edit Pages</h1>
      <p>Select a page to edit:</p>
      <ListPages pages={pages} />
    </div>
  )
}