import Osm from "./Basemaps/Osm/Osm";
import Jawg from "./Basemaps/Jawg/Jawg";
import Incidents from "./Incidents/Incidents";
import CartoDBpositron from "./Basemaps/CartoDBpositron/CartoDBpositron";

const MapLayers = () => {
  return (
    <>
      <Jawg />
      <Osm />
      <CartoDBpositron />
      <Incidents />
    </>
  )
}

export default MapLayers;