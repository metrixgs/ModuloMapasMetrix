import type { GeoJSON } from "leaflet";

import { BiTable } from "react-icons/bi";

import Button from "@components/UI/Button";

interface AttributesTableButtonProps {
  layer: GeoJSON;
}


const AttributesTableButton = ({ layer }: AttributesTableButtonProps) => {
  const handleClick = () => {
    console.log(layer.toGeoJSON())
  }

  return (
    <Button
      onClick={handleClick}
      className="h-8 w-8 flex justify-center"
    >
      <BiTable />
    </Button>
  )
}

export default AttributesTableButton;