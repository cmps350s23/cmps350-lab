import { log } from "console";
import fs from "fs-extra";
import { nanoid } from "nanoid";
import path from "path";
import { AccountType } from "@prisma/client";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class AccountsRepo {
  constructor() {}

  async getAccounts(type) {
    try {
      // await this.getOwners();
      // let accounts = [];
      if (type == "Savings" || type == "Current") {
        // console.log(
        //   "I am inside getAccounts trying to query the database",
        //   type
        // );
        return await prisma.account.findMany({
          where: {
            acctType: {
              equals: type,
            },
            owner: {
              // is: {
              firstName: "Alice",
              // },
            },
          },
          select: {
            accountNo: true,
            acctType: true,
            balance: true,
            owner: {
              select: {
                firstName: true,
              },
            },
          },
          // include: {
          //   owner: true,
          // },
        });
      }
      return await prisma.account.findMany({
        include: {
          owner: true,
        },
      });
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
      // return newAccount
      return {
        error: 0,
        payload: newAccount,
      };
    } catch (error) {
      // return { error: error.message }
      return {
        error: 1,
        payload: error.message,
      };
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
      console.log(account);

      if (transaction.transType == "Deposit")
        account.balance += parseInt(transaction.amount);
      else {
        if (account.balance < transaction.amount) {
          return {
            error: 2,
            payload: "Insufficient funds",
          };
        }
        account.balance -= parseInt(transaction.amount);
      }

      await this.updateAccount(account, accountNo);
      const newTransaction = await prisma.transaction.create({
        data: transaction,
      });

      return {
        message: "transaction successful",
        newTransaction,
      };
    } catch (err) {
      return {
        error: "unable to execute the transaction successful",
        errorMessage: err.message,
      };
    }
  }

  async getOwners() {
    try {
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getOwnerReport(ownerId) {
    try {
      // return await prisma.owner.findUnique({
      //   where: {
      //     id: ownerId,
      //   },
      //   select: {
      //     accounts: {
      //       select: {
      //         accountNo: true,
      //         balance: true,
      //         transactions: {
      //           select: {
      //             transType: true,
      //             amount: true,
      //           },
      //         },
      //       },
      //     },
      //   },
      //   // include: {
      //   //   accounts: {
      //   //     include: {
      //   //       transactions: true,
      //   //     },
      //   //   },
      //   // },
      // });

      // return await prisma.owner.aggregate({
      //   _min: {
      //     accounts: {
      //       balance: true,
      //     },
      //   },
      // });

      // return await prisma.account.aggregate({
      //   where: {
      //     ownerId,
      //   },
      //   _sum: {
      //     balance: true,
      //   },
      // });

      // return await prisma.account.aggregate({
      //   where: {
      //     ownerId,
      //   },
      //   select: {
      //     transaction: {
      //       amount: true,
      //     },
      //   },
      //   _sum: {
      //     transaction: {
      //       amount: true,
      //     },
      //   },
      // });

      return await prisma.transaction.groupBy({
        // include: {
        //   account: true,
        // },
        // select: {
        //   account: {
        //     select: {
        //       ownerId: true,
        //     },
        //   },
        // },
        by: ["accountNo"],
        _sum: {
          amount: true,
        },
        // where: {
        //   account: {
        //     ownerId,
        //   },
        // },
      });
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getTrans(acctNo, fromDate, toDate) {
    try {
      return await prisma.transaction.findMany({
        where: {
          accountNo: acctNo,
          createdAt: {
            gte: fromDate,
            lte: toDate,
          },
        },
      });
    } catch (error) {
      return {
        error: 1,
        payload: error.message,
      };
    }
  }

  async getTransSum(fromDate, toDate) {
    try {
      return prisma.transaction.groupBy({
        where: {
          createdAt: {
            gte: fromDate,
            lte: toDate,
          },
        },
        _sum: {
          amount: true,
        },
        by: ["transType"],
      });
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getTransSum(accountNo, fromDate, toDate) {
    try {
      return prisma.transaction.groupBy({
        where: {
          accountNo,
          // account: {
          //   firstName: {
          //     contains: "a",
          //   }
          // },
          createdAt: {
            gte: fromDate,
            lte: toDate,
          },
        },
        _sum: {
          amount: true,
        },
        by: ["transType"],
      });
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getAvgBalance() {
    try {
      return prisma.account.groupBy({
        by: ["acctType"],
        _avg: {
          balance: true,
        },
        orderBy: {
          _avg: {
            balance: "desc",
          },
        },
        // orderBy: {
        //   _count: {
        //     accountNo: "desc",
        //   },
        // },
        // having: {
        //   balance: {
        //     _avg: {
        //       gt: 1000,
        //     },
        //   },
        // },
      });
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getMinMaxBalance() {
    try {
      return await prisma.account.aggregate({
        _min: {
          balance: true,
        },
        _max: {
          balance: true,
        },
      });

      // const result = [];
      // result.push(
      //   await prisma.account.findMany({
      //     select: {
      //       balance: true,
      //     },
      //     orderBy: [
      //       {
      //         balance: "asc",
      //       },
      //     ],
      //     take: 1,
      //   })
      // );

      // result.push(
      //   await prisma.account.findMany({
      //     select: {
      //       balance: true,
      //     },
      //     orderBy: [
      //       {
      //         balance: "desc",
      //       },
      //     ],
      //     take: 1,
      //   })
      // );

      // return result;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async getTop3Accounts() {
    try {
      return await prisma.account.findMany({
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
