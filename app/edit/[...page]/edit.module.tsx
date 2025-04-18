"use client";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getAuthHeader } from "@/lib/getAuthHeader";
import { useRouter } from "next/navigation";

export default function EditPage({ pageContent, path }: { pageContent: string, path: string }) {
  const [content, setContent] = useState(pageContent);
  const router = useRouter();
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) {
      alert("Please enter some content before saving.");
      return;
    }
    const response = await fetch("/api/page", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify({ "path": path, "content": content }),
    });
    if (response.ok) {
      alert("Changes saved successfully!");
    } else {
      try {
        const errorData = await response.json();
        alert(`Error saving changes: ${errorData.error}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        alert("Error saving changes: Unknown error occurred.");
      }
    }
  }

  const deletePage = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this page? This action cannot be undone.");
    if (confirmDelete) {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({ "path": path }),
      });
      if (response.ok) {
        alert("Page deleted successfully!");
        router.push("/edit");
      } else {
        try {
          const errorData = await response.json();
          alert(`Error deleting page: ${errorData.error}`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          alert("Error deleting page: Unknown error occurred.");
        }
      }
    }
  }

  return (
    <form className="flex flex-col gap-2 justify-center items-center text-center" onSubmit={handleSave}>
      <textarea
        className="max-w-screen-md w-[150%] md:w-[200%] p-4 border border-gray-300 rounded-md"
        value={content}
        rows={10}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Edit the page content here..."
      />
      <div className="grid gap-2 grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1">
        <button
          type="submit"
          className="bg-green-500 text-white rounded-xl p-2 hover:text-sky-500"
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Save Changes
        </button>
        <a href="https://commonmark.org/help" target="_blank" className="bg-blue-500 p-2 text-white rounded-xl no-underline hover:text-sky-500">
          <FontAwesomeIcon icon={faMarkdown} className="mr-2" />
          Markdown Guide
        </a>
        <button type="button" onClick={() => deletePage()} className="bg-red-500 text-white rounded-xl p-2 hover:text-sky-500">
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete Page
        </button>
      </div>
    </form>
  );
}