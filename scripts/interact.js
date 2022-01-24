const { ethers } = require("hardhat");
async function main() {
  console.clear();
  const contract = await ethers.getContractFactory("SilverToken");
  const contractInstance = contract.attach(
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
  );
  console.log(
    "Balance of owner is",
    ethers.utils.formatEther(
      await contractInstance.balanceOf(
        "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
      )
    )
  );
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
