
import Header from "@components/Header/Header";
import MapPageMain from "./MapPageMain";
import MapPageFooter from "./MapPageFooter";

const MapPage = () => {

  return (
    <div className="w-full min-h-[100dvh] flex flex-col">
      <Header />
      <MapPageMain />
      <MapPageFooter />
    </div>
  )
}

export default MapPage;