import { BsFiletypeJson } from "react-icons/bs";

import BddItemSource from "../BddItemSource";
import LoadGeoJSONFile from "../../Map/Tools/LoadGeoJSON/LoadGeoJSONFile";

import { useModalStore } from "@/stores/useModalStore";

const UploadGeoJSON = () => {
  const { open, close, setChildren, setTitle, setSize } = useModalStore(
    (store) => store
  );

  const handleAction = () => {
    close();
    setChildren(<LoadGeoJSONFile onExecuteEnd={() => close()} />);
    setTitle("Cargar GeoJSON");
    setSize("lg");
    open();
  };

  return (
    <BddItemSource
      action={handleAction}
      banner={<BsFiletypeJson className="h-14 w-14" />}
      name="Cargar GeoJSON"
      description="Cargar un archivo GeoJSON."
    />
  );
};

export default UploadGeoJSON;
