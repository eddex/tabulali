import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { getStakeAddressByPaymentAddressAsync } from "../services/KoiosClient";
import { addWalletToLocalStorage } from "../services/LocalStorage";

function AddWallet() {
  const [input, setInput] = useState("");
  const [inputValid, setInputValid] = useState(null);

  const onInputChange = (event) => {
    setInput(event.target.value);
    setInputValid(null);
  };

  const getStakeKey = async (addrOrStakeKey) => {
    if (addrOrStakeKey.length === 59 && addrOrStakeKey.startsWith("stake1")) {
      return addrOrStakeKey;
    }
    if (addrOrStakeKey.length === 103 && addrOrStakeKey.startsWith("addr1")) {
      return await getStakeAddressByPaymentAddressAsync(addrOrStakeKey);
    }
    return null;
  };

  const onClick = async () => {
    const stakeKey = await getStakeKey(input);
    if (stakeKey) {
      addWalletToLocalStorage(stakeKey);
      setInputValid(true);
    } else {
      setInputValid(false);
      console.log(`not an address or stake key: ${input}`);
    }
  };

  return (
    <Form>
      <Form.Group className="input-group mt-1" controlId="formAddWallet">
        <Form.Control
          type="text"
          placeholder="Enter stake key or wallet address"
          aria-describedby="addWalletButton"
          isValid={inputValid}
          isInvalid={inputValid != null ? !inputValid : null}
          onChange={onInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onClick();
            }
          }}
        />
        <Button
          id="addWalletButton"
          variant="primary"
          type="button"
          onClick={onClick}
        >
          Add wallet
        </Button>
      </Form.Group>
      <div className="text-muted">
        This data is only stored in your browser.
      </div>
    </Form>
  );
}

export default AddWallet;
