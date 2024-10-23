require("dotenv").config();

const {
  initiateSmartContractPlatformClient,
} = require("@circle-fin/smart-contract-platform");

let circleContractSdk;

const getCircleContractClient = () => {
  if (!circleContractSdk) {
    circleContractSdk = initiateSmartContractPlatformClient({
      apiKey: process.env.CIRCLE_API_KEY,
      entitySecret: process.env.CIRCLE_ENTITY_SECRET,
    });
  }

  return circleContractSdk;
};

module.exports = getCircleContractClient;
