import type { LayerGroupItem, LayerItem } from "@/types/Stores/LayersManager";

import { useEffect, useState } from "react";

import { BiCloudUpload } from "react-icons/bi";

import Tabs from "@components/UI/Tabs/Tabs";
import TabItem from "@components/UI/Tabs/TabItem";
import { iconsMap, MultiIcon } from "@components/MultiIcon/MultiIcon";

import BddItemLayer from "./BddItemLayer";
// import BddItemSource from "./BddItemSource";

import { LayersAPI, GroupsAPI } from "@/config.map.layers";

const BddContent = () => {
  const [layers, setLayers] = useState<LayerItem[]>();
  const [groups, setGroups] = useState<LayerGroupItem[]>();

  useEffect(() => {
    const getLayers = async () => {
      const layers = await LayersAPI();
      setLayers(layers);
    };

    const getGroups = async () => {
      const groups = await GroupsAPI();
      setGroups(groups);
    };

    getLayers();
    getGroups();
  }, []);

  return (
    <div className="py-1">
      <Tabs>
        <TabItem
          title="Cargar un documento"
          icon={<BiCloudUpload className="h-5 w-5" />}
        >
          <div className="p-2 flex flex-wrap"></div>
        </TabItem>
        Capas
        {groups && layers &&
          groups.map((g, gi) => {

            const layersForGroup = layers.filter((l) => l.groupId === g.id);
            
            return (
              <TabItem
                key={gi}
                title={g.name}
                icon={
                  g.icon && 
                  <MultiIcon
                    className="h-5 w-5"
                    lib={g.icon.split("/")[0] as keyof typeof iconsMap}
                    name={g.icon.split("/")[1]}
                  />
                }
              >
                <div className="p-2 grid grid-cols-3 gap-6">
                  {
                    layersForGroup.map((l, li) => (
                      <BddItemLayer
                        key={li}
                        name={l.name}
                        layerItem={l}
                        groupItem={g}
                      />
                    ))
                  }
                </div>
              </TabItem>
            );
          })}
          {/* <TabItem title="Espacio personal">
            Hola
          </TabItem> */}
      </Tabs>
    </div>
  );
};

export default BddContent;
