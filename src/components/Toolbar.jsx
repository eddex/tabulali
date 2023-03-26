import ToolbarExportButton from "./Toolbar.ExportButton";
import ToolbarImportButton from "./Toolbar.ImportButton";
import SettingsButton from "./Toolbar.SettingsButton";
import ToolbarTax2022 from "./Toolbar.Tax2022";

const Toolbar = (props) => {
  return (
    <div className="mt-1">
      <SettingsButton /> <ToolbarExportButton /> <ToolbarImportButton />{" "}
      <ToolbarTax2022 stakeKeys={props.stakeKeys} />
    </div>
  );
};

export default Toolbar;
