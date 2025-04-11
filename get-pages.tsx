import type { WikiLink } from "@/types";
import { readdirSync } from "fs";

export function getPageList(): WikiLink[] {
  const links: WikiLink[] = [];
  links.push({ name: "Home", path: "/", type: "home" });

  const entries = readdirSync("wiki", { withFileTypes: true });
  for (const entry of entries) {
    const path = "wiki/" + entry.name;
    const finalPath = entry.name.replace(/\.md$/, "");

    if (entry.isDirectory()) {
      const folderLink: WikiLink = {
        name: entry.name,
        path: finalPath,
        type: "folder",
        children: [],
      };

      const subEntries = readdirSync(path, { withFileTypes: true });
      for (const subEntry of subEntries) {
        if (subEntry.isDirectory()) {
          console.warn(
        `Subdirectories within subdirectories are not supported and will not be rendered: ${path}/${subEntry.name}`
          );
          continue;
        }

        const subPath = subEntry.name.replace(/\.md$/, "");
        const fileName = subPath.replace(/\.[^/.]+$/, "");
        if (fileName === "index") continue;

        folderLink.children?.push({
          name: fileName,
          path: `${finalPath}/${subPath}`,
          type: "file",
        });
      }

      links.push(folderLink);
    } else {
      const fileName = finalPath.replace(/\.[^/.]+$/, "");
      if (fileName === "index") continue;

      links.push({ name: fileName, path: finalPath, type: "file" });
    }
  }

  return links;
}