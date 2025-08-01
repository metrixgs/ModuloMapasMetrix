import { useState } from "react";

import type { LayerMenuItemActionProps } from "@/types/LayerMenu";

import { HelperText } from "flowbite-react";
import { BiFilter } from "react-icons/bi";

import MenuItem from "@components/UI/Menu/MenuItem";

const FilterByColumns = ({
  targetLayer,
  translation,
  auxModalState,
  setAuxModalState,
}: LayerMenuItemActionProps) => {
  const handleFilter = () => {
    if (!auxModalState || !setAuxModalState) return;

    if (
      !(targetLayer.format === "geojson") ||
      !(targetLayer.layer) ||
      !(targetLayer.columns)
    ) return;

    const AuxModalContent = () => {
      const [selected, setSelected] = useState({});

      return (
        <div className="flex flex-col gap-2">
          <HelperText>
            {translation(
              "body.controls.layers.layer-menu.filter-by-columns.help"
            )}
          </HelperText>
          <button
            onClick={() => console.log(selected)}
          >
            log
          </button>
        </div>
      );
    };

    setAuxModalState({
      active: true,
      content: <AuxModalContent />,
    });
  };

  return (
    <MenuItem onClick={handleFilter}>
      <BiFilter className="w-5 h-5 mr-2" />
      <span>
        {translation(
          "body.controls.layers.layer-menu.filter-by-columns.button-title"
        )}
      </span>
    </MenuItem>
  );
};

export default FilterByColumns;
