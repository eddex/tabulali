import Axios from "axios";
import { getFromCache, setCache } from "./MemoryCache";

const CoingeckoApiUrl = "https://api.coingecko.com/api/v3/";
const CacheKeyAdaPrice = "AdaPrice";

export const getAdaPrice = async (vsCurrency) => {
  console.log("::: CoingeckoClient:getAdaPrice");

  const data = getFromCache(CacheKeyAdaPrice, vsCurrency, 1);
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
    setCache(CacheKeyAdaPrice, vsCurrency, price);
    return price;
  } catch (e) {
    console.error(e);
  }
};
