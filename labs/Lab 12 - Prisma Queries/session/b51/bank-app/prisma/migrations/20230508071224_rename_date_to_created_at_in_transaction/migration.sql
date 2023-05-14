/*
  Warnings:

  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "transId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountNo" TEXT NOT NULL,
    CONSTRAINT "Transaction_accountNo_fkey" FOREIGN KEY ("accountNo") REFERENCES "Account" ("accountNo") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountNo", "amount", "transId", "transType") SELECT "accountNo", "amount", "transId", "transType" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE TABLE "new_Account" (
    "accountNo" TEXT NOT NULL PRIMARY KEY,
    "acctType" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Account_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("accountNo", "acctType", "balance", "ownerId") SELECT "accountNo", "acctType", "balance", "ownerId" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
