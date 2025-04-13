import { NextRequest, NextResponse } from "next/server";
import { existsSync, rmSync, readdirSync, rmdir } from "fs";
import { resolve, join } from "path";

export async function DELETE(req: NextRequest) {
  if (process.env.WEBEDITOR !== "true") {
    return NextResponse.json({ error: "Web editor is disabled." }, { status: 403 });
  }
  if (!(req.headers.get("authorization") === ("Bearer " + process.env.WEBEDITOR_PASSWORD))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.warn("Error parsing JSON (likely client's fault):", error);
    return NextResponse.json({ error: "Invalid JSON data/format!" }, { status: 400 });
  }
  const { path } = body;
  if (!path) { return NextResponse.json({ error: "Path argument is required." }, { status: 400 }); }

  const baseDir = resolve("wiki");
  const filePath = resolve(join(baseDir, `${decodeURIComponent(path)}.md`));
  if (!filePath.startsWith(baseDir)) {
    return NextResponse.json({ error: "Invalid path. Cannot write outside of /wiki." }, { status: 400 });
  }

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: "File does not exist." }, { status: 404 });
  }

  try {
    rmSync(filePath);
    const dirPath = resolve(join(baseDir, decodeURIComponent(path).replace(/\/[^/]+$/, "")));
    if (existsSync(dirPath) && (readdirSync(dirPath).length === 0)) {
      rmdir(dirPath, (err) => {
        if (err) {
          console.error("Successfully deleted page, error deleting directory:", err);
          return NextResponse.json({ error: "Successfully deleted page, but error deleting directory." }, { status: 500 });
        }
      })
    }
    return NextResponse.json({ message: "Successfully deleted page!" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Error deleting file." }, { status: 500 });
  }
}