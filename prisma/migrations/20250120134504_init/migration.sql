-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyNetworkGraphNode" (
    "id" SERIAL NOT NULL,
    "group" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "EnergyNetworkGraphNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyNetworkGraphLink" (
    "source" INTEGER NOT NULL,
    "target" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "kwUnits" INTEGER NOT NULL,

    CONSTRAINT "EnergyNetworkGraphLink_pkey" PRIMARY KEY ("source","target")
);

-- CreateTable
CREATE TABLE "ActionLog" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "EnergyNetworkGraphLink" ADD CONSTRAINT "EnergyNetworkGraphLink_source_fkey" FOREIGN KEY ("source") REFERENCES "EnergyNetworkGraphNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnergyNetworkGraphLink" ADD CONSTRAINT "EnergyNetworkGraphLink_target_fkey" FOREIGN KEY ("target") REFERENCES "EnergyNetworkGraphNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
