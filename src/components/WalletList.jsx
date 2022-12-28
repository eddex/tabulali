import { useState } from "react";

import Wallet from "./Wallet";

const WalletList = (props) => {
  const getPool = (poolId) => {
    let pool = null;
    props.pools.forEach((p, _) => {
      if (p.pool_id_bech32 === poolId) {
        pool = p;
      }
    });
    return pool;
  };

  return (
    <div>
      {props.wallets &&
        props.wallets.map((account) => (
          <Wallet
            name={account.name}
            key={account.stake_address}
            stakeKey={account.stake_address}
            ada={account.total_balance / 1000000}
            pool={getPool(account.delegated_pool)}
            value={(account.total_balance / 1000000) * props.adaPrice}
          />
        ))}
      {(!props.wallets || props.wallets.length === 0) && (
        <p>Add a wallet to get started.</p>
      )}
    </div>
  );
};

export default WalletList;
