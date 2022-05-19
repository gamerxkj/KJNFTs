const hre = require("hardhat");

async function main() {

  const KJNFT = await hre.ethers.getContractFactory("KJNFT");
  const kjNFT = await KJNFT.deploy();

  await kjNFT.deployed();

  console.log("KJNFT deployed to:", kjNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
