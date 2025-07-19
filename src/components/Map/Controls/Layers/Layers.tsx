import type { GeoJSON } from "leaflet";

import { useTranslation } from "react-i18next";

import { Label, ToggleSwitch, Checkbox } from "flowbite-react";

import { BiLayer } from "react-icons/bi";

import classNames from "classnames";

import { Accordion } from "@components/UI/Accordion/Accordion";
import { AccordionItem } from "@components/UI/Accordion/AccordionItem";

import { MapControl } from "@components/Map/Controls/MapControl";
import AttributesTableButton from "@components/AttributesTable/AttributesTableButton";

import { useSidebarLeftStore } from "@/stores/useSidebarLeftStore";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

const SidebarContent = () => {
  const { t } = useTranslation("global");
  const { groups, layerList, layerInfo, toggleLayer, toggleGroup } =
    useMapLayersStore((state) => state);

  return (
    <Accordion>
      {Object.keys(groups).map((groupId, index) => {
        const { active: activeGroup, layers, name } = groups[groupId];

        return (
          <AccordionItem
            key={index}
            title={
              <div className="w-full flex justify-between pr-2">
                <span>{name}</span>
                <ToggleSwitch
                  checked={activeGroup}
                  onChange={() => {
                    toggleGroup(groupId);
                  }}
                />
              </div>
            }
          >
            <div
              className={classNames("flex flex-col gap-2", {
                "opacity-50 pointer-events-none cursor-not-allowed":
                  !activeGroup,
              })}
            >
              {!layers || layers.length === 0 ? (
                <span className="text-center text-sm text-gray-500 dark:text-gray-200">
                  <i>{t("body.controls.layers.group-empty")}</i>
                </span>
              ) : (
                layers.map((layerId, index) => {
                  const { id, name, active, geometry } = layerInfo[layerId];
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <Checkbox
                        id={`layer-${id}`}
                        className="h-5 w-5"
                        disabled={!activeGroup}
                        checked={active}
                        onChange={() => {
                          toggleLayer(id);
                        }}
                      />
                      <Label htmlFor={`layer-${id}`}>{name}</Label>
                      <div className="grow flex justify-end">
                        {geometry === "geojson" && (
                          <AttributesTableButton
                            layer={layerList[id] as GeoJSON}
                          />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

const Layers = () => {
  const { t } = useTranslation("global");

  const { open, setTitle, setIcon, setChildren } = useSidebarLeftStore(
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
