import Axios from "axios";
import { getFromCache, setCache } from "./MemoryCache";

const CoingeckoApiUrl = "https://api.coingecko.com/api/v3/";
const CacheKeyAdaPrice = "AdaPrice";
const CacheKeyVsCurrencies = "VsCurrencies";

export const getAdaPrice = async (vsCurrency) => {
  console.log("::: CoingeckoClient:getAdaPrice");

  const data = getFromCache(CacheKeyAdaPrice + vsCurrency, null, 1);
  if (data) return data;

  const options = {
    method: "GET",
    url: `${CoingeckoApiUrl}simple/price`,
    params: { ids: "cardano", vs_currencies: vsCurrency },
    headers: { accept: "application/json" },
  };

  try {
    const response = await Axios.request(options);
    const price = response.data.cardano[vsCurrency];
    console.log(price);
    setCache(CacheKeyAdaPrice + vsCurrency, null, price);
    return price;
  } catch (e) {
    console.error(e);
  }
};

export const getSupportedVsCurrencies = async () => {
  console.log("::: CoingeckoClient:getSupportedVsCurrencies");

  const data = getFromCache(CacheKeyVsCurrencies, CacheKeyVsCurrencies, 360);
  if (data) return data;

  const options = {
    method: "GET",
    url: `${CoingeckoApiUrl}simple/supported_vs_currencies`,
    headers: { accept: "application/json" },
  };

  try {
    const response = await Axios.request(options);
    const vsCurrencies = response.data;
    setCache(CacheKeyVsCurrencies, CacheKeyVsCurrencies, vsCurrencies);
    return vsCurrencies.sort();
  } catch (e) {
    console.error(e);
  }
};
