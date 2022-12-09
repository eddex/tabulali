import { StorageUpdatedEvent } from "./Events";

const StakeAddressesLocalStorageKey = "stakeAddresses";

export const addStakeKeyToLocalStorage = (stakeKey) => {
  const items = JSON.parse(localStorage.getItem(StakeAddressesLocalStorageKey));
  if (items && items.includes(stakeKey)) return;
  const newItems = items
    ? JSON.stringify([...items, stakeKey])
    : JSON.stringify([stakeKey]);
  localStorage.setItem(StakeAddressesLocalStorageKey, newItems);
  window.dispatchEvent(new Event(StorageUpdatedEvent));
};

export const getStakeKeysFromLocalStorage = () =>
  JSON.parse(localStorage.getItem(StakeAddressesLocalStorageKey));
