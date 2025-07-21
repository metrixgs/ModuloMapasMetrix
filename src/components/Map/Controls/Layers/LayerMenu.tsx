import { useTranslation } from "react-i18next";

import { BiTable, BiTrash, BiDownload } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import type { LayerItem } from "@/types/Stores/LayersManager";
import Menu from "@components/UI/Menu/Menu";
import MenuItem from "@components/UI/Menu/MenuItem";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

interface LayerMenuProps {
  layer: LayerItem
}

const LayerMenu = ({ layer }: LayerMenuProps) => {
  const { t } = useTranslation("global");
  const { toggleLayer, removeLayer } = useMapLayersStore((state) => state);

  const { id, active, format, name, temp } = layer;
  return (
    <Menu>
      <span
        className="text-sm pb-2 px-2 text-gray-700 dark:text-gray-200 text-center font-bold"
      >
        <i>{ name }</i>
      </span>
      {
        format === "geojson" && (
          <>
            <MenuItem>
              <BiTable className="w-5 h-5 mr-2" />
              <span>
                { t("body.controls.layers.layer-menu.attributes-table") }
              </span>
            </MenuItem>
            <MenuItem>
              <BiDownload className="w-5 h-5 mr-2" />
              <span>
                { t("body.controls.layers.layer-menu.download-geojson") }
              </span>
            </MenuItem>
          </>
        )
      }
      <MenuItem onClick={() => toggleLayer(id)}>
        {
          active ? (
            <>
              <FaRegEyeSlash className="w-5 h-5 mr-2" />
              <span>
                { t("body.controls.layers.layer-menu.hide") }
              </span>
            </>
          ) : (
            <>
              <FaRegEye className="w-5 h-5 mr-2" />
              <span>
                { t("body.controls.layers.layer-menu.show") }
              </span>
            </>
          )
        }
      </MenuItem>
      {
        temp && (
          <MenuItem onClick={() => removeLayer(id)}>
            <BiTrash className="w-5 h-5 mr-2" />
            <span>
              { t("body.controls.layers.layer-menu.delete") }
            </span>
          </MenuItem>
        )
      }
    </Menu>
  )
}

export default LayerMenu;