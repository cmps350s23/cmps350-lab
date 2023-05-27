-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "provider" TEXT,
    "name" TEXT,
    "picture" TEXT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
