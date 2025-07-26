import Osm from "./Basemaps/Osm/Osm";
import Jawg from "./Basemaps/Jawg/Jawg";
import Incidents from "./Incidents/Incidents";
import CartoDBpositron from "./Basemaps/CartoDBpositron/CartoDBpositron";

import Acueducto from "./Acueducto/Acueducto";
import Acuiferos from "./Acuiferos/Acuiferos";
import ANP from "./ANP/ANP";
import CuerposAgua from "./CuerposAgua/CuerposAgua";
import EspaciosPublicos from "./EspaciosPublicos/EspaciosPublicos";
import ParquesIndustria from "./ParquesIndustria/ParquesIndustria";
import PlantasTratamiento from "./PlantasTratamiento/PlantasTratamiento";
import ZonaNorte from "./ZonaNorte/ZonaNorte";
import ZonaOriente from "./ZonaOriente/ZonaOriente";
import ZonaSur from "./ZonaSur/ZonaSur";
import ZonaPatrimonialA from "./ZonaPatrimonialA/ZonaPatrimonialA";
import ZonaPatrimonialB from "./ZonaPatrimonialB/ZonaPatrimonialB";
import ZonaPatrimonialB3 from "./ZonaPatrimonialB3/ZonaPatrimonialB3";
import ZonaPoniente from "./ZonaPoniente/ZonaPoniente";

const MapLayers = () => {
  return (
    <>
      <Jawg />
      <Osm />
      <CartoDBpositron />
      <Incidents />

      <Acueducto />
      <Acuiferos />
      <ANP />
      <CuerposAgua />
      <EspaciosPublicos />
      <ParquesIndustria />
      <PlantasTratamiento />
      <ZonaNorte />
      <ZonaOriente />
      <ZonaSur />
      <ZonaPatrimonialA />
      <ZonaPatrimonialB />
      <ZonaPatrimonialB3 />
      <ZonaPoniente />
    </>
  )
}

export default MapLayers;