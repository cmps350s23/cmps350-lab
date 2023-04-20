"use client";

// import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  // const [mounted, setMounted] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [previewURL, setPreviewURL] = useState("");

  useEffect(() => {
    fetchAlbums();
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        setPreviewURL("");
      }
    });
  }, []);

  async function fetchAlbums() {
    const data = await fetch("/api/albums").then((res) => res.json());
    setAlbums(data);
  }

  async function createAlbum() {
    const title = document
      .querySelector("#new-album-title")
      .value.trim()
      .replace(/\s\s+/g, " ");

    if (title !== "") {
      const res = await fetch("/api/albums", {
        method: "POST",
        body: JSON.stringify({ title }),
      });

      if (res.ok) {
        document.querySelector("#new-album-title").value = "";
        await fetchAlbums();
      }
    }
  }

  async function updateAlbum(album, photo) {
    await fetch(`/api/albums/${album}`, {
      method: "PATCH",
      body: JSON.stringify({ photos: [photo] }),
    }).then(async () => await fetchAlbums());
  }

  async function deleteAlbum(album) {
    await fetch(`/api/albums/${album}`, {
      method: "DELETE",
    }).then(async () => await fetchAlbums());
  }

  async function createPhotos(album, files) {
    for (let index = 0; index < files.length; index += 1) {
      const photo = await fetch("/api/photos", {
        method: "POST",
        body: files[index],
      }).then((res) => res.json());
      await updateAlbum(album, photo.url);
    }
  }

  return (
    <>
      <div className="">
        {albums.map((album) => (
          <div
            key={album.id}
            className="p-3 border border-b-0 border-solid border-black first:rounded-t last:border-b last:rounded-b even:bg-slate-100"
          >
            <div className="flex justify-between shrink-0">
              <div className="flex gap-x-2 items-middle shrink-0">
                {/* <button className="w-5 h-5"> */}
                <button onClick={async (e) => await deleteAlbum(album.id)}>
                  <img src="icons/x-circle.svg" />
                </button>
                <h2 className="font-semibold">{album.title}</h2>
              </div>
              <div className="flex gap-x-2 items-middle shrink-0">
                <div className="font-semibold">{album.photos.length}</div>
                <button
                  onClick={(e) =>
                    document.querySelector(`#${album.id}-files`).click()
                  }
                >
                  <img src="icons/arrow-up-circle.svg" />
                </button>
                <form
                  className="hidden"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    type="file"
                    name={`${album.id}-files`}
                    id={`${album.id}-files`}
                    multiple
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files.length) {
                        await createPhotos(album.id, e.target.files);
                        e.target.value = "";
                      }
                    }}
                  />
                </form>
              </div>
            </div>
            <div
              className="grid gap-x-2 gap-y-2"
              style={{
                gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)",
                paddingTop: album.photos.length ? "0.75rem" : "0",
              }}
            >
              {album.photos.map((photo, index) => (
                <div
                  key={index}
                  className="bg-slate-200 border border-slate-500 rounded"
                  style={{ alignSelf: "start" }}
                >
                  <div
                    className="relative group"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => setPreviewURL(photo)}
                  >
                    <button
                      className="invisible group-hover:visible w-4 h-4 absolute top-1 left-1"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await updateAlbum(album.id, photo);
                      }}
                    >
                      <img src="icons/x-circle.svg" />
                    </button>
                    <img src={photo} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <form
          className="p-3 border border-b-0 border-solid border-black first:rounded-t last:border-b last:rounded-b flex justify-between gap-x-2 shrink-0"
          onSubmit={async (e) => {
            e.preventDefault();
            await createAlbum();
          }}
        >
          <input
            className="p-[0.3em] border border-solid border-slate-400 rounded"
            id="new-album-title"
            type="text"
            placeholder="Album"
            // onKeyUp={async (e) => {
            //   if (e.key === "Enter") {
            //     await createAlbum();
            //   }
            // }}
          />
          <button onClick={async (e) => await createAlbum()}>
            <img src="icons/plus-circle.svg" />
          </button>
        </form>
      </div>
      {previewURL && (
        <div className="fixed left-0 top-0 h-screen w-screen bg-black/80">
          <div className="grid h-screen w-screen place-items-center">
            <div className="w-[75%]">
              {/* <button
                className="absolute top-[10px] left-[10px]"
                onClick={(e) => setPreviewURL("")}
              >
                <Image src="icons/x-circle.svg" alt="close" width={20} height={20}/>
              </button> */}
              <img
                className="cursor-pointer rounded"
                src={previewURL}
                onClick={(e) => setPreviewURL("")}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
