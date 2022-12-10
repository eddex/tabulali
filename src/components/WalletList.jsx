import Wallet from "./Wallet";

const WalletList = (props) => {
  return (
    <div>
      {props.wallets &&
        props.wallets.map((account) => (
          <Wallet
            name={account.name}
            key={account.stake_address}
            stakeKey={account.stake_address}
            ada={account.total_balance / 1000000}
          />
        ))}
      {(!props.wallets || props.wallets.length === 0) && (
        <p>Add a wallet to get started.</p>
      )}
    </div>
  );
};

export default WalletList;
