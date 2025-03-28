import ToolbarExportButton from "./Toolbar.ExportButton";
import ToolbarImportButton from "./Toolbar.ImportButton";
import SettingsButton from "./Toolbar.SettingsButton";
import ToolbarTax from "./Toolbar.Tax";

const Toolbar = (props) => {
  return (
    <div className="mt-1">
      <SettingsButton /> <ToolbarExportButton /> <ToolbarImportButton />{" "}
      <ToolbarTax
        stakeKeys={props.stakeKeys}
        firstRewardEpoch={313}
        lastRewardEpoch={385}
        firstRewardEpochTimestamp="2022/12/31 21:44:55 UTC"
        lastRewardEpochTimestamp="2022/01/05 21:45:31 UTC"
        year="2022"
      />{" "}
      <ToolbarTax
        stakeKeys={props.stakeKeys}
        firstRewardEpoch={386}
        lastRewardEpoch={456}
        firstRewardEpochTimestamp="2023/01/05"
        lastRewardEpochTimestamp="2023/12/31"
        year="2023"
      />{" "}
      <ToolbarTax
        stakeKeys={props.stakeKeys}
        firstRewardEpoch={459}
        lastRewardEpoch={531}
        firstRewardEpochTimestamp="2024/01/05"
        lastRewardEpochTimestamp="2024/12/30"
        year="2024"
      />
    </div>
  );
};

export default Toolbar;
