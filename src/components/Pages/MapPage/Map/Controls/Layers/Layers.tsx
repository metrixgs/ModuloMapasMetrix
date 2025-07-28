import { useTranslation } from "react-i18next";

import { Label, ToggleSwitch, Checkbox, Radio, Popover } from "flowbite-react";

import { BiLayer, BiDotsVerticalRounded } from "react-icons/bi";

import classNames from "classnames";

import { Accordion } from "@components/UI/Accordion/Accordion";
import { AccordionItem } from "@components/UI/Accordion/AccordionItem";
import Button from "@components/UI/Button";

import LayerMenu from "./LayerMenu";

import { MapControl } from "@components/Pages/MapPage/Map/Controls/MapControl";

import { useSidebarLeftStore } from "@/stores/useSidebarLeftStore";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

const SidebarContent = () => {
  const { t } = useTranslation("global");
  const {
    groups,
    layers,
    toggleLayer,
    toggleGroup
  } = useMapLayersStore((state) => state);

  return (
    <>
      {/* <Button onClick={() => {console.log(layers)}}>
        log
      </Button> */}
      <Accordion>
        {Object.keys(groups).map((groupId, index) => {
          const {
            active: activeGroup,
            layers: groupLayers,
            name: groupName,
            disabled: groupDisabled,
            type: groupType,
          } = groups[groupId];

          // if (groupLayers.length === 0) return null;

          return (
            <AccordionItem
              key={index}
              title={
                <div className="w-full flex justify-between pr-2">
                  <span>{groupName}</span>
                  <ToggleSwitch
                    sizing="sm"
                    checked={activeGroup}
                    onChange={() => toggleGroup(groupId)}
                    disabled={groupDisabled}
                  />
                </div>
              }
            >
              <div
                className={classNames("flex flex-col gap-2", {
                  "opacity-50 pointer-events-none cursor-not-allowed": !activeGroup,
                })}
              >
                {!groupLayers || groupLayers.length === 0 ? (
                  <span className="text-center text-sm text-gray-500 dark:text-gray-200">
                    <i>{t("body.controls.layers.group-empty")}</i>
                  </span>
                ) : (
                  groupLayers.map((layerId, index) => {
                    if (!layers[layerId]) return null;

                    const { id, active, name } = layers[layerId];

                    return (
                      <div key={index} className="flex items-center gap-2">
                        {
                          {
                            "radio":
                              <Radio
                                id={`layer-${id}`}
                                name={`layer-${id}`}
                                value={id}
                                className="h-5 w-5"
                                disabled={!activeGroup}
                                checked={active}
                                onChange={(e) => toggleLayer(e.target.value)}
                              />,
                            "checkbox":
                              <Checkbox
                                id={`layer-${id}`}
                                className="h-5 w-5"
                                disabled={!activeGroup}
                                checked={active}
                                onChange={() => toggleLayer(id)}
                              />
                          }[groupType]
                        }
                        <Label htmlFor={`layer-${id}`}>{name}</Label>
                        <div className="grow flex justify-end">
                          <Popover
                            arrow={false}
                            content={<LayerMenu layer={layers[layerId]} />}
                          >
                            <Button
                              className="h-8 flex justify-center"
                              title={t("body.controls.layers.layer-menu.button-title")}
                            >
                              <BiDotsVerticalRounded />
                            </Button>
                          </Popover>
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
    </>
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
