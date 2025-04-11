import type { WikiLink } from "@/types";
import { readdirSync } from "fs";

export function getPageList(): WikiLink[] {
  const links: WikiLink[] = [];
  links.push({ name: "Home", path: "/", type: "home" });
  const entries = readdirSync("wiki", { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    const path = entry.parentPath + "/" + entry.name;
    if (path.startsWith("wiki/")) {
      const finalPath = path.substring("wiki/".length).replace(/\.md$/, "");
      if (entry.isDirectory()) {
        links.push({ name: entry.name, path: finalPath, type: "folder" });
      } else {
        const fileName = finalPath.substring(finalPath.lastIndexOf("/") + 1).replace(/\.[^/.]+$/, "");
        if (fileName === "index") continue;
        links.push({ name: fileName, path: finalPath, type: "file" });
      }
    }
  }
  return links;
}