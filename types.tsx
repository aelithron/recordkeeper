export type WikiLink = {
  name: string,
  path: string,
  type: "folder" | "file" | "home",
  children?: WikiLink[],
}