<h1 align="center">
<img src="src/logo.svg" width="200px">
<p>Tabulali - Cardano wallet aggregator</p>
</h1>

Simple website to get an aggregated overview of all your Cardano wallets.
All data is stored locally in the browser.

## Development

To fetch data from the public [Koios](https://koios.rest) API, a proxy server is needed.

A simple implementation can be found here: [eddex/koios-proxy](https://github.com/eddex/koios-proxy).

Configure the proxy url in `src/services/KoiosClient.js`

## Attributions

- Blockchain data is provided by [Koios.rest](https://koios.rest) - a decentralized and elastic RESTful query layer for exploring data on Cardano
- Logo contains an emoji designed by [OpenMoji](https://openmoji.org/) – the open-source emoji and icon project. License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/#)
- Using [Bootstrap](https://getbootstrap.com/) CSS framework with [bootswatch Quartz](https://bootswatch.com/quartz/) theme.
