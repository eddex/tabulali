import coingeckoLogo from "../img/coingecko_logo.svg";

const Footer = () => {
  return (
    <div>
      <p className="mb-0">
        Made by{" "}
        <a href="https://github.com/eddex" target="_blank">
          eddex
        </a>
        . Issues can be reported on{" "}
        <a
          href="https://github.com/eddex/tabulali"
          target="_blank"
          alt="eddex/tabulali repository"
        >
          GitHub
        </a>
        .
      </p>
      <p>
        Consider to delegate your ADA to the{" "}
        <a href="https://solpi.de" target="_blank">
          SOLPI
        </a>{" "}
        stake pool to support this project!
      </p>
      <p>
        Price data provided by{" "}
        <a href="https://www.coingecko.com" target="_blank">
          <img src={coingeckoLogo} height="30rem" />
        </a>
      </p>
    </div>
  );
};

export default Footer;
