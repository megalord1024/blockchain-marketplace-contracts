const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace contract", function (){
    let marketplaceContract;
    let marketplaceInstance;
    let seller;
    let buyer;

    before(async function () {
        [seller, buyer] = await ethers.getSigners();
    
        let randomNumberGeneratorContract = await ethers.getContractFactory("RandomNumberGenerator");
        let randomNumberGeneratorInstance = await randomNumberGeneratorContract.deploy();

        // Deploy TradeRecordContract
        let tradeRecordContract = await ethers.getContractFactory("TradeRecord");
        let tradeRecordInstance = await tradeRecordContract.deploy(randomNumberGeneratorInstance.target);

        // Deploy MarketplaceContract with TradeRecordContract's address
        marketplaceContract = await ethers.getContractFactory("Marketplace");
        marketplaceInstance = await marketplaceContract.deploy(tradeRecordInstance.target);
    });

    it("Should add a new product", async function () {
        const metaUuid = "Product Meta Uuid 1"
        const productName = "Product 1";
        const productPrice = 10;
        const productQuantity = 5;
        const sellerUuid = "seller-uuid";
      
        const tx = await marketplaceInstance.connect(seller).addProduct(metaUuid, productName, productPrice, productQuantity, sellerUuid);
        const receipt = await tx.wait();
        const product = await marketplaceInstance.products(0);
        const log = receipt.logs[0];
        const parsedLog = marketplaceInstance.interface.parseLog(log);
      
        expect(product.metaUuid).to.equal(metaUuid)
        expect(product.name).to.equal(productName);
        expect(product.price).to.equal(productPrice);
        expect(product.quantity).to.equal(productQuantity);
        expect(product.seller).to.equal(seller.address);
        expect(product.sellerUuid).to.equal(sellerUuid);

        expect(parsedLog.args.metaUuid).to.equal(metaUuid);
        expect(parsedLog.args.productId).to.equal(0);
        expect(parsedLog.args.name).to.equal(productName);
        expect(parsedLog.args.price).to.equal(productPrice);
        expect(parsedLog.args.quantity).to.equal(productQuantity);
        expect(parsedLog.args.seller).to.equal(seller.address);
        expect(parsedLog.args.sellerUuid).to.equal(sellerUuid);
      });
})

