import { useMapStateStore } from "@/stores/useMapStateStore";
import { useTranslation } from "react-i18next";

const ZoomLevel = () => {
  const { t } = useTranslation("global");

  const { zoom } = useMapStateStore((state) => state);

  return (
    <p className="text-xs dark:text-white">
      <span className="font-bold">{t("body.footer.zoom.title")}</span> {zoom}
    </p>
  );
};

export default ZoomLevel;
