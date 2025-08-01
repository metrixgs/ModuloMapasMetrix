import { BiDownload } from "react-icons/bi";

import type { LayerMenuItemActionProps } from "@/types/LayerMenu";

import MenuItem from "@components/UI/Menu/MenuItem";

import { downloadGeoJSON } from "@/utils/downloadUtils";

const DownloadGeoJSON = ({
  targetLayer,
  translation,
}: LayerMenuItemActionProps) => {

  const handleDownloadGeoJSON = () => {
    if (targetLayer && targetLayer.layer && targetLayer.format === "geojson") {
      const geojson = targetLayer.layer.toGeoJSON();
      downloadGeoJSON(geojson, `${targetLayer.name}.geojson`);
    }
  };

  return (
    <MenuItem onClick={handleDownloadGeoJSON}>
      <BiDownload className="w-5 h-5 mr-2" />
      <span>
        {translation("body.controls.layers.layer-menu.download-geojson")}
      </span>
    </MenuItem>
  );
};

export default DownloadGeoJSON;
