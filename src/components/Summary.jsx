import Badge from "react-bootstrap/Badge";

import { toLocalNumber } from "../services/Localization";

const Summary = (props) => {
  const totalAda = () => {
    if (!props.wallets) return 0;
    let total = 0;
    props.wallets.forEach((wallet, _) => {
      total += wallet.total_balance / 1000000;
    });
    return total;
  };
  return (
    <div className="mt-2">
      <h1>Summary</h1>
      <p>
        Total balance: <b>{toLocalNumber(totalAda())} ADA</b>
      </p>
      <p>
        {props.pools && props.pools.length > 0 && (
          <>
            Pools:{" "}
            {props.pools.map((p) => (
              <span key={p.meta_json.ticker}>
                <Badge className="ml-1" bg="secondary">
                  {p.meta_json.ticker}
                </Badge>{" "}
              </span>
            ))}
          </>
        )}
      </p>
    </div>
  );
};

export default Summary;
