import { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import "./Wallet.css";

import WalletTitleEdit from "./Wallet.TitleEdit";
import { removeWalletFromLocalStorage } from "../services/LocalStorage";

const Wallet = (props) => {
  const [editTitle, setEditTitle] = useState(false);
  return (
    <Card className="mb-3">
      <Card.Header>
        {editTitle ? (
          <WalletTitleEdit
            onSave={() => setEditTitle(false)}
            stakeKey={props.stakeKey}
          />
        ) : (
          <>
            {props.name ? (
              <>
                {props.name}
                <span style={{ fontWeight: 500 }}>
                  {" :: "}
                  {props.stakeKey}
                </span>{" "}
                {props.pool && (
                  <Badge bg="dark">{props.pool.meta_json.ticker}</Badge>
                )}
              </>
            ) : (
              <>
                {props.stakeKey}{" "}
                {props.pool && (
                  <Badge bg="dark">{props.pool.meta_json.ticker}</Badge>
                )}
              </>
            )}
            <i
              className="bi-trash action-icon"
              role="img"
              aria-label="remove button"
              onClick={() => removeWalletFromLocalStorage(props.stakeKey)}
            ></i>
            <i
              className="bi-pencil-square action-icon"
              role="img"
              aria-label="edit button"
              onClick={() => setEditTitle(!editTitle)}
            ></i>
          </>
        )}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          ADA: <b>{props.ada}</b>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Wallet;
