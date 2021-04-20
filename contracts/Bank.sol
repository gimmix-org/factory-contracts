// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract Bank is PaymentSplitter {
    constructor(address[] memory payees, uint256[] memory shares_)
        PaymentSplitter(payees, shares_)
    {}
}
