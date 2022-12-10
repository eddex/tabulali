import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Summary from "./components/Summary";
import AddWallet from "./components/AddWallet";
import WalletList from "./components/WalletList";
import Footer from "./components/Footer";

import { getAllAccountsAsync, getPoolInfo } from "./services/KoiosClient";
import { StorageUpdatedEvent } from "./services/Events";
import { getWalletsFromLocalStorage } from "./services/LocalStorage";
import EpochProgress from "./components/EpochProgress";

function App() {
  const [wallets, setWallets] = useState([]);
  const [pools, setPools] = useState([]);

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

    if (!stakeKeys || stakeKeys.length < 1) return;

    getAllAccountsAsync(stakeKeys, true).then((accountInfos) => {
      if (accountInfos && accountInfos.length > 0) {
        var extendedAccountInfos = [];
        accountInfos.forEach((acc, _) => {
          acc.name = getWalletNameByStakeKey(localWallets, acc.stake_address);
          extendedAccountInfos.push(acc);
        });
        setWallets(extendedAccountInfos);
        getPoolInfo(extendedAccountInfos.map((w) => w.delegated_pool)).then(
          (pools) => {
            setPools(pools);
          }
        );
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
          <Summary wallets={wallets} pools={pools} />
        </Col>
      </Row>
      <Row>
        <Col>
          <EpochProgress start={1506203091} end={1506635091} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <WalletList wallets={wallets} pools={pools} />
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
