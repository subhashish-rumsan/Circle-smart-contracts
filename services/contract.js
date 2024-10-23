const getCircleClient = require("../config/contract-client"); // Import the reusable contract client

const circleContractSdk = getCircleClient(); // Get the client instance

/**
 * Deploy a smart contract with the required parameters.
 * @param {object} contractData - The contract data required for deployment.
 * @param {string} contractData.entitySecretCiphertext - The encrypted entity secret.
 * @param {string} contractData.walletId - The wallet ID associated with the contract.
 * @param {string} contractData.abiJSON - The ABI of the contract in JSON format.
 * @param {string} contractData.bytecode - The contract's bytecode.
 * @param {string[]} contractData.constructorParameters - Parameters passed to the contract constructor.
 * @returns {Promise<object>} - Returns the response from the contract deployment.
 */
const deployContract = async (contractData) => {
  try {
    const response = await circleContractSdk.deployContract({
      name: contractData?.name,
      description: contractData?.description,
      walletId: contractData?.walletId,
      blockchain: contractData?.blockchain,
      fee: {
        type: "level",
        config: {
          feeLevel: "MEDIUM",
        },
      },
      constructorParameters: contractData?.constructorParameters,
      entitySecretCiphertext: contractData?.entitySecretCiphertext,
      abiJSON: contractData?.abiJSON,
      bytecode: contractData?.bytecode,
    });
    return response?.data;
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw error;
  }
};

/**
 * Retrieve details of a deployed contract by contract ID.
 * @param {string} contractId - The ID of the contract to retrieve.
 * @returns {Promise<object>} - Returns the contract details.
 */

const getContractById = async (contractId) => {
  try {
    const response = await circleContractSdk.getContract({ id: contractId });
    return response;
  } catch (error) {
    console.error("Error fetching contract details:", error);
    throw error;
  }
};

/**
 * Deploy a smart contract template for NFTs.
 * @param {object} templateData - The template data for NFT contract.
 * @returns {Promise<object>} - Returns the response from the template deployment.
 */
const deployNFTContractTemplate = async (templateData) => {
  try {
    const response = await circleContractSdk.deployContractTemplate({
      id: templateData?.templateId, // The template ID for the NFT contract
      blockchain: templateData?.blockchain || "MATIC-AMOY", // Blockchain, default to Matic
      name: templateData?.name || "My First NFT Contract",
      walletId: templateData?.walletId,
      templateParameters: {
        name: templateData?.name || "My First NFT Contract",
        defaultAdmin: templateData?.defaultAdmin,
        primarySaleRecipient: templateData?.primarySaleRecipient,
        royaltyRecipient: templateData?.royaltyRecipient,
        royaltyPercent: templateData?.royaltyPercent || 0,
      },
      fee: {
        type: "level",
        config: {
          feeLevel: "MEDIUM",
        },
      },
    });
    return response;
  } catch (error) {
    console.error("Error deploying NFT contract template:", error);
    throw error;
  }
};

/**
 * Read data from a deployed contract by calling a function on its ABI.
 * @param {object} readData - The data needed to read from the contract.
 * @returns {Promise<object>} - Returns the response from the contract's function call.
 */
const readContract = async (readData) => {
  try {
    const response = await circleContractSdk.readContract({
      id: readData?.contractId,
      abiFunctionSignature: readData?.abiFunctionSignature,
    });
    return response;
  } catch (error) {
    console.error("Error reading contract:", error);
    throw error;
  }
};

/**
 * Create a contract execution transaction using developer-controlled wallets.
 * @param {object} executionData - The data needed to execute the transaction.
 * @returns {Promise<object>} - Returns the transaction result.
 */
const createContractExecutionTransaction = async (executionData) => {
  try {
    const response =
      await circleDeveloperSdk.createContractExecutionTransaction({
        walletId: executionData?.walletId,
        contractAddress: executionData?.contractAddress,
        abiFunctionSignature: executionData?.abiFunctionSignature,
        abiParameters: executionData?.abiParameters,
        fee: {
          type: "level",
          config: {
            feeLevel: "MEDIUM",
          },
        },
      });
    return response;
  } catch (error) {
    console.error("Error executing contract transaction:", error);
    throw error;
  }
};

module.exports = {
  deployContract,
  getContractById,
  deployNFTContractTemplate,
  createContractExecutionTransaction,
  readContract,
};
