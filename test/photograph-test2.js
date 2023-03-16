const { ethers } = require("hardhat");
const { expect } = require("chai");
describe("Photograph", function () {
  let owner;
  let buyer;
  let contributor;
  let photograph;

  beforeEach(async function () {
    [owner, buyer, contributor] = await ethers.getSigners();
    console.log(owner);
    photograph = await hre.ethers.getContractFactory("Photograph");
    photograph = await photograph.deploy(
      "My Title",
      "My Description",
      "https://example.com/photo.jpg",
      ethers.utils.parseEther("1"),
      owner.address,
      10
    );
    await photograph.deployed();
  });

  describe("setPrice()", function () {
    it("should allow the owner to set the price", async function () {
      await photograph.connect(owner).setPrice(ethers.utils.parseEther("2"));
      expect(await photograph.getPrice()).to.equal(
        ethers.utils.parseEther("2")
      );
    });

    it("should revert if a non-owner tries to set the price", async function () {
      await expect(
        photograph.connect(buyer).setPrice(ethers.utils.parseEther("2"))
      ).to.be.revertedWith("Photograph__notOwner()");
    });
  });

  describe("buyPhotograph()", function () {
    it("should allow a buyer to purchase the photograph", async function () {
      await photograph.connect(buyer).buyPhotograph({
        value: ethers.utils.parseEther("1.2"),
      });
      expect(await photograph.getOwner()).to.equal(buyer.address);
    });

    it("should split the payment between the owner and the contributor", async function () {
      const initialOwnerBalance = await ethers.provider.getBalance(
        owner.address
      );
      const initialContributorBalance = await ethers.provider.getBalance(
        contributor.address
      );

      await photograph.connect(buyer).buyPhotograph({
        value: ethers.utils.parseEther("1.2"),
      });

      const royalty = ethers.utils.parseEther("0.12");
      const expectedOwnerBalance = initialOwnerBalance.add(
        ethers.utils.parseEther("1.2").sub(royalty)
      );
      const expectedContributorBalance = initialContributorBalance.add(royalty);

      expect(await ethers.provider.getBalance(owner.address)).to.equal(
        expectedOwnerBalance
      );
      expect(await ethers.provider.getBalance(contributor.address)).to.equal(
        expectedContributorBalance
      );
    });

    it("should revert if the buyer doesn't send enough ether", async function () {
      await expect(
        photograph.connect(buyer).buyPhotograph({
          value: ethers.utils.parseEther("0.5"),
        })
      ).to.be.revertedWith("revert Photograph__buyPhotograph()");
    });
  });
});
