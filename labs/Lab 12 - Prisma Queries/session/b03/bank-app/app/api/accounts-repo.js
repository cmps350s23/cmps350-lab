import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class AccountsRepo {
  constructor() {}

  async getOwners() {
    try {
      const owners = await prisma.owner.findMany({
        // select: {
        //   firstName: true,
        //   lastName: true,
        //   accounts: {
        //     select: {
        //       acctType: true,
        //       balance: true,
        //       transactions: {
        //         select: {
        //           transType: true,
        //           amount: true,
        //         },
        //       },
        //     },
        //   },
        // },
        // include: {
        //   accounts: {
        //     include: {
        //       transactions: true,
        //     },
        //   },
        // },
      });

      return { error: 0, payload: owners };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getOwnerTranSum(ownerId) {
    try {
      // const accountSum = await prisma.account.aggregate({
      //   where: {
      //     ownerId,
      //   },
      //   _sum: {
      //     balance: true,
      //   },
      // });

      const tranSum = await prisma.transaction.aggregate({
        where: {
          account: {
            // ownerId,
            owner: {
              firstName: "Alice",
            },
          },
        },
        _sum: {
          amount: true,
        },
      });
      return { error: 0, payload: tranSum };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getOwnerReport(ownerId) {
    try {
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getAccounts(type) {
    try {
      const query = {
        include: {
          owner: true,
        },
        // where: {},
      };

      if (type === "Savings" || type === "Current") {
        query.where = {
          acctType: type,
        };
        // query.where.acctType = type;
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
      const newAccount = await prisma.account.create({
        data: account,
      });
      return newAccount;
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateAccount(account, accountNo) {
    const updatedAccount = await prisma.account.update({
      where: { accountNo },
      data: account,
    });

    if (updatedAccount) return "updated successfully";

    return "Unable to update account because it does not exist";
  }

  async getAccount(accNo) {
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
    transaction.amount = parseInt(transaction.amount.toString());
    try {
      const account = await this.getAccount(accountNo);

      if (transaction.transType === "Deposit") {
        account.balance += transaction.amount;
      } else if (transaction.transType === "Withdrawal") {
        if (account.balance >= transaction.amount) {
          account.balance -= transaction.amount;
        } else {
          return { error: 2, message: "Insufficient funds." };
        }
      } else {
        return { error: 3, message: "Invalid transaction type." };
      }

      await this.updateAccount(account, accountNo);
      const newTransaction = await prisma.transaction.create({
        data: transaction,
      });

      return {
        error: 0,
        payload: newTransaction,
        message: "Transaction successful",
      };
    } catch (err) {
      return {
        error: "unable to execute the transaction successful",
        errorMessage: err.message,
      };
    }
  }

  async getTransSum(fromDate, toDate, acctNo = null) {
    try {
      if (!(fromDate && toDate)) {
        return { error: 2, message: "Missing from/to date." };
      }

      fromDate = new Date(fromDate);
      toDate = new Date(toDate);
      if (!(fromDate <= toDate)) {
        return { error: 1, message: "Invalid range." };
      }

      const query = {
        _sum: {
          amount: true,
        },
        where: {
          date: {
            gte: fromDate,
            lte: toDate,
          },
        },
      };
      if (acctNo) {
        query.where.acctNo = acctNo;
      }
      const transactions = await prisma.transaction.aggregate(query);
      return { error: 0, payload: transactions };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getTrans(fromDate, toDate, acctNo = null) {
    try {
      if (!(fromDate && toDate)) {
        return { error: 2, message: "Missing from/to date." };
      }

      fromDate = new Date(fromDate);
      toDate = new Date(toDate);
      if (!(fromDate <= toDate)) {
        return { error: 1, message: "Invalid range." };
      }

      const query = {
        where: {
          date: {
            gte: fromDate,
            lte: toDate,
          },
        },
      };
      if (acctNo) {
        query.where.acctNo = acctNo;
      }
      const transactions = await prisma.transaction.findMany(query);
      return { error: 0, payload: transactions };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getAvgBalance() {
    try {
      const averages = await prisma.account.groupBy({
        by: ["acctType"],
        // where: {
        //   acctType: "Savings",
        // },
        _avg: {
          balance: true,
        },
        // _count: {
        //   balance: true,
        // },
      });
      return { error: 0, payload: averages };
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getMinMaxBalance() {
    try {
      const minmax = await prisma.account.aggregate({
        _min: {
          balance: true,
        },
        _max: {
          balance: true,
        },
      });

      const min = await prisma.account.findMany({
        select: {
          balance: true,
        },
        orderBy: [
          {
            balance: "asc",
          },
        ],
        take: 1,
      });
      const max = await prisma.account.findMany({
        select: {
          balance: true,
        },
        orderBy: [
          {
            balance: "desc",
          },
        ],
        take: 1,
      });

      return { error: 0, payload: { min, max, minmax } };
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getTop3Accounts() {
    try {
      const max = await prisma.account.findMany({
        // select: {
        //   balance: true,
        // },
        orderBy: [
          {
            balance: "desc",
          },
        ],
        take: 3,
      });
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }
}
