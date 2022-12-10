import { StorageUpdatedEvent } from "./Events";

const StakeAddressesLocalStorageKey = "wallets";

export const addWalletToLocalStorage = (stakeKey) => {
  const wallets = JSON.parse(
    localStorage.getItem(StakeAddressesLocalStorageKey)
  );
  let skip = false;
  if (wallets) {
    wallets.forEach((wallet, _) => {
      if (wallet.stakeKey === stakeKey) {
        skip = true; // skip if stake key already in list of wallets
      }
    });
  }
  if (skip) return;

  const newItems = wallets
    ? JSON.stringify([...wallets, { stakeKey: stakeKey }])
    : JSON.stringify([{ stakeKey: stakeKey }]);
  localStorage.setItem(StakeAddressesLocalStorageKey, newItems);
  window.dispatchEvent(new Event(StorageUpdatedEvent));
};

export const getWalletsFromLocalStorage = () =>
  JSON.parse(localStorage.getItem(StakeAddressesLocalStorageKey));

export const setWalletNameInLocalStorage = (stakeKey, name) => {
  const wallets = JSON.parse(
    localStorage.getItem(StakeAddressesLocalStorageKey)
  );
  if (wallets) {
    const updatedWallets = [];
    wallets.forEach((wallet, _) => {
      if (wallet.stakeKey === stakeKey) {
        wallet.name = name;
      }
      updatedWallets.push(wallet);
    });
    console.log(wallets);
    localStorage.setItem(
      StakeAddressesLocalStorageKey,
      JSON.stringify(updatedWallets)
    );
    window.dispatchEvent(new Event(StorageUpdatedEvent));
  }
};
