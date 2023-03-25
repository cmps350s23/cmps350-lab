document.addEventListener("DOMContentLoaded", async () => {
  const addPhoto = async () => {
    const res = await fetch("https://picsum.photos/200");
    const photo = await res.blob();

    const photoImg = document.createElement("img");
    photoImg.src = URL.createObjectURL(photo);
    photoImg.addEventListener("click", () =>
      document.querySelector("#gallery").removeChild(photoImg)
    );
    document.querySelector("#gallery").appendChild(photoImg);
  };

  document.querySelector("#add-photo").addEventListener("click", addPhoto);
});
