import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getStakeKeyByAddressAsync } from "../services/KoiosClient";
import { StorageUpdatedEvent } from "../services/Events";

function AddWallet() {
  const [input, setInput] = useState("");
  const [inputValid, setInputValid] = useState(null);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const getStakeKey = async (addrOrStakeKey) => {
    if (addrOrStakeKey.length == 59 && addrOrStakeKey.startsWith("stake1")) {
      return addrOrStakeKey;
    }
    if (addrOrStakeKey.length == 103 && addrOrStakeKey.startsWith("addr1")) {
      return await getStakeKeyByAddressAsync(addrOrStakeKey);
    }
    return null;
  };

  const addStakeKeyToLocalStorage = (stakeKey) => {
    const items = JSON.parse(localStorage.getItem("stakeAddresses"));
    if (items && items.includes(stakeKey)) return;
    const newItems = items
      ? JSON.stringify([...items, stakeKey])
      : JSON.stringify([stakeKey]);
    localStorage.setItem("stakeAddresses", newItems);
    window.dispatchEvent(new Event(StorageUpdatedEvent));
  };

  const onClick = async () => {
    const stakeKey = await getStakeKey(input);
    if (stakeKey) {
      addStakeKeyToLocalStorage(stakeKey);
      setInputValid(true);
    } else {
      setInputValid(false);
      console.log(`not an address or stake key: ${input}`);
    }
  };

  return (
    <Form>
      <Form.Group className="input-group mt-3" controlId="formAddWallet">
        <Form.Control
          type="text"
          placeholder="Enter stake key or wallet address"
          aria-describedby="addWalletButton"
          isValid={inputValid}
          isInvalid={inputValid != null ? !inputValid : null}
          onChange={onInputChange}
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
