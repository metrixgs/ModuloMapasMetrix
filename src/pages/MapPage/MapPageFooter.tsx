import Scale from "@components/Pages/MapPage/Scale/Scale";
import Coordinates from "@components/Pages/MapPage/Coordinates/Coordinates";
import ZoomLevel from "@components/Pages/MapPage/ZoomLevel/ZoomLevel";
import VisibleIncidents from "@components/Pages/MapPage/VisibleIncidents/VisibleIncidents";

const MapPageFooter = () => {
  return (
    <footer className="h-8 px-2 z-[800] flex gap-8 items-center bg-white dark:bg-metrixblack-800">
      <Scale />
      <Coordinates />
      <ZoomLevel />
      <VisibleIncidents />
    </footer>
  )
}

export default MapPageFooter;