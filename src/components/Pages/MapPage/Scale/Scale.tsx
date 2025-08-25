import { useTranslation } from "react-i18next";
import { useMapStateStore } from "@/stores/useMapStateStore";

import { useEffect, useState } from "react";
import { getScaleFactor } from "@/utils/geometryUtils";
import { formatNumber } from "@/utils/numberUtils";

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
    <div className="min-w-32">
      <p className="text-xs dark:text-white">
        <span className="font-bold">{t("body.footer.scale.title")}:</span> 1 :{" "}
        {formatNumber(scaleFactor, {
          maximumFractionDigits: 0,
        })}
      </p>
    </div>
  );
};

export default Scale;
