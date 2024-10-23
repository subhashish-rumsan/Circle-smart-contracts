require("dotenv").config();
const {
  initiateDeveloperControlledWalletsClient,
} = require("@circle-fin/developer-controlled-wallets");

let circleDeveloperSdk;

const getCircleClient = () => {
  if (!circleDeveloperSdk) {
    circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
      apiKey: process.env.CIRCLE_API_KEY,
      entitySecret: process.env.CIRCLE_ENTITY_SECRET,
    });
  }

  return circleDeveloperSdk;
};

module.exports = getCircleClient;
