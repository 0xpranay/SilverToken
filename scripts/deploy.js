const { ethers } = require("hardhat");
async function main() {
  console.clear();
  const contract = await ethers.getContractFactory("SilverToken");
  console.log("Deploying SilverToken");
  const contractInstance = await contract.deploy(1000);
  console.log("Contract deployed to...", contractInstance.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
