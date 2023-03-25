document.addEventListener("DOMContentLoaded", async () => {
  const addPhoto = async () => {
    const res = await fetch("https://picsum.photos/240");
    const data = await res.blob();

    const photoImg = document.createElement("img");
    // photoImg.src = "https://picsum.photos/240";
    photoImg.src = URL.createObjectURL(data);
    photoImg.addEventListener("click", () =>
      document.querySelector("#gallery").removeChild(photoImg)
    );

    document.querySelector("#gallery").appendChild(photoImg);
  };

  document.querySelector("#add-photo").addEventListener("click", addPhoto);
});
