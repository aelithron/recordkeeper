import { NextRequest, NextResponse } from "next/server";
import { existsSync, writeFileSync } from "fs";
import { resolve, join } from "path";

export async function PATCH(req: NextRequest) {
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
  let { path } = body;
  const { content } = body;
  if (!path || !content) { return NextResponse.json({ error: "Path and content arguments are required." }, { status: 400 }); }
  if (path === "/") { path = "index"; }

  const baseDir = resolve("wiki");
  const filePath = resolve(join(baseDir, `${decodeURIComponent(path)}.md`));
  if (!filePath.startsWith(baseDir)) {
    return NextResponse.json({ error: "Invalid path. Cannot write outside of /wiki." }, { status: 400 });
  }

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: "File does not exist." }, { status: 404 });
  }

  try {
    writeFileSync(filePath, content);
    return NextResponse.json({ message: "Successfully written content!" });
  } catch (error) {
    console.error("Error writing file:", error);
    return NextResponse.json({ error: "Error writing file." }, { status: 500 });
  }
}