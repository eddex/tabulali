import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { getWalletsFromLocalStorage } from "../services/LocalStorage";

import "./Toolbar.css";

const ToolbarExportButton = () => {
  const [hovering, setHovering] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const downloadJsonConfigFile = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(getWalletsFromLocalStorage())], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    var now = new Date();
    element.download = `tabulali_export_${now.getFullYear()}-${
      now.getMonth() + 1 // the month is 0 indexed, wtf
    }-${now.getDate()}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    element.remove();
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
        Export wallet config
      </Badge>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Export</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Download your wallet configuration as a file or copy the data below to
          later import it in another browser or on another device:
        </Modal.Body>
        <Modal.Body className="word-wrap">
          <code>{JSON.stringify(getWalletsFromLocalStorage())}</code>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={downloadJsonConfigFile}>
            Download wallet config
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ToolbarExportButton;
