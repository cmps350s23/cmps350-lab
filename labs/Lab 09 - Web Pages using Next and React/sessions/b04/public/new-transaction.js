document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/api/accounts", {
    method: "GET",
    // body: {},
  });
  const accounts = await res.json();

  document.querySelector("#account").addEventListener("change", () => {
    document.querySelector(
      "#create-transaction"
    ).action = `http://localhost:3000/api/accounts/${
      document.querySelector("#account").value
    }/transactions`;
  });

  document.querySelector("#account").innerHTML = accounts
    .map((account) => `<option value="${account.id}">${account.id}</option>`)
    .join("");

  document
    .querySelector("#create-transaction")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(
        document.querySelector("#create-transaction")
      );

      const body = {};
      for (const [key, value] of formData) {
        body[key] = value;
      }
      console.log(body);

      const res = await fetch(
        `http://localhost:3000/api/accounts/${body.account}/transactions`,
        {
          method: "POST",
          body: JSON.stringify({
            amount: body.amount,
            type: body.type,
          }),
        }
      );

      const tran = await res.json();
    });
});
