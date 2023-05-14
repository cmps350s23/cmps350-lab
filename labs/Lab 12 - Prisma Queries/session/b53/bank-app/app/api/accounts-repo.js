// import { log } from "console";
// import fs from "fs-extra";
// import { nanoid } from "nanoid";
// import path from "path";
// import { AccountType } from "@prisma/client";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class AccountsRepo {
  constructor() {}

  async getAccounts(type) {
    try {
      const query = {};
      if (type === "Savings" || type === "Current") {
        query.where = {
          acctType: type,
        };
      }
      // query.select = {
      //   owner: true,
      // };
      query.include = {
        owner: true,
      };

      return await prisma.account.findMany(query);
    } catch (err) {
      console.log(err);
      return { error: err.message };
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
    console.log("addTransaction called", accountNo);
    transaction.amount = parseInt(transaction.amount.toString());
    try {
      const account = await this.getAccount(accountNo);
      // console.log(account);

      if (transaction.transType == "Deposit") {
        account.balance += parseInt(transaction.amount);
      } else {
        if (transaction.amount > account.balance) {
          return { error: 2, message: "Insufficient funds." };
        }
        account.balance -= parseInt(transaction.amount);
      }

      await this.updateAccount(account, accountNo);

      const newTransaction = await prisma.transaction.create({
        data: transaction,
      });

      return {
        error: 0,
        message: "transaction successful",
        payload: newTransaction,
      };
    } catch (err) {
      return {
        error: 1,
        info: "unable to execute the transaction successful",
        message: err.message,
      };
    }
  }

  async getOwners() {
    try {
      // const owners = await prisma.$queryRaw`SELECT * FROM Owner`;
      const owners = await prisma.owner.findMany({
        // select: {
        //   firstName: true,
        //   lastName: true,
        //   accounts: {
        //     select: {
        //       balance: true,
        //       transactions: {
        //         select: {
        //           amount: true,
        //         },
        //       },
        //     },
        //   },
        // },
        include: {
          accounts: {
            include: {
              transactions: true,
            },
          },
        },
      });
      return { error: 0, payload: owners };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getOwnerReport(ownerId) {
    try {
      const owner = await prisma.owner.findMany({
        where: {
          id: ownerId,
        },
        include: {
          accounts: {
            include: {
              transactions: true,
            },
          },
        },
      });

      return { error: 0, payload: owner };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getOwnerBalance(ownerId) {
    try {
      // total balance for an owner
      const balance = await prisma.account.aggregate({
        where: {
          ownerId,
        },
        _sum: {
          balance: true,
        },
      });

      const balance2 = await prisma.account.groupBy({
        by: ["ownerId"],
        // select: {
        //   owner: {
        //     firstName: true,
        //     lastName: true,
        //   },
        // },
        where: {
          ownerId,
        },
        _sum: {
          balance: true,
        },
      });

      return { error: 0, payload: balance2 };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getTrans(fromDate, toDate, accountNo = null) {
    try {
      let query = {};

      if (fromDate && toDate) {
        fromDate = new Date(fromDate);
        toDate = new Date(toDate);

        if (fromDate <= toDate) {
          // console.log("valid range");
          query = {
            where: {
              date: {
                gte: fromDate,
                lte: toDate,
                // fromDate <= date <= toDate
              },
            },
          };
        }
      }

      if (accountNo) {
        query.where = { ...query?.where, accountNo: accountNo };
      }

      const transactions = await prisma.transaction.findMany(query);
      return { error: 0, payload: transactions };
    } catch (e) {
      console.error(e);
      return { error: 1, message: e.message };
    }
  }

  async getTransSum(fromDate, toDate, accountNo = null) {
    try {
      let query = {};

      if (fromDate && toDate) {
        fromDate = new Date(fromDate);
        toDate = new Date(toDate);

        if (fromDate <= toDate) {
          console.log("valid range");
          query = {
            where: {
              date: {
                gte: fromDate,
                lte: toDate,
                // fromDate <= date <= toDate
              },
            },
          };
        }
      }

      if (accountNo) {
        query.where = { ...query?.where, accountNo: accountNo };
      }

      query._sum = { amount: true };

      const q = {
        where: {
          date: {
            gte: fromDate,
            lte: toDate,
            // fromDate <= date <= toDate
          },
          accountNo: accountNo,
        },
        _sum: {
          amount: true,
        },
      };

      const transactions = await prisma.transaction.aggregate(query);
      return { error: 0, payload: transactions };
    } catch (e) {
      console.error(e);
      return { error: 1, message: e.message };
    }
  }

  async getAvgBalance() {
    try {
      const averages = await prisma.account.groupBy({
        by: ["acctType"],
        _avg: {
          balance: true,
        },
      });
      return { error: 0, payload: averages };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
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

      const max = await prisma.account.findMany({
        select: {
          balance: true,
        },
        where: {},
        orderBy: {
          balance: "desc",
        },
        take: 1,
      });

      const min = await prisma.account.findMany({
        select: {
          balance: true,
        },
        where: {},
        orderBy: {
          balance: "asc",
        },
        take: 1,
      });

      return {
        error: 0,
        payload: [
          Object.entries(minmax).map(([key, value]) => value),
          min,
          max,
        ],
      };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }

  async getTop3Accounts() {
    try {
      const result = await prisma.account.findMany({
        orderBy: {
          balance: "desc",
        },
        take: 3,
      });

      return {
        error: 0,
        payload: result,
      };
    } catch (error) {
      console.log(error);
      return { error: 1, message: error.message };
    }
  }
}
