const axios = require("axios");
const getRegisterToken = require("../getRegisterToken");

const getUserInfo = async (code) => {
  const data = JSON.stringify({
    code,
  });

  const authToken = await getRegisterToken();

  console.log("============================================================");
  console.log(authToken);
  console.log("============================================================");

  const config = {
    method: "post",
    url: "https://api.rally.io/v1/oauth/userinfo",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        return resolve(response.data);
      })
      .catch(function (error) {
        console.log("============================================================");
        console.log(error.message);
        console.log("============================================================");
        return reject(error);
      });
  });
};

module.exports = getUserInfo;
