import { NextRequest, NextResponse } from "next/server";
import { existsSync, writeFileSync, mkdirSync } from "fs";
import { resolve, join } from "path";

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
  const { path } = body;
  if (!path) { return NextResponse.json({ error: "Path argument is required." }, { status: 400 }); }

  const baseDir = resolve("wiki");
  const filePath = resolve(join(baseDir, `${decodeURIComponent(path)}.md`));
  if (!filePath.startsWith(baseDir)) {
    return NextResponse.json({ error: "Invalid path. Cannot write outside of /wiki." }, { status: 400 });
  }

  if (existsSync(filePath)) {
    return NextResponse.json({ error: "File already exists!" }, { status: 400 });
  }

  try {
    const dirPath = filePath.substring(0, filePath.lastIndexOf("/"));
    if (path.includes("/") && !existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
    writeFileSync(filePath, "### This file was just created!\nIf you are a visitor, please wait a few minutes for an editor to finish writing it.");
    return NextResponse.json({ message: "Successfully created page!" });
  } catch (error) {
    console.error("Error creating file:", error);
    return NextResponse.json({ error: "Error creating file." }, { status: 500 });
  }
}