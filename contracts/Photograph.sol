// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

//https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80

error Photograph__notOwner();

error Photograph__buyPhotograph();

contract Photograph {
    string private i_title;
    string private i_description;
    string private i_photoUri;
    address private s_owner;
    uint256 private s_price;
    address private i_contributor;
    bool private s_imageState;
    uint256 private i_royalty;

    mapping(address => uint256) public ownerToPrice;

    constructor(
        string memory title,
        string memory description,
        string memory photoLinks,
        uint256 price,
        address sender,
        uint256 royalty
    ) {
        i_title = title;
        i_description = description;
        i_photoUri = photoLinks;
        s_owner = sender;
        s_price = price;
        i_contributor = sender;
        s_imageState = false;
        i_royalty = royalty;
    }

    //only user modifier

    modifier onlyOwner() {
        if (msg.sender != s_owner) {
            revert Photograph__notOwner();
        }
        _;
    }

    //image state toggle

    function setImageToggle(bool imageState) public onlyOwner {
        s_imageState = imageState;
    }

    //image price set

    function setPrice(uint256 updatedPrice) public onlyOwner {
        s_price = updatedPrice;
        ownerToPrice[msg.sender] = updatedPrice;
    }

    //image Buy

    function buyPhotograph() public payable {
        payable(i_contributor).transfer((msg.value * getRoyalty()) / 100);
        payable(s_owner).transfer((msg.value * (100 - getRoyalty())) / 100);
        s_owner = msg.sender;
    }

    //price getter

    function getPrice() public view returns (uint256) {
        return s_price;
    }

    //Owner getter

    function getOwner() public view returns (address) {
        return s_owner;
    }

    //photograph getter

    function getPhoto() public view returns (string memory) {
        return i_photoUri;
    }

    //get contributor

    function getContributor() public view returns (address) {
        return i_contributor;
    }

    //image state getter

    function getImageState() public view returns (bool) {
        return s_imageState;
    }

    //get royalty

    function getRoyalty() public view returns (uint256) {
        return i_royalty;
    }

    //get title

    function getTitle() public view returns (string memory) {
        return i_title;
    }

    // get description

    function getDescription() public view returns (string memory) {
        return i_description;
    }
}
