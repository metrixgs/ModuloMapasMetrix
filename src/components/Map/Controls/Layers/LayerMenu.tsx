import { useTranslation } from "react-i18next";

import { BiTable, BiTrash, BiDownload } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TbFocusCentered } from "react-icons/tb";

import type { GeoJSON } from "leaflet";
import type { FeatureCollection, Geometry } from "geojson";
import type { LayerItem } from "@/types/Stores/LayersManager";

import { useMapLayersStore } from "@/stores/useMapLayersStore";
import { useMapStore } from "@/stores/useMapStore";
import { useSidebarLeftStore } from "@/stores/useSidebarLeftStore";
import { useBottomDrawerStore } from "@/stores/useBottomDrawerStore";

import Menu from "@components/UI/Menu/Menu";
import MenuItem from "@components/UI/Menu/MenuItem";

import AttributesTable from "@components/AttributesTable/AttributesTable";

import { downloadGeoJSON, extractGeoJSONProperties } from "@/utils/geometryUtils";

interface LayerMenuProps {
  layer: LayerItem;
}

const LayerMenu = ({ layer }: LayerMenuProps) => {
  const { t } = useTranslation("global");

  const { toggleLayer, removeLayer } = useMapLayersStore((state) => state);

  const { map } = useMapStore((state) => state);

  const { close: closeSidebarLeft } = useSidebarLeftStore((state) => state);

  const { setChildren, open, setTitle, disableHeader } = useBottomDrawerStore((state) => state);

  const { id, active, format, name, temp, layer: layerClass } = layer;

  const handleAttributesTable = () => {
    if (layer.format === "geojson" && layer.columns) {

      const layerGeoJSON = (layerClass as GeoJSON).toGeoJSON();
      const data = extractGeoJSONProperties(layerGeoJSON as FeatureCollection<Geometry, typeof layer>);

      closeSidebarLeft();
      setTitle(name);
      disableHeader();
      setChildren(<AttributesTable data={data} columns={layer.columns} />)
      open();
    }
  };

  const handleDownloadGeoJSON = () => {
    if (layerClass) {
      const geojson = (layerClass as GeoJSON).toGeoJSON();
      downloadGeoJSON(geojson, `${id}.geojson`);
    }
  };

  const handleFocus = () => {
    if (layerClass && map) {
      const bounds = (layerClass as GeoJSON).getBounds();
      map.flyToBounds(bounds);
    }
  };

  return (
    <Menu>
      <span className="text-sm pb-2 px-2 text-center font-bold">
        <i>{name}</i>
      </span>
      {format === "geojson" && (
        <>
          {
            layer.columns
            &&
            <MenuItem onClick={handleAttributesTable}>
              <BiTable className="w-5 h-5 mr-2" />
              <span>{t("body.controls.layers.layer-menu.attributes-table")}</span>
            </MenuItem>
          }
          <MenuItem onClick={handleDownloadGeoJSON}>
            <BiDownload className="w-5 h-5 mr-2" />
            <span>{t("body.controls.layers.layer-menu.download-geojson")}</span>
          </MenuItem>
          <MenuItem onClick={handleFocus}>
            <TbFocusCentered className="w-5 h-5 mr-2" />
            <span>{t("body.controls.layers.layer-menu.focus")}</span>
          </MenuItem>
        </>
      )}
      <MenuItem onClick={() => toggleLayer(id)}>
        {active ? (
          <>
            <FaRegEyeSlash className="w-5 h-5 mr-2" />
            <span>{t("body.controls.layers.layer-menu.hide")}</span>
          </>
        ) : (
          <>
            <FaRegEye className="w-5 h-5 mr-2" />
            <span>{t("body.controls.layers.layer-menu.show")}</span>
          </>
        )}
      </MenuItem>
      {temp && (
        <MenuItem onClick={() => removeLayer(id)}>
          <BiTrash className="w-5 h-5 mr-2" />
          <span>{t("body.controls.layers.layer-menu.delete")}</span>
        </MenuItem>
      )}
    </Menu>
  );
};

export default LayerMenu;
