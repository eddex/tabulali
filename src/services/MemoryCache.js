const Cache = {};

const compareObjects = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

/* Try get a value from the cache.
 * If there is no cache entry with a matching key and id, null is returned.
 * param maxAgeInMinutes: can be set to null for no cache time limit
 */
export const getFromCache = (key, id, maxAgeInMinutes) => {
  if (
    !Cache[key] ||
    (maxAgeInMinutes &&
      new Date() > addMinutes(Cache[key].timestamp, maxAgeInMinutes)) ||
    !compareObjects(Cache[key].id, id)
  ) {
    console.log("cache missed");
    return null;
  }
  console.log("cache hit");
  return Cache[key].data;
};

/* Set data in the cache.
 * param key: is one of the constants for the different endpoints
 * param id: are the params that are sent with the request, if they change, the cache is invalid
 * param data: the data to cache
 */
export const setCache = (key, id, data) => {
  Cache[key] = {};
  Cache[key].timestamp = new Date();
  Cache[key].id = id;
  Cache[key].data = data;
};
