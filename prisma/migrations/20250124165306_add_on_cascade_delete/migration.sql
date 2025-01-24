-- DropForeignKey
ALTER TABLE "EnergyNetworkGraphLink" DROP CONSTRAINT "EnergyNetworkGraphLink_source_fkey";

-- DropForeignKey
ALTER TABLE "EnergyNetworkGraphLink" DROP CONSTRAINT "EnergyNetworkGraphLink_target_fkey";

-- AddForeignKey
ALTER TABLE "EnergyNetworkGraphLink" ADD CONSTRAINT "EnergyNetworkGraphLink_source_fkey" FOREIGN KEY ("source") REFERENCES "EnergyNetworkGraphNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnergyNetworkGraphLink" ADD CONSTRAINT "EnergyNetworkGraphLink_target_fkey" FOREIGN KEY ("target") REFERENCES "EnergyNetworkGraphNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
