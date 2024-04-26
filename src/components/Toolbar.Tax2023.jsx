import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getActiveStakeForEpoch, getRewards } from "../services/KoiosClient";
import { toLocalNumber } from "../services/Localization";

import "./Toolbar.css";

const ToolbarTax2023 = (props) => {
  const [hovering, setHovering] = useState(false);
  const [show, setShow] = useState(false);
  const [lovelaceBalance, setLovelaceBalance] = useState(0);
  const [lovelaceRewards, setLovelaceRewards] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const endOfYearEpoch = 458; // first block Dec 31, 2023 10:45:01 PM
  const firstRewardEpoch = 386; // rewards from epoch 384 payed out in epoch 386 (first epoch to start in 2023)
  const lastRewardEpoch = 458; // rewards from epoch 456 payed out in epoch 458 (last epoch to start in 2023)

  const loadActiveStakeAtEpoch = async () => {
    let totalBalance = 0;
    var result = await getActiveStakeForEpoch(endOfYearEpoch, props.stakeKeys);
    if (result && result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        const activeStake = result[i].history[0].active_stake;
        totalBalance = totalBalance + parseInt(activeStake, 10);
      }
    }
    setLovelaceBalance(totalBalance);
  };

  const loadRewards = async () => {
    let totalRewards = 0;
    const result = await getRewards(props.stakeKeys);
    if (result && result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        const stakeKeyRewards = result[i];
        for (let j = 0; j < stakeKeyRewards.rewards.length; j++) {
          const reward = stakeKeyRewards.rewards[j];
          if (
            reward.spendable_epoch >= firstRewardEpoch &&
            reward.spendable_epoch <= lastRewardEpoch
          ) {
            totalRewards = totalRewards + parseInt(reward.amount, 10);
          }
        }
      }
    }
    console.log(totalRewards);
    setLovelaceRewards(totalRewards);
  };

  useEffect(() => {
    const loadData = async () => {
      await loadActiveStakeAtEpoch();
      await loadRewards();
    };
    loadData(); // directly calling an async method in useEffect() is not allowed
    // eslint-disable-next-line
  }, [props]);

  return (
    <>
      <Badge
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        bg={hovering ? "primary" : "secondary"}
        className="clickable"
        onClick={handleShow}
      >
        <i className="bi bi-coin"></i> Taxes 2023
      </Badge>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tax information 2023</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col xs="12" sm="5" lg="3">
              End of year balance:
            </Col>
            <Col>
              <b>ADA {toLocalNumber(lovelaceBalance / 1000000)}</b>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="5" lg="3">
              Staking rewards 2023:
            </Col>
            <Col>
              <b>ADA {toLocalNumber(lovelaceRewards / 1000000)}</b>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <i>
                The EoY balance is based on the snapshot from the start of{" "}
                <a
                  href="https://explorer.cardano.org/en/epoch?number=458"
                  target="_blank"
                  rel="noreferrer"
                >
                  epoch 458
                </a>
                : 2023/12/31 22:45:01 UTC.
              </i>
            </Col>
          </Row>
          <Row>
            <Col>
              <i>
                To calculate the staking rewards, all rewards received from{" "}
                <a
                  href="https://explorer.cardano.org/en/epoch?number=384"
                  target="_blank"
                  rel="noreferrer"
                >
                  epoch 384
                </a>{" "}
                (payed out in{" "}
                <a
                  href="https://explorer.cardano.org/en/epoch?number=386"
                  target="_blank"
                  rel="noreferrer"
                >
                  epoch 386
                </a>{" "}
                2023/01/05) to{" "}
                <a
                  href="https://explorer.cardano.org/en/epoch?number=456"
                  target="_blank"
                  rel="noreferrer"
                >
                  epoch 456
                </a>{" "}
                (payed out in{" "}
                <a
                  href="https://explorer.cardano.org/en/epoch?number=458"
                  target="_blank"
                  rel="noreferrer"
                >
                  epoch 458
                </a>{" "}
                at 2023/12/31) are taken into consideration.
              </i>
            </Col>
          </Row>
          <Row>
            <Col>
              <i>
                Please note that the data is for informational purposes only,
                there is no guarantee for correctness or accuracy. Always
                consult your taxes with a professional tax advisor.
              </i>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ToolbarTax2023;
