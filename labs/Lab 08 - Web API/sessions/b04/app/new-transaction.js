document.addEventListener("DOMContentLoaded", async () => {
  // const res = await fetch("http://localhost:3000/api/accounts", {
  //   method: "GET",
  //   // body: {},
  // });
  // const accounts = await res.json();
  const accounts = JSON.parse(`[
    {
      "balance": 1000,
      "type": "savings",
      "transactions": [
        { "type": "w", "amount": 100 },
        { "type": "w", "amount": 100 }
      ],
      "id": "g6M7vwbsYPeBlDHhWLQyE",
      "createdat": "2023-03-30T19:19:49.294Z"
    },
    {
      "balance": 1000,
      "type": "savings",
      "transactions": [],
      "id": "CCUljKPbTKBxGSAEPaSow",
      "createdat": "2023-03-30T19:20:24.003Z"
    },
    {
      "balance": 1000,
      "type": "savings",
      "transactions": [],
      "id": "2W9xftMcHr84-4MzkzYWH",
      "createdat": "2023-03-30T19:20:24.226Z"
    },
    {
      "balance": 1000,
      "type": "savings",
      "transactions": [],
      "id": "5hC0YSTRvXKB6MiJoUmjK",
      "createdat": "2023-03-30T19:20:24.546Z"
    },
    {
      "balance": 1000,
      "type": "savings",
      "transactions": [],
      "id": "0emqzp-rUIifP905fMkzb",
      "createdat": "2023-03-30T19:20:24.926Z"
    },
    {
      "balance": 1000,
      "type": "savings",
      "transactions": [],
      "id": "MxqAR5MzM-el1y5fbeZia",
      "createdat": "2023-03-30T19:20:25.294Z"
    },
    {
      "balance": 1000,
      "type": "savings",
      "transactions": [],
      "id": "KGdyb8TwJGtnbtbQq9OSm",
      "createdat": "2023-03-30T19:20:25.663Z"
    },
    {
      "balance": 500,
      "type": "current",
      "transactions": [],
      "id": "Ays-kQuR1Jqop6kLJkw0Q",
      "createdat": "2023-03-30T19:20:32.362Z"
    },
    {
      "balance": 500,
      "type": "current",
      "transactions": [],
      "id": "yKK8JHLDYij83QXiKvNgU",
      "createdat": "2023-03-30T19:20:32.744Z"
    },
    {
      "balance": 500,
      "type": "current",
      "transactions": [],
      "id": "DDZoo2Yqn5DqK-6RtwKl9",
      "createdat": "2023-03-30T19:20:33.127Z"
    },
    {
      "balance": 500,
      "type": "current",
      "transactions": [],
      "id": "Tlxp8zjFbm7dkbQUWAg1L",
      "createdat": "2023-03-30T19:20:33.508Z"
    },
    {
      "balance": 500,
      "type": "current",
      "transactions": [],
      "id": "yR_Iu2Z3kfmRaxEn5zeQH",
      "createdat": "2023-03-30T19:20:33.854Z"
    },
    {
      "balance": 500,
      "type": "current",
      "transactions": [],
      "id": "dc7-p6P52wx7va73YjF5-",
      "createdat": "2023-03-30T19:20:34.189Z"
    },
    {
      "balance": 500,
      "type": "current",
      "transactions": [],
      "id": "EBX-7ry7mTAP2HLL9JX5y",
      "createdat": "2023-03-30T19:20:35.661Z"
    },
    {
      "balance": 500,
      "type": "current",
      "transactions": [],
      "id": "3USbp1ngsjvU8RvqKT0Pw",
      "createdat": "2023-03-30T19:20:36.063Z"
    }
  ]
  `);

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
