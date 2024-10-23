const getCircleClient = require("../config/circle-client"); // Import the reusable client

const circleClient = getCircleClient(); // Get the client instance

/**
 * List all wallets filtered by blockchain.
 * @param {string} blockchain - The blockchain to filter wallets (e.g., 'MATIC-AMOY')
 * @returns {Promise<object>} - Returns the list of wallets.
 */
const listWallets = async (blockchain) => {
  try {
    const response = await circleClient.listWallets({
      blockchain, // Use the blockchain parameter passed to the function
    });
    return response?.data;
  } catch (error) {
    console.error("Error listing wallets:", error);
    throw error;
  }
};

/**
 * Get the token balance of a specific wallet.
 * @param {string} walletId - The unique identifier of the wallet.
 * @returns {Promise<object>} - Returns the token balance of the wallet.
 */
const getWalletTokenBalance = async (walletId) => {
  try {
    const response = await circleClient.getWalletTokenBalance({
      id: walletId,
    });
    return response?.data;
  } catch (error) {
    console.error("Error getting wallet token balance:", error);
    throw error;
  }
};

// Export all wallet-related functions
module.exports = {
  listWallets,
  getWalletTokenBalance,
};
