const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Photograph", function () {
  let photograph;
  let owner;
  let contributor;

  beforeEach(async function () {
    const Photograph = await ethers.getContractFactory("Photograph");
    photograph = await Photograph.deploy(
      "Title",
      "Description",
      "https://example.com/photo.jpg",
      ethers.utils.parseEther("1"),
      ethers.constants.AddressZero,
      10
    );
    await photograph.deployed();

    owner = await photograph.getOwner();
    contributor = await photograph.getContributor();
  });

  describe("getPrice", function () {
    it("returns the correct price", async function () {
      const price = await photograph.getPrice();
      expect(price).to.equal(ethers.utils.parseEther("1"));
    });
  });

  describe("getOwner", function () {
    it("returns the correct owner", async function () {
      expect(owner).to.equal(await ethers.provider.getSigner(0).getAddress());
    });
  });

  describe("getPhoto", function () {
    it("returns the correct photo URI", async function () {
      const photoUri = await photograph.getPhoto();
      expect(photoUri).to.equal("https://example.com/photo.jpg");
    });
  });

  describe("getContributor", function () {
    it("returns the correct contributor", async function () {
      expect(contributor).to.equal(ethers.constants.AddressZero);
    });
  });

  describe("getImageState", function () {
    it("returns the correct image state", async function () {
      const imageState = await photograph.getImageState();
      expect(imageState).to.equal(false);
    });
  });

  describe("getRoyalty", function () {
    it("returns the correct royalty", async function () {
      const royalty = await photograph.getRoyalty();
      expect(royalty).to.equal(10);
    });
  });

  describe("getTitle", function () {
    it("returns the correct title", async function () {
      const title = await photograph.getTitle();
      expect(title).to.equal("Title");
    });
  });

  describe("getDescription", function () {
    it("returns the correct description", async function () {
      const description = await photograph.getDescription();
      expect(description).to.equal("Description");
    });
  });
});
