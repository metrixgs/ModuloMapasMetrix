import { BiShareAlt } from "react-icons/bi";

import { MapControl } from "@components/Map/Controls/MapControl";

const Share = () => {
  return (
    <MapControl>
      <BiShareAlt className="h-4 w-4" />
    </MapControl>
  )
}

export default Share;