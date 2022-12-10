import { useState } from "react";
import Card from "react-bootstrap/Card";

import "./Wallet.css";

import WalletTitleEdit from "./Wallet.TitleEdit";

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
                <span style={{ fontWeight: 500 }}> :: {props.stakeKey}</span>
              </>
            ) : (
              props.stakeKey
            )}
            <i
              className="bi-pencil-square edit-icon"
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
