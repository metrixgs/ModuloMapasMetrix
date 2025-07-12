import { useMapStore } from "@/stores/useMapStore";
import { useDrawStore } from "@/stores/useDrawStore";

const CreatePolygon = () => {
  const map = useMapStore.getState().map;

  const {
    shape: oldShape,
    mode: oldMode,
    changeShape,
    changeMode,
  } = useDrawStore.getState();

  const shape = "Polygon";

  if (!oldShape) {
    changeShape(shape);
  }

  if (!oldMode) {
    changeMode("create");
  }

  if (oldShape !== shape) {
    changeShape(shape);
  }

  if (oldMode !== "create") {
    changeMode("create");
  }

  if (map) {
    map.pm.enableDraw(shape, {
      snappable: true,
      snapDistance: 20,
      templineStyle: {
        radius: 10,
        fillColor: "#267E26",
        color: "#267E26"
      },
      hintlineStyle: {
        color: "#267E26",
        dashArray: [5, 5]
      },
      pathOptions: {
        fillColor: "#267E26",
        color: "#267E26"
      }
    });
  }
};

export default CreatePolygon;
