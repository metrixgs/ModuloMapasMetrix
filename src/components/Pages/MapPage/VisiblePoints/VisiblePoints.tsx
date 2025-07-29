import { useTranslation } from "react-i18next";

import { visiblePointsId } from "@/config.id";

const VisiblePoints = () => {
  const { t } = useTranslation("global");
  return (
    <div className="min-w-32">
      <p className="text-xs dark:text-white">
        <span className="font-bold">
          {t("body.footer.visible-incidents.title")}:
        </span>{" "}
        <span id={visiblePointsId}></span>
      </p>
    </div>
  );
};

export default VisiblePoints;
