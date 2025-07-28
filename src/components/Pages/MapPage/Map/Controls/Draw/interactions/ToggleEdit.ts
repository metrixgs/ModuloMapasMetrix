import { useMapStore } from "@/stores/useMapStore";

const ToggleEdit = () => {
  const map = useMapStore.getState().map;

  if (map) {
    map.pm.toggleGlobalEditMode();
  }
};

export default ToggleEdit;
