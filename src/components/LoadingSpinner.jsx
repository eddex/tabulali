import { Col, Row } from "react-bootstrap";
import loadingSpinner from "../img/loading_spinner.svg";

import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <Row>
      <Col>
        <p className="text-center">
          <img src={loadingSpinner} height="30rem" className="spin" />
        </p>
      </Col>
    </Row>
  );
};

export default LoadingSpinner;
