document.addEventListener("DOMContentLoaded", () => {
  console.log("client-side");
  document
    .querySelector("#type")
    .addEventListener("change", (e) => alert(e.target.value));
});
