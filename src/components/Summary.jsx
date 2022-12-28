import { useState, useEffect } from "react";

import Badge from "react-bootstrap/Badge";

import { toLocalNumber } from "../services/Localization";

const Summary = (props) => {
  const [totalAda, setTotalAda] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (!props.wallets) return 0;
    let total = 0;
    props.wallets.forEach((wallet, _) => {
      total += wallet.total_balance / 1000000;
    });
    setTotalAda(toLocalNumber(total));
    setTotalValue(toLocalNumber(total * props.adaPrice, 2));
  }, [props.wallets, props.adaPrice]);

  return (
    <div className="mt-2">
      <h1>
        Total balance: <b>ADA {totalAda}</b>
      </h1>
      <p>
        Total value:{" "}
        <b>
          {props.vsCurrency} {totalValue}
        </b>{" "}
        (ADA/{props.vsCurrency}: {toLocalNumber(props.adaPrice)})
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
