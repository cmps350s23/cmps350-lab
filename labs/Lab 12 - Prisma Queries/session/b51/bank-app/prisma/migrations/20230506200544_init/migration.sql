-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "accountNo" TEXT NOT NULL PRIMARY KEY,
    "acctType" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Account_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountNo" TEXT NOT NULL,
    CONSTRAINT "Transaction_accountNo_fkey" FOREIGN KEY ("accountNo") REFERENCES "Account" ("accountNo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");
