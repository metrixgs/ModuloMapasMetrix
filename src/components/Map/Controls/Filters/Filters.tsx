import { BiFilterAlt } from "react-icons/bi";

import { MapControl } from "@components/Map/Controls/MapControl";

const Filters = () => {
  return (
    <MapControl>
      <BiFilterAlt className="w-4 h-4" />
    </MapControl>
  )
}

export default Filters;