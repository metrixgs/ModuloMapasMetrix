import type { Dispatch, JSX, SetStateAction } from "react";

import type { LayerItem } from "./Stores/LayersManager";
import type { TFunction } from "i18next";

export interface LayerMenuAuxModalState {
  active: boolean;
  content: JSX.Element;
}

export interface LayerMenuItemActionProps {
  auxModalState?: LayerMenuAuxModalState;
  setAuxModalState?: Dispatch<SetStateAction<LayerMenuAuxModalState>>;
  targetLayer: LayerItem;
  translation: TFunction;
}
