import type { LayerGroupItem, LayerItem } from "@/types/Stores/LayersManager";

import LoadTileLayer from "../LoadFunctions/LoadTileLayer";
import LoadGeoserverGeoJSON from "../LoadFunctions/LoadGeoserverGeoJSON";
import LoadAPI from "../LoadFunctions/LoadAPI";
import LoadGeoJSON from "../LoadFunctions/LoadGeoJSON";
import LoadGeoJSONGrid from "../LoadFunctions/LoadGeoJSONGrid";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

interface AddLayerInputs {
  layer: LayerItem;
  group: LayerGroupItem;
}

interface AddLayerResponse {
  status: boolean;
  message: string;
}

const AddLayer = async ({
  layer,
  group,
}: AddLayerInputs): Promise<AddLayerResponse> => {
  const { append, createGroup, assignLayerToGroup } =
    useMapLayersStore.getState();
  let load;
  let newLayerItem;

  const { id: layerId, format: layerFormat, source: layerSource } = layer;

  try {
    if (layerSource.sourceType === "tile") {
      if (layerFormat === "tile") {
        const { load: load_, newLayerItem: newLayerItem_ } =
          await LoadTileLayer(layer);

        load = load_;
        newLayerItem = newLayerItem_;
      } else {
        return {
          status: false,
          message:
            "El origen de la capa es tile pero el tipo de capa es diferente.",
        };
      }
    } else if (layerSource.sourceType === "geoserver") {
      if (layerFormat === "geojson") {
        const { load: load_, newLayerItem: newLayerItem_ } =
          await LoadGeoserverGeoJSON(layer);
        load = load_;
        newLayerItem = newLayerItem_;
      } else {
        return {
          status: false,
          message:
            "El origen de la capa es geoserver pero el tipo de capa no es geojson.",
        };
      }
    } else if (layerSource.sourceType === "api") {
      if (layerFormat === "geojson") {
        const { load: load_, newLayerItem: newLayerItem_ } = await LoadAPI(
          layer
        );
        load = load_;
        newLayerItem = newLayerItem_;
      } else {
        return {
          status: false,
          message:
            "El origen de la capa es API pero el tipo de capa no es geojson.",
        };
      }
    } else if (layerSource.sourceType === "generated") {
      if (layerFormat === "geojson") {
        const { load: load_, newLayerItem: newLayerItem_ } = await LoadGeoJSON(
          layer
        );
        load = load_;
        newLayerItem = newLayerItem_;
      } else if (layerFormat === "geojson-grid") {
        const { load: load_, newLayerItem: newLayerItem_ } =
          await LoadGeoJSONGrid(layer);
        load = load_;
        newLayerItem = newLayerItem_;
      } else {
        return {
          status: false,
          message:
            "No se encuentra contemplado sourceType generated y layerFormat tile.",
        };
      }
    } else {
      return {
        status: false,
        message: "El origen de la capa no está soportado.",
      };
    }

    if (load && newLayerItem) {
      const loaded = await append(newLayerItem, load);
      if (loaded) {
        await createGroup(group);
        assignLayerToGroup(layerId, group.id);
        // if (newLayerItem.format === "geojson") {
        //   focusLayer(layerId);
        // }
        return {
          status: true,
          message: "La capa se cargó correctamente.",
        };
      } else {
        return {
          status: false,
          message: "La capa no pusdo ser cargada.",
        };
      }
    } else {
      return {
        status: false,
        message: "La capa no pusdo ser cargada.",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Ha ocurrido un error inesperado.",
    };
  }
};

export default AddLayer;
