require("dotenv").config();

const { abi, bytecode } = require("./contract");
const { deployContract } = require("./services/contract");
const { listWallets, getWalletTokenBalance } = require("./services/wallet"); // Import the listWallets function

const contractData = {
  name: "Subhashish First Contract Deploy on circle",
  description: "This is the demo of circle contract deploy",
  blockchain: "ETH-Sepolia",
  walletId: "db350365-d985-501d-96ae-944db64f6dab",
  constructorParameters: ["0xe22f46f9e210c12caf4245e92bc1c0d67d851ecd"],
  entitySecretCiphertext: process.env.CIRCLE_SECRET_CIPHER,
  abiJSON: abi,
  bytecode: bytecode,
};

async function main() {
  try {
    // const walletLists = await listWallets(); // Await the promise returned by listWallets
    // console.log("Available wallets:", walletLists); // Log the wallet lists to the console
    // const tokenBalance = await getWalletTokenBalance(
    //   "db350365-d985-501d-96ae-944db64f6dab"
    // );
    // console.log("Token Balance", tokenBalance);
    const contract = await deployContract(contractData);
    console.log(contract);
  } catch (error) {
    console.error("Errors:", error.message); // Handle any errors that may occur
  }
}

main();
