// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "./Photograph.sol";

contract PhotographFactory {
    uint256 tokenId;
    Photograph public photograph;
    Photograph[] public simplePhotographArray;
    string[] public hashdata;
    mapping(address => address) public contractToWallet;

    //photograph contract creater

    function createPhotographContract(
        string memory title,
        string memory description,
        string memory imageURL,
        uint256 money,
        address senderAddress,
        string memory hashData,
        uint256 royalty
    ) external returns (address) {
        photograph = new Photograph(
            title,
            description,
            imageURL,
            money,
            senderAddress,
            royalty
        );
        simplePhotographArray.push(photograph);
        hashdata.push(hashData);
        contractToWallet[address(photograph)] = senderAddress;
        return address(photograph);
    }

    //image hash store getter

    function viewHashData() public view returns (string[] memory) {
        return hashdata;
    }

    //allphotograph addresses

    function getPhotographAddresses() public view returns (address[] memory) {
        address[] memory result = new address[](simplePhotographArray.length);
        for (uint i = 0; i < simplePhotographArray.length; i++) {
            result[i] = address(simplePhotographArray[i]);
        }
        return result;
    }
}
