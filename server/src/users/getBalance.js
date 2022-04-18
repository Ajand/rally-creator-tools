const axios = require("axios");
const getRegisterToken = require("../getRegisterToken");

const getBalance = async (rnwi, symbol) => {
  const authToken = await getRegisterToken();

  const config = {
    method: "get",
    url: `https://api.rally.io/api/rally-network-wallets/${rnwi}/balance?symbolSearch=${symbol}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return new Promise((resolve, reject) => {
    return axios(config)
      .then(function (response) {
        if (response.data.length) {
          return resolve(response.data[0].amount);
        } else {
          return resolve(0);
        }
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

module.exports = getBalance;
