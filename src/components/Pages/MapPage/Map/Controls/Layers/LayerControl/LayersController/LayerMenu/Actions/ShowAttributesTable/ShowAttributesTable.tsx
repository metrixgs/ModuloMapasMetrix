import { BiTable } from "react-icons/bi";

import { bbox } from "@turf/turf";
import { latLng, latLngBounds } from "leaflet";

import type { Row } from "@tanstack/react-table";
import type { LayerMenuItemActionProps } from "@/types/LayerMenu";

import MenuItem from "@components/UI/Menu/MenuItem";

import AttributesTable from "@components/Pages/MapPage/AttributesTable/AttributesTable";

import { useSidebarLeftStore } from "@/stores/useSidebarLeftStore";
import { useBottomDrawerStore } from "@/stores/useBottomDrawerStore";
import { useMapStore } from "@/stores/useMapStore";

import { extractGeoJSONProperties } from "@/utils/geometryUtils";

const ShowAttributesLayer = ({
  targetLayer,
  translation,
}: LayerMenuItemActionProps) => {
  const tref = "body.controls.layers.tabs.layers.layer-menu";

  const { close: closeSidebarLeft } = useSidebarLeftStore((state) => state);

  const { setChildren, open, setTitle, disableHeader } = useBottomDrawerStore(
    (state) => state
  );

  const { map } = useMapStore((state) => state);

  const handleAttributesTable = () => {
    if (
      targetLayer &&
      targetLayer.format === "geojson" &&
      targetLayer.columns &&
      targetLayer.layer
    ) {
      const layerGeoJSON = targetLayer.layer.toGeoJSON();

      if (layerGeoJSON.type === "FeatureCollection") {
        const data = extractGeoJSONProperties(layerGeoJSON);

        const onSelectedRow = async (row: Row<(typeof data)[0]>) => {
          const feature = layerGeoJSON.features.find(
            (feature) => feature.properties === row.original
          );
          if (feature && map) {
            const bounds = bbox(feature);
            const min = latLng(bounds[1], bounds[0]);
            const max = latLng(bounds[3], bounds[2]);
            map.flyToBounds(latLngBounds(min, max), {
              paddingBottomRight: [0, 4 * 72], // Attributes table max height (h-72)
            });
          }
          return;
        };

        closeSidebarLeft();
        setTitle(targetLayer.name);
        disableHeader();
        setChildren(
          <AttributesTable
            data={data}
            columns={targetLayer.columns}
            onSelectedRow={onSelectedRow}
          />
        );
        open();
      }
    }
  };

  return (
    <MenuItem onClick={handleAttributesTable}>
      <BiTable className="w-5 h-5 mr-2" />
      <span>{translation(tref + ".attributes-table")}</span>
    </MenuItem>
  );
};

export default ShowAttributesLayer;
