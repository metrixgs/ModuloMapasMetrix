import { useMapStore } from "@/stores/useMapStore";
import { useDrawStore } from "@/stores/useDrawStore";

const CreateCircle = () => {
  const map = useMapStore.getState().map;

  const {
    shape: oldShape,
    mode: oldMode,
    changeShape,
    changeMode,
  } = useDrawStore.getState();

  const shape = "Circle";

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
    });
  }
};

export default CreateCircle;
