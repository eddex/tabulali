import Axios from "axios";

const KoiosProxyUrl = "http://localhost:5001";

// returns one stake address
export const getStakeKeyByAddressAsync = async (paymentAddress) => {
  const options = {
    method: "POST",
    url: `${KoiosProxyUrl}/api/v0/address_info`,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    data: {
      _addresses: [`${paymentAddress}`],
    },
  };
  const response = await Axios.request(options).catch(console.log);
  return response.data[0]?.stake_address;
};

export const getAllAccountsAsync = async (stakeAddresses) => {
  const options = {
    method: "POST",
    url: `${KoiosProxyUrl}/api/v0/account_info`,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    data: {
      _stake_addresses: stakeAddresses,
    },
  };
  const response = await Axios.request(options).catch(console.log);
  return response.data;
};
