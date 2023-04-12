document.addEventListener("DOMContentLoaded", async () => {
  const photos = [];

  const addPhoto = async () => {
    const res = await fetch("https://picsum.photos/240");
    let photo;
    if (res.ok) {
      photo = await res.blob();
    }
    photos.push(photo);

    const img = document.createElement("img");
    img.src = URL.createObjectURL(photo);
    img.addEventListener("click", () => {
      document.querySelector("#gallery").removeChild(img);
    });
    document.querySelector("#gallery").appendChild(img);
  };

  document.querySelector("#add-photo").addEventListener("click", addPhoto);
});
