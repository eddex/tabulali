import Card from "react-bootstrap/Card";
const Wallet = (props) => {
  return (
    <Card className="mb-3">
      <Card.Header>{props.stakeKey}</Card.Header>
      <Card.Body>
        <Card.Text>
          ADA: <b>{props.ada}</b>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Wallet;
