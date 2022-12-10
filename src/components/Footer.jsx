import Badge from "react-bootstrap/Badge";

const Footer = () => {
  return (
    <div>
      <p className="mb-0">
        Made by{" "}
        <a href="https://github.com/eddex" target="_blank">
          eddex
        </a>
        .
      </p>
      <p className="mb-0">
        Consider to donate to keep this site running:{" "}
        <Badge bg="primary">
          addr1qytjrc9f52pzt0uqaz4m8dspqfyluntu2cgy6mmahfldngcctsq9c04g2al08nxkge2mxlnkfn49pyxj55euulrgzz2sxpcway
        </Badge>
      </p>
      <p>
        Or stake with{" "}
        <a href="https://solpi.de" target="_blank">
          SOLPI
        </a>{" "}
        to support me!
      </p>
    </div>
  );
};

export default Footer;
