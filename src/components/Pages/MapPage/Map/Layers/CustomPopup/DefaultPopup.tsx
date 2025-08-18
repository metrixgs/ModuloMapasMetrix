import classNames from "classnames";
import type { Popup } from "leaflet";

import { BiX } from "react-icons/bi";

import Button from "@components/UI/Button";
import { useTranslation } from "react-i18next";

interface CustomPopupProps {
  data: Record<string, any> | null;
  popup: Popup;
}

const DefaultPopup = ({ data, popup }: CustomPopupProps) => {
  const { t } = useTranslation("global");
  const tref = "body.custom-popup";

  const keys = data ? Object.keys(data) : undefined;

  return (
    <div
      className={classNames(
        "w-full min-h-48 p-4",
        "rounded-xl",
        "bg-white dark:bg-metrixblack-800"
      )}
    >
      <div className="flex flex-col gap-4">
        <nav className="w-full flex justify-end">
          <Button
            className="!min-w-6 !w-6 h-6 !p-0 justify-center"
            onClick={() => popup.close()}
            title={t(tref + ".close")}
          >
            <BiX className="h-4 w-4" />
          </Button>
        </nav>
        {data && keys && keys.length > 0 ? (
          <div
            className={classNames(
              "max-h-40 overflow-y-auto",
              "flex flex-col",
              "text-sm",
              "divide-y divide-metrixblack-100 dark:divide-gray-600"
            )}
          >
            {keys.map((key, index) => (
              <div key={index} className="py-2 grid grid-cols-2">
                <span className="font-semibold">{key}</span>
                <span>{!data[key] ? t(tref + ".no-data") : data[key]}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="dark:text-white text-sm font-semibold text-center">
            {t(tref + ".empty")}.
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultPopup;