import { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  getSettingsFromLocalStorage,
  overrideSettingsInLocalStorage,
} from "../services/LocalStorage";
import { getSupportedVsCurrencies } from "../services/CoingeckoClient";

import "./Toolbar.css";

const SettingsButton = () => {
  const [hovering, setHovering] = useState(false);
  const [show, setShow] = useState(false);

  const [originalSettings, setOriginalSettings] = useState();
  const [compareCurrencies, setCompareCurrencies] = useState();
  const [selectedCompareCurrency, setSelectedCompareCurrency] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    var settings = getSettingsFromLocalStorage();
    setOriginalSettings(settings);
    setSelectedCompareCurrency(settings.compareCurrencyId);
    getSupportedVsCurrencies().then((currencies) => {
      setCompareCurrencies(currencies);
    });
  }, []);

  const compareCurrencyChanged = (e) => {
    setSelectedCompareCurrency(e.target.value);
  };

  const saveClicked = () => {
    let settings = { ...originalSettings };
    settings.compareCurrencyId = selectedCompareCurrency;
    settings.compareCurrency = selectedCompareCurrency.toUpperCase();
    overrideSettingsInLocalStorage(settings);
    setOriginalSettings(getSettingsFromLocalStorage());
    handleClose();
  };

  const cancelClicked = () => {
    setSelectedCompareCurrency(originalSettings.compareCurrencyId);
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
        <i className="bi bi-gear-fill"></i> Settings
      </Badge>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="4" lg="3" className="select-label">
              Compare currency:{" "}
            </Col>
            <Col>
              <Form.Select
                aria-label="Compare currency"
                onChange={compareCurrencyChanged}
                value={selectedCompareCurrency}
              >
                {compareCurrencies &&
                  compareCurrencies.map((c) => (
                    <option key={c} value={c}>
                      {c.toUpperCase()}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelClicked}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveClicked}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingsButton;
