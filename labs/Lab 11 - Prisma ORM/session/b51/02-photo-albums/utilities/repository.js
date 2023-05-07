import { promises as fs } from "fs";
import path from "path";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  16
);

const albumsPath = "data/albums.json";
const photosDirectory = "public/files";

export async function createAlbum(title) {
  const id = nanoid();
  const albums = JSON.parse(await fs.readFile(albumsPath));
  if (!albums.find((album) => album.title === title)) {
    albums.push({
      id,
      title,
      createdAt: new Date(),
      photos: [],
    });
    await fs.writeFile(albumsPath, JSON.stringify(albums));
    return id;
  }
}

export async function readAlbum(albumID) {
  const albums = JSON.parse(await fs.readFile(albumsPath));
  const album = albums.find((album) => album.id === albumID);
  if (album) {
    return {
      id: album.id,
      title: album.title,
      photos: album.photos,
    };
  }
}

export async function readAlbums() {
  const albums = JSON.parse(await fs.readFile(albumsPath));
  return albums.map((album) => ({
    id: album.id,
    title: album.title,
    photos: album.photos,
  }));
}

export async function updateAlbum(id, photos) {
  const albums = JSON.parse(await fs.readFile(albumsPath));
  const album = albums.find((album) => album.id === id);
  if (album) {
    photos.forEach((photo) => {
      const index = album.photos.findIndex((p) => p === photo);
      if (index !== -1) {
        album.photos.splice(index, 1);
      } else {
        album.photos.push(photo);
      }
    });
    await fs.writeFile(albumsPath, JSON.stringify(albums));
    return true;
  }
}

export async function deleteAlbum(id) {
  const albums = JSON.parse(await fs.readFile(albumsPath));
  const index = albums.findIndex((album) => album.id === id);
  // if (!albums[index].photos.length) {
  albums.splice(index, 1);
  await fs.writeFile(albumsPath, JSON.stringify(albums));
  // }
  return true;
}

export async function createPhoto(blob) {
  const id = nanoid() + "." + blob.type.split("/").slice(-1);
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer, "binary");
  await fs.writeFile(path.join(photosDirectory, id), buffer);
  return id;
}

export async function readPhoto(id) {
  try {
    const stat = await fs.stat(path.join(photosDirectory, id));
    if (stat.isFile()) {
      return id;
    }
  } catch (e) {}
}
