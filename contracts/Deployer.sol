//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Portfolio.sol";
import "./Bank.sol";

contract Deployer {
    struct Deployment {
        address creatorAddress;
        string template;
        string name;
        address contractAddress;
    }

    mapping(address => Deployment[]) public contracts;

    event ContractDeployed(
        address indexed creatorAddress,
        string indexed template,
        string name,
        address contractAddress
    );

    function createPortfolio(string memory _name, string memory _symbol)
        public
    {
        // Deploy contract
        address _contractAddress =
            address(new Portfolio(_name, _symbol, msg.sender));

        // Push to creator's array
        contracts[msg.sender].push(
            Deployment(msg.sender, "Portfolio", _name, _contractAddress)
        );

        emit ContractDeployed(msg.sender, "Portfolio", _name, _contractAddress);
    }

    function createBank(
        string memory _name,
        address[] memory payees,
        uint256[] memory shares
    ) public {
        // Deploy contract
        address _contractAddress = address(new Bank(payees, shares));

        // Push to creator's array
        contracts[msg.sender].push(
            Deployment(msg.sender, "Bank", _name, _contractAddress)
        );

        emit ContractDeployed(msg.sender, "Bank", _name, _contractAddress);
    }
}
