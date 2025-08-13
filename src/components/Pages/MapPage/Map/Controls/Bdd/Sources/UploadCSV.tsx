import { useTranslation } from "react-i18next";

import { BsFiletypeCsv } from "react-icons/bs";

import BddItemSource from "../BddItemSource";

import LoadCSVFile from "../../../Tools/LoadCSV/LoadCSVFile";

import { useModalStore } from "@/stores/useModalStore";

const UploadCSV = () => {
  const {t} = useTranslation("global");
  const tref = "body.bdd.sources.csv";

  const { open, close, setChildren, setTitle, setSize } = useModalStore(
    (store) => store
  );

  const handleAction = () => {
    close();
    setChildren(<LoadCSVFile onExecuteEnd={() => close()} />);
    setTitle(t(tref + ".title"));
    setSize("lg");
    open();
  };

  return (
    <BddItemSource
      action={handleAction}
      banner={<BsFiletypeCsv className="h-14 w-14" />}
      name={t(tref + ".title")}
      description={t(tref + ".description")}
    />
  );
};

export default UploadCSV;
