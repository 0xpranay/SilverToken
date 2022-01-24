// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract SilverToken is IERC20, IERC20Metadata {
  mapping(address => uint256) private balances;
  mapping(address => mapping(address => uint256)) private allowances;
  uint256 private _totalSupply;

  constructor(uint256 maxSupply) {
    _totalSupply = maxSupply * (10**decimals());
    balances[msg.sender] = _totalSupply;
  }

  function totalSupply() external view override returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account) external view override returns (uint256) {
    require(account != address(0), "Null address queried");
    return balances[account];
  }

  function transfer(address to, uint256 amount)
    external
    override
    returns (bool)
  {
    require(to != address(0), "Recipient can't be NULL address");
    require(amount != 0, "Amount can't be 0");
    require(balances[msg.sender] >= amount, "Insufficient token balance");
    balances[msg.sender] -= amount;
    balances[to] += amount;
    emit Transfer(msg.sender, to, amount);
    return true;
  }

  function allowance(address owner, address spender)
    public
    view
    override
    returns (uint256)
  {
    require(spender != address(0), "Can't approve NULL address");
    return allowances[owner][spender];
  }

  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) external override returns (bool) {
    require(recipient != address(0), "Recipient can't be NULL address");
    require(allowance(sender, msg.sender) >= amount, "Approval not enough");
    balances[sender] -= amount;
    balances[recipient] += amount;
    emit Transfer(sender, recipient, amount);
    return true;
  }

  function approve(address spender, uint256 amount)
    external
    override
    returns (bool)
  {
    require(spender != address(0), "Spender can't be NULL address");
    allowances[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
    return true;
  }

  function name() external pure override returns (string memory) {
    return "ROCKY";
  }

  function symbol() external pure override returns (string memory) {
    return "ROCK";
  }

  function decimals() public pure override returns (uint8) {
    return 18;
  }
}
