const Summary = (props) => {
  const totalAda = () => {
    if (!props.wallets) return 0;
    let total = 0;
    console.log(props.wallets);
    props.wallets.forEach((wallet, i) => {
      console.log(wallet);
      total += wallet.total_balance / 1000000;
    });
    return total;
  };
  return (
    <div className="mt-3">
      <h1>Summary</h1>
      <p>
        Total balance: <b>{totalAda()} ADA</b>
      </p>
    </div>
  );
};

export default Summary;
