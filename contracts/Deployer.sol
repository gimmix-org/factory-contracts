//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Portfolio.sol";
import "./Bank.sol";

contract Deployer {
    struct Deployment {
        string template;
        address creatorAddress;
        address contractAddress;
    }

    mapping(address => Deployment[]) public contracts;

    event ContractDeployed(
        address indexed _from,
        address indexed _contract,
        string template,
        string name
    );

    function createPortfolio(string memory _name, string memory _symbol)
        public
    {
        // Deploy contract
        address _contract = address(new Portfolio(_name, _symbol, msg.sender));

        // Push to creator's array
        contracts[msg.sender].push(
            Deployment("Portfolio", msg.sender, _contract)
        );

        emit ContractDeployed(msg.sender, _contract, "Portfolio", _name);
    }

    function createBank(
        string memory _name,
        address[] memory payees,
        uint256[] memory shares
    ) public {
        // Deploy contract
        address _contract = address(new Bank(payees, shares));

        // Push to creator's array
        contracts[msg.sender].push(Deployment("Bank", msg.sender, _contract));

        emit ContractDeployed(msg.sender, _contract, "Bank", _name);
    }
}
