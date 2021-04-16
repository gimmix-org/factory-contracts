//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {ERC721BasicPortfolio} from "./ERC721BasicPortfolio.sol";

contract Deployer {
    mapping(address => address) public contracts;
    mapping(string => bool) public names;
    mapping(string => bool) public symbols;

    event ContractDeployed(
        address indexed _from,
        address indexed _contract,
        string name,
        string symbol
    );

    function createERC721(string memory _name, string memory _symbol)
        public
        returns (address memory)
    {
        string memory name = upper(_name);
        require(names[name] == false, "This name has already been used.");

        string memory symbol = upper(_symbol);
        require(symbols[symbol] == false, "This symbol has already been used.");

        address _contract =
            address(new ERC721BasicPortfolio(name, symbol, msg.sender));
        contracts[msg.sender] = _contract;

        names[name] = true;
        symbols[symbol] = true;

        emit ContractDeployed(msg.sender, _contract, name, symbol);

        return _contract;
    }

    function upper(string memory _base) internal pure returns (string memory) {
        bytes memory _baseBytes = bytes(_base);
        for (uint256 i = 0; i < _baseBytes.length; i++) {
            _baseBytes[i] = _upper(_baseBytes[i]);
        }
        return string(_baseBytes);
    }

    function _upper(bytes1 _b1) private pure returns (bytes1) {
        if (_b1 >= 0x61 && _b1 <= 0x7A) {
            return bytes1(uint8(_b1) - 32);
        }
        return _b1;
    }
}
