-- RedefineTables
PRAGMA foreign_keys=OFF;
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
CREATE TABLE "new_Owner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Owner" ("email", "firstName", "id", "lastName") SELECT "email", "firstName", "id", "lastName" FROM "Owner";
DROP TABLE "Owner";
ALTER TABLE "new_Owner" RENAME TO "Owner";
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
