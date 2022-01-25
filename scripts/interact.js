const { ethers } = require("hardhat");
async function main() {
  console.clear();
  const contract = await ethers.getContractFactory("SilverToken");
  const contractInstance = contract.attach(
    "0xEaF1231B431862747C41fDb86dc450620d496845"
  );
  await contractInstance.transfer(
    "0x460298B60025F4e527bEDd830DFDaD202df19d29",
    ethers.utils.parseEther("100")
  );
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
