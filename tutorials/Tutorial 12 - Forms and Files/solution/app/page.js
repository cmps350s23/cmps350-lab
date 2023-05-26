"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [documents, setDocuments] = useState([]);
  const [stale, setStale] = useState(true);

  useEffect(() => {
    if (stale) {
      fetch("/api/documents")
        .then((response) => response.json())
        .then((data) => setDocuments(data));
      setStale(false);
    }
  }, [stale]);

  return (
    <main className="p-4">
      <div>
        {documents.map((document) => (
          <form key={document.id} className="mb-2 flex items-center gap-2">
            {/* <div>{document.id}</div> */}
            <div>{document.name}</div>
            <div>{document.type}</div>
            <Link
              className="rounded bg-green-600 px-2 py-1 text-zinc-100"
              href={`/api/documents/${document.id}`}
              download={document.name}
              target="_blank"
            >
              Download
            </Link>
            <button
              className="rounded bg-red-600 px-2 py-1 text-zinc-100"
              onClick={async (event) => {
                event.preventDefault();
                const response = await fetch(`/api/documents/${document.id}`, {
                  method: "DELETE",
                });
                if (response.ok) {
                  setStale(true);
                }
              }}
            >
              Delete
            </button>
          </form>
        ))}
      </div>
      <form>
        <label
          htmlFor="files-input"
          className="cursor-pointer rounded bg-zinc-600 px-2 py-1 text-zinc-100"
        >
          Upload
        </label>
        <input
          className="hidden"
          type="file"
          id="files-input"
          multiple={true}
          accept="*"
          onChange={async (event) => {
            let success = false;
            const files = event.target.files;
            // if (files.length) {
            for (let k = 0; k < files.length; k += 1) {
              const formData = new FormData();
              formData.append("file", files[k]);

              const response = await fetch("/api/documents", {
                method: "POST",
                body: formData,
              });
              if (response.ok) {
                success = true;
              }
            }

            if (success) {
              setStale(true);
            }
            event.target.value = "";
            // }
          }}
        />
      </form>
    </main>
  );
}
