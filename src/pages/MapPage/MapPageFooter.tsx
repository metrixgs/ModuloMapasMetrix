import Scale from "@components/Pages/MapPage/Scale/Scale";
import Coordinates from "@components/Pages/MapPage/Coordinates/Coordinates";
import ZoomLevel from "@components/Pages/MapPage/ZoomLevel/ZoomLevel";
import VisiblePoints from "@components/Pages/MapPage/VisiblePoints/VisiblePoints";

const MapPageFooter = () => {
  return (
    <footer className="h-8 px-2 z-[800] flex gap-8 items-center bg-white dark:bg-metrixblack-800">
      <Scale />
      <Coordinates />
      <ZoomLevel />
      <VisiblePoints />
    </footer>
  )
}

export default MapPageFooter;