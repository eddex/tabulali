import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddWallet from "./components/AddWallet";
import WalletList from "./components/WalletList";
import Footer from "./components/Footer";

function App() {
  return (
    <Container fluid="md">
      <Row>
        <Col>
          <AddWallet />
        </Col>
      </Row>
      <Row>
        <Col>
          <WalletList />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default App;
