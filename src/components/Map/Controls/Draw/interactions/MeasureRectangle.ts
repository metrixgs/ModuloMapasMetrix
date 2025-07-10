import { useMapStore } from "@/stores/useMapStore";
import { useDrawStore } from "@/stores/useDrawStore";

const MeasureRectangle = () => {
  const map = useMapStore.getState().map;

  const {
    shape: oldShape,
    mode: oldMode,
    changeShape,
    changeMode,
  } = useDrawStore.getState();

  const shape = "Rectangle";

  if (!oldShape) {
    changeShape(shape);
  }

  if (!oldMode) {
    changeMode("measure");
  }

  if (oldShape !== shape) {
    changeShape(shape);
  }

  if (oldMode !== "measure") {
    changeMode("measure");
  }

  if (map) {
    map.pm.enableDraw(shape, {
      snappable: true,
      snapDistance: 20,
    });
  }
};

export default MeasureRectangle;