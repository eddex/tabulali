import Wallet from "./Wallet";
import Summary from "./Summary";

const WalletList = (props) => {
  return (
    <div className="mt-3">
      <Summary />
      <hr />
      {props.wallets &&
        props.wallets.map((account) => (
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
