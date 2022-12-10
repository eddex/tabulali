import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AddWallet from "./components/AddWallet";
import WalletList from "./components/WalletList";
import Footer from "./components/Footer";

import { getAllAccountsAsync } from "./services/KoiosClient";
import { StorageUpdatedEvent } from "./services/Events";
import { getStakeKeysFromLocalStorage } from "./services/LocalStorage";

function App() {
  const [wallets, setWallets] = useState([]);
  const onWalletAdded = () => {
    getAllAccountsAsync(getStakeKeysFromLocalStorage(), true).then(
      (accounts) => {
        if (accounts) setWallets(accounts);
      }
    );
  };

  // will be called twice in debug mode but not in prod due to UseStrict (see index.js)
  useEffect(onWalletAdded, []);

  useEffect(() => {
    function handleStorageUpdatedEvent(_) {
      console.log("::: App:StorageUpdatedEvent");
      onWalletAdded();
    }
    window.addEventListener(StorageUpdatedEvent, handleStorageUpdatedEvent);
    return () =>
      window.removeEventListener(
        StorageUpdatedEvent,
        handleStorageUpdatedEvent
      );
  }, []);

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <AddWallet />
        </Col>
      </Row>
      <Row>
        <Col>
          <WalletList wallets={wallets} />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default App;
