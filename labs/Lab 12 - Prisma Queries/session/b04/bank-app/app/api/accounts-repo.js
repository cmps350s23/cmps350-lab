import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class AccountsRepo {
  constructor() {}

  async getAccounts(type) {
    try {
      const query = {
        select: {
          acctType: true,
          balance: true,
          owner: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        // include: {
        //   owner: {
        //     select: {
        //       firstName: true,
        //       lastName: true,
        //     },
        //   },
        // },
      };

      if (type === "Savings" || type === "Current") {
        query.where = {
          acctType: type,
        };
      }

      const result = await prisma.account.findMany(query);
      return { error: 0, payload: result };
    } catch (err) {
      console.log(err);
      return { error: 1, message: err.message };
    }
  }

  async addAccount(account) {
    try {
      const acc = await prisma.account.create({
        data: account,
      });
      return { error: 0, payload: acc };
    } catch (error) {
      return { error: 1, message: error.message };
    }
  }

  async updateAccount(account, accountNo) {
    // update account
    console.log("updateAccount called", accountNo);
    const updatedAccount = await prisma.account.update({
      where: { accountNo },
      data: account,
    });

    if (updatedAccount) return "updated successfully";

    return "Unable to update account because it does not exist";
  }

  async getAccount(accNo) {
    console.log("getAccount called");
    const account = await prisma.account.findUnique({
      where: {
        accountNo: accNo,
      },
    });

    if (account) return account;
    else return { errorMessage: "Account does not exit" };
  }

  async deleteAccount(accNo) {
    try {
      const count = await prisma.account.delete({
        where: {
          accountNo: accNo,
        },
      });
      return "deleted successfully";
    } catch (err) {
      console.log(err);
      return "Unable to delete account because it does not exist";
    }
  }

  async addTransaction(transaction, accountNo) {
    transaction.amount = Number(transaction.amount);
    try {
      const account = await this.getAccount(accountNo);

      if (transaction.transType === "Deposit") {
        account.balance += transaction.amount;
      } else if (transaction.transType === "Withdrawal") {
        if (account.balance >= transaction.amount) {
          account.balance -= transaction.amount;
        } else {
          return { error: 3, message: "Insufficient funds." };
        }
      } else {
        return { error: 2, message: "Invalid transaction type." };
      }

      await this.updateAccount(account, accountNo);
      const _transaction = await prisma.transaction.create({
        data: transaction,
      });

      return {
        error: 0,
        message: "Transaction successful",
        payload: _transaction,
      };
    } catch (err) {
      return {
        error: 1,
        hint: "Unable to execute the transaction successfully",
        message: err.message,
      };
    }
  }

  async getOwners() {
    try {
      return await prisma.owner.findMany({});
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getOwnerReport(ownerId) {
    try {
      return await prisma.owner.findMany({
        include: {
          accounts: {
            include: {
              transactions: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getOwnerTranSum(ownerId) {
    try {
      const result = await prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          account: {
            ownerId,
          },
        },
        // select: {
        //   account: {
        //     select: {
        //       owner: {
        //         select: {
        //           firstName: true,
        //           lastName: true,
        //         },
        //       },
        //     },
        //   },
        },
      });
      return { error: 0, payload: result };
    } catch (error) {
      return { error: 1, message: error.message };
    }
  }

  async getTrans(fromDate, toDate, accountId = null) {
    try {
      if (!(fromDate && toDate)) {
        return { error: 2, message: "Missing from or to date." };
      }
      fromDate = new Date(fromDate);
      toDate = new Date(toDate);

      if (!(fromDate <= toDate)) {
        return { error: 3, message: "Invalid date range." };
      }

      const query = {
        where: {
          date: {
            gte: fromDate,
            lte: toDate,
          },
        },
      };

      if (accountId) {
        query.where.accountId = accountId;
      }

      const result = await prisma.transaction.findMany(query);

      return { error: 0, payload: result };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getTransSum(fromDate, toDate, accountNo = null) {
    try {
      if (!(fromDate && toDate)) {
        return { error: 2, message: "Missing from or to date." };
      }
      fromDate = new Date(fromDate);
      toDate = new Date(toDate);

      if (!(fromDate <= toDate)) {
        return { error: 3, message: "Invalid date range." };
      }

      const query = {
        _sum: {
          balance: true,
        },
        where: {
          date: {
            gte: fromDate,
            lte: toDate,
          },
        },
      };

      if (accountId) {
        query.where.accountId = accountId;
      }

      const result = await prisma.transaction.aggregate(query);

      return { error: 0, payload: result };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getAvgBalance() {
    try {
      const result = await prisma.account.groupBy({
        by: ["acctType"],
        _avg: { balance: true },
      });

      return { error: 0, payload: result };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getMinMaxBalance() {
    try {
      const minmax = prisma.account.aggregate({
        _min: { balance: true },
        _max: { balance: true },
      });

      const min = prisma.account.findMany({
        orderBy: {
          balance: "asc",
        },
        take: 1,
      });

      const max = prisma.account.findMany({
        orderBy: {
          balance: "desc",
        },
        take: 1,
      });

      return { error: 0, payload: [min, max, minmax] };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getTop3Accounts() {
    try {
      const top3 = prisma.account.findMany({
        orderBy: {
          balance: "desc",
        },
        take: 3,
      });

      return { error: 0, payload: top3 };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }
}
