import { useMapStore } from "@/stores/useMapStore";
import { useDrawStore } from "@/stores/useDrawStore";

const MeasureLine = () => {
  const map = useMapStore.getState().map;

  const {
    shape: oldShape,
    mode: oldMode,
    changeShape,
    changeMode,
  } = useDrawStore.getState();

  const shape = "Line";

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
      templineStyle: {
        radius: 10,
        fillColor: "#7BC11D",
        color: "#7BC11D"
      },
      hintlineStyle: {
        color: "#7BC11D",
        dashArray: [5, 5]
      },
      pathOptions: {
        color: "#7BC11D",
      }
    });
  }
};

export default MeasureLine;