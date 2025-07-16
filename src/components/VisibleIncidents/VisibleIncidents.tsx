import { useTranslation } from "react-i18next";

import { visibleIncidentsId } from "@/config.id";

const VisibleIncidents = () => {
  const { t } = useTranslation("global");
  return (
    <div className="min-w-32">
      <p className="text-xs dark:text-white">
        <span className="font-bold">
          {t("body.footer.visible-incidents.title")}:
        </span>{" "}
        <span id={visibleIncidentsId}></span>
      </p>
    </div>
  );
};

export default VisibleIncidents;
