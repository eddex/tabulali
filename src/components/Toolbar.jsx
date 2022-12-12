import ToolbarExportButton from "./Toolbar.ExportButton";
import ToolbarImportButton from "./Toolbar.ImportButton";

const Toolbar = () => {
  return (
    <div className="mt-1">
      <ToolbarExportButton /> <ToolbarImportButton />
    </div>
  );
};

export default Toolbar;
