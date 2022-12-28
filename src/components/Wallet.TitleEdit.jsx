import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { setWalletNameInLocalStorage } from "../services/LocalStorage";

const WalletTitleEdit = (props) => {
  const [name, setName] = useState(props.name);

  const onInputChange = (event) => {
    setName(event.target.value);
  };
  const onSaveButtonClicked = () => {
    setWalletNameInLocalStorage(props.stakeKey, name);
    props.onSave();
  };

  return (
    <Form>
      <Form.Group className="input-group mt-1" controlId="formAddWallet">
        <Form.Control
          autoFocus={true}
          type="text"
          value={name}
          placeholder="Enter a name for this wallet"
          aria-describedby="saveTitle"
          onChange={onInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSaveButtonClicked();
            }
            if (e.key === "Escape") {
              props.onSave();
            }
          }}
        />
        <Button
          id="saveTitle"
          variant="secondary"
          type="button"
          onClick={onSaveButtonClicked}
        >
          Save
        </Button>
      </Form.Group>
    </Form>
  );
};

export default WalletTitleEdit;
