import ToolbarExportButton from "./Toolbar.ExportButton";
import ToolbarImportButton from "./Toolbar.ImportButton";
import SettingsButton from "./Toolbar.SettingsButton";

const Toolbar = () => {
  return (
    <div className="mt-1">
      <SettingsButton /> <ToolbarExportButton /> <ToolbarImportButton />
    </div>
  );
};

export default Toolbar;
