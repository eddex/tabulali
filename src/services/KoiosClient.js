import Axios from "axios";

const KoiosProxyUrl = "http://localhost:5001";

const Cache = {};

const CacheKeyGetStakeKeyByAddress = "StakeKeyByAddress";
const CacheKeyGetAllAccounts = "AllAccounts";

const compareObjects = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

/* Try get a value from the cache.
 * If there is no cache entry with a matching key and id, null is returned.
 * param maxAgeInMinutes: can be set to null for no cache time limit
 */
const getFromCache = (key, id, maxAgeInMinutes) => {
  console.log(Cache[key]);
  if (
    !Cache[key] ||
    (maxAgeInMinutes &&
      new Date() > addMinutes(Cache[key].timestamp, maxAgeInMinutes)) ||
    !compareObjects(Cache[key].id, id)
  ) {
    return null;
  }
  return Cache[key].data;
};

/* Set data in the cache.
 * param key: is one of the constants for the different endpoints
 * param id: are the params that are sent with the request, if they change, the cache is invalid
 * param data: the data to cache
 */
const setCache = (key, id, data) => {
  Cache[key] = {};
  Cache[key].timestamp = new Date();
  Cache[key].id = id;
  Cache[key].data = data;
};

export const getStakeAddressByPaymentAddressAsync = async (paymentAddress) => {
  console.log("getStakeKeyByAddressAsync");

  const data = getFromCache(CacheKeyGetStakeKeyByAddress, paymentAddress, null);
  if (data) return data;

  const options = {
    method: "POST",
    url: `${KoiosProxyUrl}/api/v0/address_info?select=stake_address`,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    data: {
      _addresses: [`${paymentAddress}`],
    },
  };
  try {
    const response = await Axios.request(options).catch(console.log);
    const stakeAddress = response.data[0]?.stake_address;
    setCache(CacheKeyGetStakeKeyByAddress, paymentAddress, stakeAddress);
    return stakeAddress;
  } catch (e) {
    console.log(e);
  }
};

export const getAllAccountsAsync = async (stakeAddresses, cached = false) => {
  console.log("getAllAccountsAsync");

  const data = getFromCache(CacheKeyGetAllAccounts, stakeAddresses, 5);
  if (data) return data;

  const options = {
    method: "POST",
    url: `${KoiosProxyUrl}/api/v0/account_info${cached ? "_cached" : ""}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      _stake_addresses: stakeAddresses,
    },
  };
  try {
    const response = await Axios.request(options);
    setCache(CacheKeyGetAllAccounts, stakeAddresses, response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
