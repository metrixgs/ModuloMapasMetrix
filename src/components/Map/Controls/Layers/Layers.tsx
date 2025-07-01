import { ToggleSwitch } from "flowbite-react";

import { BiLayer } from "react-icons/bi";

import { MapControl } from "@components/Map/Controls/MapControl";

import { useSidebarStore } from "@/stores/useSidebarStore";
import { useMapLayersStore } from "@/stores/useMapLayersStore";

const SidebarContent = () => {
  const { layerInfo, toggleLayer } = useMapLayersStore((state) => state);
  return (
    <div className="flex flex-col gap-2">
      {
        Object.keys(layerInfo).map((item, index) => {
          const info = layerInfo[item];
          return (
            <ToggleSwitch key={index} checked={info.active} label={info.name} onChange={() => {
              toggleLayer(info.id);
            }} />
          )
        })
      }
    </div>
  )
}

const Layers = () => {
  const {
    open,
    setTitle,
    setIcon,
    setChildren
  } = useSidebarStore((state) => state);

  const handleClick = () => {
    setTitle("CAPAS");
    setIcon(<BiLayer />);
    setChildren(<SidebarContent />);
    open();
  }

  return (
    <MapControl onClick={handleClick}>
      <BiLayer className="h-4 w-4" />
    </MapControl>
  )
}

export default Layers;