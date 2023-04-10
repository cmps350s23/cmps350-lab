document.addEventListener("DOMContentLoaded", async () => {
  const apiPath = "/api/";
  const res = await fetch(apiPath + "accounts");
  const accounts = await res.json();

  document.querySelector("#new-transaction").addEventListener("submit", (e) => {
    e.preventDefault();

    // capture values using FormData

    // create transaction object
    const res = fetch(`/api/accounts/${accountid}/transactions`, {
      method: "POST",
      body: {
        accountid: 123,
        type: "w",
        amount: 10,
      },
    });
  });

  document.querySelector("#account-id").innerHTML = accounts
    .map((account) => `<option value=${account.id}">${account.id}</option>`)
    .join("");
});
