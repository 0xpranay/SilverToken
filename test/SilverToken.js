const { expect } = require("chai");
const { ethers } = require("hardhat");
console.clear();
/*Tests are written for 3 types
  1. Consistency checks (Balances)
  2. Reverting checks (Intended reverts, overflow reverts)
  3. Event emitting checks (Events intended)
  4. Security checks (Re entrancy)
*/
describe("Silver Token", function () {
  async function setup() {
    const contract = await ethers.getContractFactory("SilverToken");
    const contractInstance = await contract.deploy(1000);
    const deployerInstance = contractInstance.connect(
      await ethers.provider.getSigner(0).getAddress()
    );
    const userInstance = contractInstance.connect(
      await ethers.provider.getSigner(1).getAddress()
    );
    const deployer = new ethers.Wallet(
      "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    );
    const user = new ethers.Wallet(
      "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
    );
    return [
      contract,
      contractInstance,
      deployerInstance,
      userInstance,
      deployer,
      user,
    ];
  }
  it("Should deploy with 1000 tokens for deployer", async function () {
    [contract, contractInstance, deployerInstance, userInstance] =
      await setup();
    expect(
      ethers.utils.formatEther(
        await userInstance.balanceOf(
          "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
        )
      )
    ).to.equal("1000.0");
  });
  it("Should deploy with 0 tokens for non deployer account", async function () {
    [contract, contractInstance, deployerInstance, userInstance] =
      await setup();
    expect(
      await deployerInstance.balanceOf(
        "0x71bE63f3384f5fb98995898A86B02Fb2426c5788"
      )
    ).to.equal(0);
  });
  it("Should reflect correct balance after transfers", async function () {
    [
      contract,
      contractInstance,
      deployerInstance,
      userInstance,
      deployer,
      user,
    ] = await setup();
    await expect(() =>
      contractInstance.transfer(
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        100
      )
    ).to.changeTokenBalances(userInstance, [deployer, user], [-100, 100]);
  });
});
