import { useTranslation } from "react-i18next";

import { BsFiletypeJson } from "react-icons/bs";

import BddItemSource from "../BddItemSource";
import LoadGeoJSONFile from "../../../Tools/LoadGeoJSON/LoadGeoJSONFile";

import { useModalStore } from "@/stores/useModalStore";

const UploadGeoJSON = () => {
  const { t } = useTranslation("global");
  const tref = "body.bdd.sources.geojson";

  const { open, close, setChildren, setTitle, setSize } = useModalStore(
    (store) => store
  );

  const handleAction = () => {
    close();
    setChildren(<LoadGeoJSONFile onExecuteEnd={() => close()} />);
    setTitle(t(tref + ".title"));
    setSize("lg");
    open();
  };

  return (
    <BddItemSource
      action={handleAction}
      banner={<BsFiletypeJson className="h-14 w-14" />}
      name={t(tref + ".title")}
      description={t(tref + ".description")}
    />
  );
};

export default UploadGeoJSON;
