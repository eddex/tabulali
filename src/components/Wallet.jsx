import { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Wallet.css";

import WalletTitleEdit from "./Wallet.TitleEdit";
import { removeWalletFromLocalStorage } from "../services/LocalStorage";
import { toLocalNumber } from "../services/Localization";

const Wallet = (props) => {
  const [editTitle, setEditTitle] = useState(false);
  return (
    <Card className="mb-3">
      <Card.Header>
        {editTitle ? (
          <WalletTitleEdit
            onSave={() => setEditTitle(false)}
            stakeKey={props.stakeKey}
            name={props.name}
          />
        ) : (
          <>
            {props.name ? (
              <>
                {props.pool && (
                  <Badge bg="dark">{props.pool.meta_json.ticker}</Badge>
                )}{" "}
                {props.name}
                <span style={{ fontWeight: 500 }}>
                  {" :: "}
                  {props.stakeKey}
                </span>
              </>
            ) : (
              <>
                {props.pool && (
                  <Badge bg="dark">{props.pool.meta_json.ticker}</Badge>
                )}{" "}
                {props.stakeKey}
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
        <Row>
          <Col sm="6" lg="4" xl="3">
            Balance: <b>ADA {toLocalNumber(props.ada)}</b>
          </Col>
          <Col>
            Value:{" "}
            <b>
              {props.vsCurrency} {toLocalNumber(props.value, 2)}
            </b>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Wallet;
