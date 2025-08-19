import { useTranslation } from "react-i18next";

import { Label, ToggleSwitch, Checkbox, Radio, Popover } from "flowbite-react";

import classNames from "classnames";

import { BiDotsVerticalRounded } from "react-icons/bi";

import { Accordion } from "@components/UI/Accordion/Accordion";
import { AccordionItem } from "@components/UI/Accordion/AccordionItem";
import Button from "@components/UI/Button";
import LayerMenu from "./LayerMenu/LayerMenu";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

const LayersController = () => {
  const { t } = useTranslation("global");
  const tref = "body.controls.layers.tabs.layers";

  const { groups, layers, toggleLayer, toggleGroup } = useMapLayersStore(
    (state) => state
  );
  return (
    <Accordion>
      {/* <Button onClick={() => {console.log(layers)}}>
              log
            </Button> */}
      {Object.keys(groups).map((groupId, index) => {
        const {
          active: activeGroup,
          layers: groupLayers,
          name: groupName,
          disabled: groupDisabled,
          type: groupType,
        } = groups[groupId];

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
                "opacity-50 pointer-events-none cursor-not-allowed":
                  !activeGroup,
              })}
            >
              {!groupLayers || groupLayers.length === 0 ? (
                <span className="text-center text-sm text-gray-500 dark:text-gray-200">
                  <i>{t(tref + ".group-empty")}</i>
                </span>
              ) : (
                groupLayers.map((layerId, index) => {
                  if (!layers[layerId]) return null;

                  const { id, active, name } = layers[layerId];

                  return (
                    <div key={index} className="flex items-center gap-2">
                      {
                        {
                          radio: (
                            <Radio
                              id={`layer-${id}`}
                              name={`layer-${id}`}
                              value={id}
                              className="h-5 w-5"
                              disabled={!activeGroup}
                              checked={active}
                              onChange={(e) => toggleLayer(e.target.value)}
                            />
                          ),
                          checkbox: (
                            <Checkbox
                              id={`layer-${id}`}
                              className="h-5 w-5"
                              disabled={!activeGroup}
                              checked={active}
                              onChange={() => toggleLayer(id)}
                            />
                          ),
                        }[groupType]
                      }
                      <Label htmlFor={`layer-${id}`}>{name}</Label>
                      <div className="grow flex justify-end">
                        <Popover
                          arrow={false}
                          content={<LayerMenu layer={layers[layerId]} />}
                        >
                          <Button
                            className="h-8 justify-center"
                            title={t(tref + ".layer-menu.button-title")}
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
  );
};

export default LayersController;
