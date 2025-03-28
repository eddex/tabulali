import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getActiveStakeForEpoch, getRewards } from "../services/KoiosClient";
import { toLocalNumber } from "../services/Localization";

import "./Toolbar.css";

const ToolbarTax = (props) => {
  const [hovering, setHovering] = useState(false);
  const [show, setShow] = useState(false);
  const [lovelaceBalance, setLovelaceBalance] = useState(0);
  const [lovelaceRewards, setLovelaceRewards] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadActiveStakeAtEpoch = async () => {
    let totalBalance = 0;
    var result = await getActiveStakeForEpoch(
      props.lastRewardEpoch,
      props.stakeKeys
    );
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
            reward.spendable_epoch >= props.firstRewardEpoch &&
            reward.spendable_epoch <= props.lastRewardEpoch
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
        <i className="bi bi-coin"></i> Taxes {props.year}
      </Badge>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tax information {props.year}</Modal.Title>
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
              Staking rewards {props.year}:
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
                  href={`https://cexplorer.io/epoch/${props.lastRewardEpoch}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  epoch {props.lastRewardEpoch}
                </a>
                : {props.lastRewardEpochTimestamp}.
              </i>
            </Col>
          </Row>
          <Row>
            <Col>
              <i>
                To calculate the staking rewards, all rewards received from{" "}
                <a
                  href={`https://cexplorer.io/epoch/${
                    props.firstRewardEpoch - 2
                  }`}
                  target="_blank"
                  rel="noreferrer"
                >
                  epoch {props.firstRewardEpoch - 2}
                </a>{" "}
                (payed out in{" "}
                <a
                  href={`https://cexplorer.io/epoch/${props.firstRewardEpoch}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  epoch {props.firstRewardEpoch}
                </a>{" "}
                {props.firstRewardEpochTimestamp}) to{" "}
                <a
                  href={`https://cexplorer.io/epoch/${
                    props.lastRewardEpoch - 2
                  }`}
                  target="_blank"
                  rel="noreferrer"
                >
                  epoch {props.lastRewardEpoch - 2}
                </a>{" "}
                (payed out in{" "}
                <a
                  href={`https://cexplorer.io/epoch/${props.lastRewardEpoch}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  epoch {props.lastRewardEpoch}
                </a>{" "}
                at {props.lastRewardEpochTimestamp}) are taken into
                consideration.
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

export default ToolbarTax;
