const axios = require("axios");
const getRegisterToken = require("../getRegisterToken");

const getBalances = async (rnwi) => {
  const authToken = await getRegisterToken();

  const config = {
    method: "get",
    url: `https://api.rally.io/api/rally-network-wallets/${rnwi}/balance`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        return resolve(response.data);
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

module.exports = getBalances;
