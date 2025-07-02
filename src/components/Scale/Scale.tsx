import { useTranslation } from "react-i18next";
import { useMapStateStore } from "@/stores/useMapStateStore";

import { useEffect, useState } from "react";
import { getScaleFactor } from "@/utils/geometryUtils";

const Scale = () => {
  const { t } = useTranslation("global");

  const { zoom } = useMapStateStore((state) => state);

  const [scaleFactor, setScaleFactor] = useState(0);

  useEffect(() => {
    const result = getScaleFactor();

    if (result) {
      setScaleFactor(result);
    }
  }, [zoom]);

  return (
    <p className="text-xs dark:text-white">
      <span className="font-bold">{t("body.footer.scale.title")}:</span> 1 :{" "}
      {Math.round(scaleFactor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    </p>
  );
};

export default Scale;
