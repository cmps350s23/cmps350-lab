document.addEventListener("DOMContentLoaded", async () => {
  console.log("loaded");

  document.querySelector("#type").addEventListener("change", (e) => {
    alert(e.target.value);
  });
});
