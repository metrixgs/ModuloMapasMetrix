import type { Popup } from "leaflet"
import type { Root } from "react-dom/client"

export interface CustomPopupProps {
  data: Record<string, any> | null;
  popup: Popup;
  root: Root;
}