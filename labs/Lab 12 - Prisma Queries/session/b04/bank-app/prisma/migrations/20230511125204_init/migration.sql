-- CreateTable
CREATE TABLE "Owner" (
    "ownerId" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "accountId" TEXT NOT NULL PRIMARY KEY,
    "acctType" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Account_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner" ("ownerId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" TEXT NOT NULL,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");
