import { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import { getEpochProgress } from "../services/KoiosClient";

const EpochProgress = () => {
  const [epochProgress, setEpochProgress] = useState(0);
  useEffect(() => {
    getEpochProgress().then((percentage) =>
      setEpochProgress(parseInt(percentage * 100))
    );
  }, []);

  return (
    <ProgressBar
      variant="primary"
      striped={true}
      animated={true}
      now={epochProgress}
      label={`Epoch progress: ${epochProgress}%`}
    />
  );
};

export default EpochProgress;
