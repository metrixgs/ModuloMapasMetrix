import { FaLocationArrow } from "react-icons/fa6";

import { MapControl } from "@components/Map/Controls/MapControl";

const Location = () => {
  return (
    <MapControl>
      <FaLocationArrow className="h-4 w-4" />
    </MapControl>
  )
}

export default Location;