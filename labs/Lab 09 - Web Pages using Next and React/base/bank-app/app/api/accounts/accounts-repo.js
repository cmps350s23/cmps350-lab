// npm i fs-extra
import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

export default class AccountsRepo {
    constructor() {
        this.filePath = path.join(process.cwd(), 'app/data/accounts.json')
    }

    async getAccounts(type) {
        const accounts = await fs.readJSON(this.filePath)
        if (type == 'Saving' || type == 'Current')
            return accounts.filter(account => account
                .acctType.toLowerCase() === type.toLowerCase())
        return accounts

    }
    async addAccount(account) {
        account.accountNo = nanoid().slice(0, 4)
        const accounts = await this.getAccounts()
        accounts.push(account)
        await fs.writeJSON(this.filePath, accounts)
        return account
    }

    async updateAccount(account) {
        const accounts = await fs.readJson(this.filePath)
        const index = accounts.findIndex(acc => acc.accountNo == account.accountNo)
        if (index > 0) {
            accounts[index] = account
            await fs.writeJson(this.filePath, accounts)
            return "updated successfully"
        }
        return "Unable to update account because it does not exist"
    }

    async getAccount(accNo) {
        const accounts = await fs.readJson(this.filePath)
        const account = accounts.find(acc => acc.accountNo == accNo)
        if (account)
            return account
        else
            return { errorMessage: 'Account does not exit' }
    }

    async deleteAccount(accNo) {
        const accounts = await fs.readJson(this.filePath)
        const filteredAccounts = accounts.filter(acc => acc.accountNo != accNo)
        await fs.writeJson(this.filePath, filteredAccounts)
        return "deleted successfully"
    }
    async addTransaction(transaction) {
        console.log(transaction);
        transaction.accountNo = parseInt(transaction.accountNo.toString());
        transaction.amount = parseInt(transaction.amount.toString());
        try {
            const accounts = await this.getAccounts();
            const account = accounts.find(account => account.accountNo == transaction.accountNo);

            if (transaction.transType == 'Deposit')
                account.balance += parseInt(transaction.amount);
            else
                account.balance -= parseInt(transaction.amount);

            await fs.writeJson(this.filePath, accounts)
            return { message: 'transaction successful' }
        } catch (err) {
            throw err;
        }
    }
}