import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { importWalletConfig } from "../services/LocalStorage";

import "./Toolbar.css";

const ToolbarImportButton = () => {
  const [input, setInput] = useState("");
  const [hovering, setHovering] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const importWallets = () => {
    importWalletConfig(input);
    setInput("");
    handleClose();
  };
  return (
    <>
      <Badge
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        bg={hovering ? "primary" : "secondary"}
        className="clickable"
        onClick={handleShow}
      >
        <i className="bi bi-upload"></i> Import wallet config
      </Badge>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Import</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Import your wallet config from another device. This will override your
          current wallet configuration!
        </Modal.Body>
        <Modal.Body className="word-wrap">
          <Form.Control
            onChange={onInputChange}
            as="textarea"
            placeholder="Paste your exported wallet configuration here."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={importWallets}>
            Import
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ToolbarImportButton;
