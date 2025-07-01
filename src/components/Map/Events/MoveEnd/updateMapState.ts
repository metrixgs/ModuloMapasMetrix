import { useMapStateStore } from "@/stores/useMapStateStore";
import { useMapStore } from "@/stores/useMapStore";

export const updateMapState = () => {
  const { map } = useMapStore.getState();
  const { setMapState } = useMapStateStore.getState();

  const center = map?.getCenter();
  const zoom = map?.getZoom();

  if (center && zoom) {
    setMapState(
      zoom,
      center.lat,
      center.lng
    )
  }
}