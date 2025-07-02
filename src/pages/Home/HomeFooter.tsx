import Scale from "@components/Scale/Scale";
import Coordinates from "@components/Coordinates/Coordinates";
import ZoomLevel from "@components/ZoomLevel/ZoomLevel";
import VisibleIncidents from "@components/VisibleIncidents/VisibleIncidents";

const HomeFooter = () => {
  return (
    <footer className="h-8 px-2 z-[800] flex gap-28 items-center bg-white dark:bg-metrixblack-800">
      <Scale />
      <Coordinates />
      <ZoomLevel />
      <VisibleIncidents />
    </footer>
  )
}

export default HomeFooter;