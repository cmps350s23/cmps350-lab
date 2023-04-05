document.addEventListener("DOMContentLoaded", async () => {
  // const res = await fetch("http://localhost:3000/api/accounts", {
  //   method: "GET",
  // });
  // const accounts = await res.json();
  const accounts = JSON.parse(`[
    {
        "balance": 1000,
        "type": "current",
        "id": "zr0uQhaRBAxcouwuE9Z63",
        "createdat": "2023-03-27T12:40:27.211Z",
        "transactions": [
            {
                "id": "mpEyb-p85qtDFt5Vio4Sq",
                "type": "w",
                "amount": 100,
                "createdat": "2023-03-27T12:47:04.450Z"
            }
        ]
    },
    {
        "balance": 1000,
        "type": "current",
        "id": "flkiKvEZIg8iVLyBtTO-c",
        "createdat": "2023-03-27T12:44:32.438Z"
    },
    {
        "balance": 1000,
        "type": "current",
        "id": "YVCuELI0nXuFi9E53-UC_",
        "createdat": "2023-03-27T12:44:33.233Z"
    },
    {
        "balance": 1000,
        "type": "current",
        "id": "r8v7YcbrxGEjTiq9ahizE",
        "createdat": "2023-03-27T12:44:33.829Z"
    },
    {
        "balance": 2000,
        "type": "savings",
        "id": "LiNhISe-WtqqQhizqGB6w",
        "createdat": "2023-03-27T12:46:36.725Z"
    },
    {
        "balance": 2000,
        "type": "savings",
        "id": "nNtxQNe16-wGdQY-xMBEk",
        "createdat": "2023-03-27T12:46:58.877Z"
    },
    {
        "balance": 2000,
        "type": "savings",
        "id": "RAF5N2bhhodkGw61AhQmc",
        "createdat": "2023-03-27T12:46:59.499Z"
    },
    {
        "balance": 100001,
        "type": "savings",
        "id": "RaxtUD1m52R35qAaKmhYz",
        "createdat": "2023-03-27T12:47:01.110Z"
    },
    {
        "balance": 2000,
        "type": "savings",
        "id": "mpEyb-p85qtDFt5Vio4Sw",
        "createdat": "2023-03-27T12:47:04.450Z"
    }
]`);

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
