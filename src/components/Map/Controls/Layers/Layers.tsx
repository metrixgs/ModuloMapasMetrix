import { Label, ToggleSwitch, Checkbox } from "flowbite-react";

import { BiLayer } from "react-icons/bi";

import { useTranslation } from "react-i18next";

import { Accordion } from "@components/UI/Accordion/Accordion";
import { AccordionItem } from "@components/UI/Accordion/AccordionItem";
import { MapControl } from "@components/Map/Controls/MapControl";

import { useSidebarStore } from "@/stores/useSidebarStore";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

const SidebarContent = () => {
  const { groups, layerInfo, toggleLayer } = useMapLayersStore(
    (state) => state
  );

  return (
    <Accordion>
      {Object.keys(groups).map((groupId, index) => {
        const { id, active, layers, name } = groups[groupId];

        return (
          <AccordionItem
            key={index}
            title={
              <div className="w-full flex justify-between gap-4">
                <span>{name}</span>
                <ToggleSwitch checked={active} />
              </div>
            }
          >
            <div className="flex flex-col gap-2">
              {layers.map((layerId, index) => {
                const { id, name, active } = layerInfo[layerId];
                return (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`layer-${id}`}
                      key={index}
                      checked={active}
                      onChange={() => {
                        toggleLayer(id);
                      }}
                    />
                    <Label htmlFor={`layer-${id}`}>{name}</Label>
                  </div>
                );
              })}
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

const Layers = () => {
  const { t } = useTranslation("global");

  const { open, setTitle, setIcon, setChildren } = useSidebarStore(
    (state) => state
  );

  const handleClick = () => {
    setTitle(t("body.controls.layers.sidebar-title"));
    setIcon(<BiLayer className="mr-2" />);
    setChildren(<SidebarContent />);
    open();
  };

  return (
    <MapControl onClick={handleClick}>
      <BiLayer className="h-4 w-4" />
    </MapControl>
  );
};

export default Layers;
