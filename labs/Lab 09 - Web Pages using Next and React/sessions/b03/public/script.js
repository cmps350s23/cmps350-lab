document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("http://localhost:3000/api/accounts", {
    method: "GET",
    // body: {},
  });
  const accounts = await res.json();

  document.querySelector("#account").innerHTML = accounts
    .map((account) => `<option value="${account.id}">${account.id}</option>`)
    .join("");

  document
    .querySelector("#new-transaction")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = document.querySelector("#new-transaction");
      const data = new FormData(form);

      const res = await fetch("/api/accounts/${}/transactions", {
        method: "POST",
        body: {
          // type: ,
          // balance: ,
        },
      });
      const transaction = await res.json();
    });
});
