const axios = require("axios");

const getAccount = (rallyNetworkWalletId) => {
  const config = {
    method: "get",
    url: `https://api.rally.io/api/accounts?rallyNetworkWalletId=${rallyNetworkWalletId}`,
    headers: {},
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

module.exports = getAccount;
