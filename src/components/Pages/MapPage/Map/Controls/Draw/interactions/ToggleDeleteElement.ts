import { useDrawStore } from "@/stores/useDrawStore";
import { useMapStore } from "@/stores/useMapStore";

const ToggleDeleteElement = () => {
  const map = useMapStore.getState().map;
  const {
    isRemovalModeActive,
    activeRemovalMode,
    deactiveRemovalMode,
  } = useDrawStore.getState();

  if (map) {

    if (isRemovalModeActive) {
      map.pm.disableGlobalRemovalMode();
      deactiveRemovalMode();
    } else {
      map.pm.enableGlobalRemovalMode();
      activeRemovalMode();
    }
  }
};

export default ToggleDeleteElement;