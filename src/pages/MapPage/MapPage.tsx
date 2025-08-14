
import Header from "@components/Header/Header";
import MapPageMain from "./MapPageMain";
import MapPageFooter from "./MapPageFooter";

import SearchAddress from "@components/Pages/MapPage/SearchAddress/SearchAddres";

const MapPage = () => {

  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <SearchAddress />
      <Header />
      <MapPageMain />
      <MapPageFooter />
    </div>
  )
}

export default MapPage;