<h1 align="center">
<img src="src/logo.svg" width="200px">
<p>Tabulali - Cardano wallet aggregator</p>
</h1>

A simple website to get an aggregated overview of all your Cardano wallets.

## 💻 Development

Start the app: `npm start`

### Prerequisites

To fetch data from the public [Koios](https://koios.rest) API, a proxy server is needed.
The app tries to connect to `localhost:5001` if run locally.

A simple proxy server can be found here: [eddex/koios-proxy](https://github.com/eddex/koios-proxy).
You can configure the proxy url in `src/services/KoiosClient.js`, if you use a different proxy server.

### Deploy to GitHib pages

`npm run deploy`

## 📝 Roadmap

### Short term

- [x] Add wallets and show total balance
- [x] Show aggregated total balance of all wallets
- [x] User defined name tags for wallets
- [x] Remove wallets
- [x] Show stake pool ticker in wallet and summary of all stake pools
- [ ] Store wallet data in local storage and show it on start before updating the data from API
- [ ] Show amount of ADA in UTxOs and on reward address
- [x] Epoch progress bar
- [x] Export and import wallet configuration
- [ ] Update data periodically/on demand
- [x] Add user settings
- [x] Configure preferred fiat currency
- [x] Show total value (fiat)
- [x] Show ADA price (fiat)
- [ ] Setting for average buy price (fiat)
- [ ] Show profit/loss (fiat)
- [ ] Add wallet by AdaHandle

### Long term

- [x] Show list of native assets (FT & NFT)
- [x] Setting to enable/disable display of native assets
- [ ] Show approximate ADA value of native assets
- [ ] Wallet connect button for one click stake delegation (maybe using [MeshJS](https://mesh.martify.io/))

## 🙏 Attributions

- Blockchain data is provided by [Koios.rest](https://koios.rest) - a decentralized and elastic RESTful query layer for exploring data on Cardano
- Logo contains an emoji designed by [OpenMoji](https://openmoji.org/) - the open-source emoji and icon project. License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/#)
- Using [Bootstrap](https://getbootstrap.com/) CSS framework with [bootswatch Quartz](https://bootswatch.com/quartz/) theme.
- Prices are provided by [Coingecko](https://coingecko.com)
- React GitHub pages deployment based on [gitname/react-gh-pages](https://github.com/gitname/react-gh-pages)
