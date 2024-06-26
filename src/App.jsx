import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Summary from "./components/Summary";
import AddWallet from "./components/AddWallet";
import WalletList from "./components/WalletList";
import Footer from "./components/Footer";
import EpochProgress from "./components/EpochProgress";
import Toolbar from "./components/Toolbar";
import LoadingSpinner from "./components/LoadingSpinner";

import {
  getAllAccountsAsync,
  getAllAssetsAsync,
  getPoolInfo,
} from "./services/KoiosClient";
import { StorageUpdatedEvent, SettingsUpdatedEvent } from "./services/Events";
import {
  getWalletsFromLocalStorage,
  getSettingsFromLocalStorage,
} from "./services/LocalStorage";
import { getAdaPrice } from "./services/CoingeckoClient";
import { hex2a } from "./services/HexConverter";

function App() {
  const [ready, setReady] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [pools, setPools] = useState([]);
  const [adaPrice, setAdaPrice] = useState(0);
  const [settings, setSettings] = useState(getSettingsFromLocalStorage());

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

  const onWalletAdded = async (showNativeAssets = null) => {
    const localWallets = getWalletsFromLocalStorage();
    const stakeKeys = localWallets ? localWallets.map((w) => w.stakeKey) : null;

    if (!stakeKeys || stakeKeys.length < 1) {
      setWallets([]);
      return;
    }

    if (showNativeAssets === null) {
      showNativeAssets = settings.showNativeAssets;
    }

    let accountInfos = await getAllAccountsAsync(stakeKeys, true);
    // stakeKeys that are not delegated to a pool are not returned by the account_info_cached endpoint
    if (!accountInfos || accountInfos.length < stakeKeys.length) {
      let fetchedStakeKeys = accountInfos.map((a) => a.stake_address);
      for (let i = 0; i < stakeKeys.length; i++) {
        const stakeKey = stakeKeys[i];
        let stakeKeysToFetch = [];
        if (!fetchedStakeKeys.includes(stakeKey)) {
          stakeKeysToFetch.push(stakeKey);
        }
        if (stakeKeysToFetch.length > 0) {
          const infos = await getAllAccountsAsync(stakeKeysToFetch, false);
          accountInfos = accountInfos.concat(infos);
        }
      }
    }

    let assets = [];
    if (showNativeAssets) {
      assets = await getAllAssetsAsync(stakeKeys);
    }

    if (accountInfos && accountInfos.length > 0) {
      let extendedAccountInfos = [];
      accountInfos.forEach((acc, _) => {
        acc.name = getWalletNameByStakeKey(localWallets, acc.stake_address);
        acc.assetList =
          assets.filter((x) => x.stake_address === acc.stake_address) ?? [];
        acc.assetList.sort((a, b) =>
          hex2a(a.asset_name).localeCompare(hex2a(b.asset_name))
        );
        extendedAccountInfos.push(acc);
      });
      setWallets(extendedAccountInfos);

      const pools = await getPoolInfo(
        extendedAccountInfos
          .map((w) => w.delegated_pool)
          .filter((delegated_pool) => delegated_pool !== null)
      );
      setPools(pools);
    }
  };

  const onSettingsUpdated = async () => {
    var newSettings = getSettingsFromLocalStorage();
    setSettings(newSettings);
    const adaPrice = await getAdaPrice(newSettings.compareCurrencyId);
    setAdaPrice(adaPrice);
    // for some reason, the settings state is not updated after setSettings is called above
    await onWalletAdded(newSettings.showNativeAssets);
  };

  // will be called twice in debug mode but not in prod due to UseStrict (see index.js)
  useEffect(() => {
    const loadData = async () => {
      await onSettingsUpdated();
      await onWalletAdded();
      setReady(true);
    };
    loadData(); // directly calling an async method in useEffect() is not allowed
  }, []);

  useEffect(() => {
    const handleStorageUpdatedEvent = async (_) => {
      console.log("::: App:StorageUpdatedEvent");
      await onWalletAdded();
    };
    window.addEventListener(StorageUpdatedEvent, handleStorageUpdatedEvent);
    return () =>
      window.removeEventListener(
        StorageUpdatedEvent,
        handleStorageUpdatedEvent
      );
  }, []);

  useEffect(() => {
    const handleSettingsUpdatedEvent = async (_) => {
      console.log("::: App:SettingsUpdatedEvent");
      await onSettingsUpdated();
    };
    window.addEventListener(SettingsUpdatedEvent, handleSettingsUpdatedEvent);
    return () =>
      window.removeEventListener(
        SettingsUpdatedEvent,
        handleSettingsUpdatedEvent
      );
  }, []);

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Toolbar stakeKeys={wallets.map((w) => w.stake_address)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Summary
            wallets={wallets}
            pools={pools}
            adaPrice={adaPrice}
            vsCurrency={settings.compareCurrency}
          />
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
          {ready ? (
            <WalletList
              wallets={wallets}
              pools={pools}
              adaPrice={adaPrice}
              vsCurrency={settings.compareCurrency}
            />
          ) : (
            <LoadingSpinner />
          )}
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
