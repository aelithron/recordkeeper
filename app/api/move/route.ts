import { NextRequest, NextResponse } from "next/server";
import { join, resolve } from "path";
import { existsSync, mkdirSync, readdirSync, renameSync, rmdir } from "fs";

export async function POST(req: NextRequest) {
  if (process.env.WEBEDITOR !== "true") {
    return NextResponse.json({ error: "Web editor is disabled." }, { status: 403 });
  }
  if (!(decodeURIComponent(req.headers.get("authorization") || "") === ("Bearer " + process.env.WEBEDITOR_PASSWORD))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.warn("Error parsing JSON (likely client's fault):", error);
    return NextResponse.json({ error: "Invalid JSON data/format!" }, { status: 400 });
  }
  const { path, oldPath } = body;
  if (!path || !oldPath) { return NextResponse.json({ error: "path and oldPath arguments are required." }, { status: 400 }); }
  if (path === oldPath) {
    return NextResponse.json({ error: "You cannot move the page to the same location." }, { status: 400 });
  }
  if (oldPath === "index") {
    return NextResponse.json({ error: "You cannot move the root page." }, { status: 400 });
  }

  const baseDir = resolve("wiki");
  const oldFilePath = resolve(join(baseDir, `${decodeURIComponent(oldPath)}.md`));
  const newFilePath = resolve(join(baseDir, `${decodeURIComponent(path)}.md`));
  if (!oldFilePath.startsWith(baseDir) || !newFilePath.startsWith(baseDir)) {
    return NextResponse.json({ error: "Invalid path. Cannot write outside of /wiki." }, { status: 400 });
  }

  if (!existsSync(oldFilePath)) {
    return NextResponse.json({ error: "File does not exist." }, { status: 404 });
  }

  if (existsSync(newFilePath)) {
    return NextResponse.json({ error: "A different file already exists at that location." }, { status: 400 });
  }
  
  try {
    const newDirPath = resolve(join(baseDir, decodeURIComponent(path).replace(/\/[^/]+$/, "")));
    if (!existsSync(newDirPath)) { mkdirSync(newDirPath, { recursive: true }); }
    renameSync(oldFilePath, newFilePath);
    const oldDirPath = resolve(join(baseDir, decodeURIComponent(oldPath).replace(/\/[^/]+$/, "")));
    if (existsSync(oldDirPath) && (readdirSync(oldDirPath).length === 0)) {
      rmdir(oldDirPath, (err) => {
        if (err) {
          console.error("Successfully moved page, error deleting directory:", err);
          return NextResponse.json({ error: "Successfully moved page, but error deleting directory." }, { status: 500 });
        }
      })
    }
    return NextResponse.json({ message: "Successfully moved page!" });
  } catch (error) {
    console.error("Error moving file:", error);
    return NextResponse.json({ error: "Error moving page." }, { status: 500 });
  }
}