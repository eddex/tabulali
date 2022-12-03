import { useState, useEffect } from "react";
import Wallet from "./Wallet";
import { getAllAccountsAsync } from "../services/KoiosClient";
import { StorageUpdatedEvent } from "../services/Events";
import Summary from "./Summary";

const WalletList = (props) => {
  const [wallets, setWallets] = useState([]);

  const onWalletAdded = () => {
    console.log("asd");
    getAllAccountsAsync(
      JSON.parse(localStorage.getItem("stakeAddresses"))
    ).then((accounts) => setWallets(accounts));
  };

  useEffect(onWalletAdded, []);

  window.addEventListener(StorageUpdatedEvent, onWalletAdded);

  return (
    <div className="mt-3">
      <Summary />
      <hr />
      {wallets.map((account) => (
        <Wallet
          key={account.stake_address}
          stakeKey={account.stake_address}
          ada={account.total_balance / 1000000}
        />
      ))}
    </div>
  );
};

export default WalletList;
