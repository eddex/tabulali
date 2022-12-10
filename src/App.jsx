import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Summary from "./components/Summary";
import AddWallet from "./components/AddWallet";
import WalletList from "./components/WalletList";
import Footer from "./components/Footer";

import { getAllAccountsAsync } from "./services/KoiosClient";
import { StorageUpdatedEvent } from "./services/Events";
import { getWalletsFromLocalStorage } from "./services/LocalStorage";

function App() {
  const [wallets, setWallets] = useState([]);

  const getWalletNameByStakeKey = (localWallets, stakeKey) => {
    let name = "";
    if (localWallets) {
      localWallets.forEach((w, _) => {
        if (w.stakeKey === stakeKey) {
          name = w.name;
        }
      });
    }
    return name;
  };

  const onWalletAdded = () => {
    const localWallets = getWalletsFromLocalStorage();
    const stakeKeys = localWallets ? localWallets.map((w) => w.stakeKey) : null;
    getAllAccountsAsync(stakeKeys, true).then((accountInfos) => {
      if (accountInfos) {
        var extendedAccountInfos = [];
        accountInfos.forEach((acc, _) => {
          acc.name = getWalletNameByStakeKey(localWallets, acc.stake_address);
          extendedAccountInfos.push(acc);
        });
        setWallets(extendedAccountInfos);
      }
    });
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
          <Summary wallets={wallets} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <WalletList wallets={wallets} />
        </Col>
      </Row>
      <Row>
        <Col>
          <AddWallet />
        </Col>
      </Row>
      <hr />
      <Footer />
    </Container>
  );
}

export default App;
