import Axios from "axios";
import { getFromCache, setCache } from "./MemoryCache";

const KoiosProxyUrl = window.location.href.includes("localhost")
  ? "http://localhost:5001"
  : "https://koios-proxy-cloud-run-t4xl6kq4ia-od.a.run.app";
const apiVersion = "/api/v1";

const CacheKeyGetStakeKeyByAddress = "StakeKeyByAddress";
const CacheKeyGetAllAccounts = "AllAccounts";
const CacheKeyGetAllAssets = "AllAssets";
const CacheKeyGetPoolInfo = "PoolInfo";
const CacheKeyActiveStakeAtEpoch = "ActiveStakeAtEpoch";
const CacheKeyRewards = "Rewards";

export const getStakeAddressByPaymentAddressAsync = async (paymentAddress) => {
  console.log("::: KoiosClient:getStakeKeyByAddressAsync");

  const data = getFromCache(CacheKeyGetStakeKeyByAddress, paymentAddress, null);
  if (data) return data;

  const options = {
    method: "POST",
    url: `${KoiosProxyUrl}${apiVersion}/address_info`,
    params: { select: "stake_address" },
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
  console.log("::: KoiosClient:getAllAccountsAsync");

  const data = getFromCache(CacheKeyGetAllAccounts, stakeAddresses, 5);
  if (data && data.length > 0) return data;

  const options = {
    method: "POST",
    url: `${KoiosProxyUrl}${apiVersion}/account_info${cached ? "_cached" : ""}`,
    params: { select: "stake_address,delegated_pool,total_balance" },
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

export const getAllAssetsAsync = async (stakeAddresses) => {
  console.log("::: KoiosClient:getAllAssetsAsync");

  const data = getFromCache(CacheKeyGetAllAssets, stakeAddresses, 5);
  if (data) return data;

  const options = {
    method: "POST",
    url: `${KoiosProxyUrl}${apiVersion}/account_assets`,
    params: { select: "stake_address,asset_name,quantity,fingerprint" },
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
    setCache(CacheKeyGetAllAssets, stakeAddresses, response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getPoolInfo = async (bech32PoolIds) => {
  console.log("::: KoiosClient:getPoolInfo");

  const data = getFromCache(CacheKeyGetPoolInfo, bech32PoolIds, null);
  if (data) return data;

  const options = {
    method: "POST",
    url: `${KoiosProxyUrl}${apiVersion}/pool_info`,
    params: { select: "pool_id_bech32,meta_json" },
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    data: {
      _pool_bech32_ids: bech32PoolIds,
    },
  };

  try {
    const response = await Axios.request(options);
    setCache(CacheKeyGetPoolInfo, bech32PoolIds, response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getEpochProgress = async () => {
  console.log("::: KoiosClient:getEpochProgress");
  const options = {
    method: "GET",
    url: `${KoiosProxyUrl}${apiVersion}/epoch_info`,
    params: { order: "epoch_no.desc", limit: "2" },
    headers: { Accept: "application/json" },
  };

  try {
    const response = await Axios.request(options);
    console.log(response);
    const now = new Date().getTime() / 1000;
    let epoch = response.data[1];
    if (response.data[0].start_time && response.data[0].start_time <= now) {
      epoch = response.data[0];
    }
    const fullRange = epoch.end_time - epoch.start_time;
    const currentProgress = now - epoch.start_time;
    return currentProgress / fullRange;
  } catch (e) {
    console.log(e);
  }
};

export const getActiveStakeForEpoch = async (epoch, stakeKeys) => {
  console.log("::: KoiosClient:getActiveStakeForEpoch");

  const cacheId = { epoch: epoch, stakeKeys: stakeKeys };
  const data = getFromCache(CacheKeyActiveStakeAtEpoch, cacheId, null);
  if (data) return data;

  const options = {
    method: "POST",
    url: `${KoiosProxyUrl}${apiVersion}/account_history`,
    headers: { accept: "application/json", "content-type": "application/json" },
    data: {
      _stake_addresses: stakeKeys,
      _epoch_no: epoch,
    },
  };

  try {
    const response = await Axios.request(options);
    setCache(CacheKeyActiveStakeAtEpoch, cacheId, response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getRewards = async (stakeKeys) => {
  console.log("::: KoiosClient:getRewards");

  const cacheId = stakeKeys;
  const data = getFromCache(CacheKeyRewards, cacheId, null);
  if (data) return data;

  const options = {
    method: "POST",
    url: `${KoiosProxyUrl}${apiVersion}/account_rewards`,
    headers: { accept: "application/json", "content-type": "application/json" },
    data: {
      _stake_addresses: stakeKeys,
    },
  };

  try {
    const response = await Axios.request(options);
    setCache(CacheKeyRewards, cacheId, response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
