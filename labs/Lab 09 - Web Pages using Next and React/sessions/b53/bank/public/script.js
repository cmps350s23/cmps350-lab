document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("http://localhost:3001/api/accounts", {
    method: "GET",
  });
  const accounts = await res.json();

  document.querySelector("#account-id").innerHTML = accounts
    .map((account) => `<option value="${account.id}">${account.id}</option>`)
    .join("");

  document
    .querySelector("#new-transaction")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = new FormData(document.querySelector("#new-transaction"));
      const body = {};
      for (const [key, value] of data) {
        body[key] = value;
      }
      console.log(body);

      const res = await fetch(
        `http://localhost:3000/api/accounts/${body["account-id"]}/transaction`,
        {
          method: "POST",
          body,
        }
      );
      const transaction = res.json();
    });
});
