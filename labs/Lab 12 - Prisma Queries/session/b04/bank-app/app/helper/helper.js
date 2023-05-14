const faker = require('faker');

const owners = [];

// Generate 10 random owners
for (let i = 1; i <= 10; i++) {
    const owner = {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        accounts: [],
    };

    // Generate a random number of accounts for each owner (1-3)
    const numAccounts = faker.datatype.number({ min: 1, max: 3 });
    for (let j = 1; j <= numAccounts; j++) {
        const account = {
            accountNo: faker.datatype.uuid(),
            acctType: faker.finance.accountName(),
            balance: faker.finance.amount(),
            Transaction: [],
            ownerId: owner.id,
        };

        // Generate a random number of transactions for each account (0-5)
        const numTransactions = faker.datatype.number({ max: 5 });
        for (let k = 1; k <= numTransactions; k++) {
            const transaction = {
                transType: faker.random.arrayElement(['deposit', 'withdrawal']),
                amount: faker.finance.amount(),
                date: faker.date.past(),
                accountNo: account.accountNo,
            };
            account.Transaction.push(transaction);
        }

        owner.accounts.push(account);
    }

    owners.push(owner);
}

console.log(JSON.stringify({ Owner: owners }, null, 2));
