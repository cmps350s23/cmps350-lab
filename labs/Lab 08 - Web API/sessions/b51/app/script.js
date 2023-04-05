document.addEventListener("DOMContentLoaded", async () => {
  const apiPath = "http://localhost:3000/api/";
  // const res = await fetch(apiPath + "accounts");
  // const accounts = await res.json();

  const accounts = JSON.parse(`[
    {
        "balance": 1000,
        "type": "current",
        "id": "btCr_xiVMwmj22TbXVefY",
        "createdat": "2023-03-27T08:27:55.448Z",
        "transactions": [
            {
                "id": "btCr_xiVMwmj22TbXVefz",
                "amount": 100,
                "type": "w",
                "createdat": "2023-03-27T08:27:55.448Z"
            }
        ]
    },
    {
        "balance": 1000,
        "type": "current",
        "id": "nWqY-zjf8vnRJolFbC69z",
        "createdat": "2023-03-27T08:28:12.653Z"
    },
    {
        "balance": 1000,
        "type": "current",
        "id": "_8rzOp26pHQEhc-dnL9Xw",
        "createdat": "2023-03-27T08:28:38.387Z"
    },
    {
        "balance": 1000,
        "type": "current",
        "id": "pmq6RKEwOTji8dNZgWPaQ",
        "createdat": "2023-03-27T08:33:25.342Z"
    },
    {
        "balance": 1000,
        "type": "current",
        "id": "Zibkr7ZSVeE33nNxOM4kt",
        "createdat": "2023-03-27T08:33:26.020Z"
    },
    {
        "balance": 1000,
        "type": "current",
        "id": "3XV7OQQhvSnjevhpFSlkf",
        "createdat": "2023-03-27T08:33:26.597Z"
    },
    {
        "balance": 0,
        "type": "current",
        "id": "L7PUWSoAHLnKssGIwJKLY",
        "createdat": "2023-03-27T08:33:48.201Z"
    },
    {
        "balance": 0,
        "type": "current",
        "id": "2DFhz--PMd8c9tMyD8-zC",
        "createdat": "2023-03-27T08:33:59.216Z"
    },
    {
        "balance": 1000,
        "type": "current",
        "id": "BALVuvOxsXhinqd_YPCkP",
        "createdat": "2023-03-27T08:34:11.624Z"
    },
    {
        "balance": 1000,
        "type": "savings",
        "id": "6UjFXZF7pXqQgZ5pdQxch",
        "createdat": "2023-03-27T08:34:29.785Z"
    },
    {
        "balance": 1000,
        "type": "savings",
        "id": "FKHSCZY7kr8u1CsOmS384",
        "createdat": "2023-03-27T08:34:30.109Z"
    },
    {
        "balance": 1000,
        "type": "savings",
        "id": "HNt5OrlBW2Z-6LK_HHjut",
        "createdat": "2023-03-27T08:34:31.336Z"
    },
    {
        "balance": 1000,
        "type": "savings",
        "id": "bO9IQlerpqTRNKczZwsnJ",
        "createdat": "2023-03-27T08:34:31.926Z"
    },
    {
        "balance": 1000,
        "type": "savings",
        "id": "KSrv7B-gEEsQroxJa8Qg8ArWcwva",
        "createdat": "2023-03-27T08:34:32.760Z"
    },
    {
        "balance": 1000,
        "type": "savings",
        "id": "ZpefH-FHzH2Bi-L7N7aBL",
        "createdat": "2023-03-27T09:02:33.730Z"
    },
    {
        "balance": 1000,
        "type": "savings",
        "id": "SSSLDk78yg03Drs98M0kI",
        "createdat": "2023-03-27T09:02:34.842Z"
    },
    {
        "balance": 1000,
        "type": "savings",
        "id": "TqYb8nQknlLn-pdJ_Avkk",
        "createdat": "2023-03-27T09:02:35.409Z"
    },
    {
        "balance": 1000,
        "type": "savings",
        "id": "rhiMT2Kk3Otmf8JK_ykIx",
        "createdat": "2023-03-27T09:02:36.433Z"
    }
]`);

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
