import { useState } from "react";

import { FaLocationArrow } from "react-icons/fa6";

import { MapControl } from "@components/Map/Controls/MapControl";
import { useMapStore } from "@/stores/useMapStore";
import { useUserLocationStore } from "@/stores/useUserLocationStore";
import classNames from "classnames";

const Location = () => {
  const { map } = useMapStore((state) => state);
  const { loading, startSearch, endSearch } = useUserLocationStore((state) => state);
  const [watch, setWatch] = useState(false);

  const handleClick = () => {
    if (watch) {
      map?.stopLocate();
      setWatch(false);
      endSearch();
    } else {
      map?.locate({
        watch: true,
        enableHighAccuracy: true,
      });
      setWatch(true);
      startSearch();
    }
  }
  return (
    <MapControl onClick={handleClick} active={watch}>
      <FaLocationArrow className={classNames(
        "h-4 w-4",
        {
          "animate-pulse": loading
        }
      )} />
    </MapControl>
  )
}

export default Location;