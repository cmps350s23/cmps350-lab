const baseUrl = '/api/accounts'

class AccountRepo {
    //returns all the accounts depending on the type the user selected
    async getAccounts(acctType) {
        const response = await fetch(`https://localhost:3000/api/accounts?type=${acctType}`)
        return await response.json()
    }

    async deleteAccount(accountNo) {

    }

    async addAccount(account) {

    }

    async updateAccount(account) {

    }

    async addTrans(trans) {

    }
}

export default new AccountRepo()