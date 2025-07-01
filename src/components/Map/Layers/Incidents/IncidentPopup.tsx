import { useTranslation } from "react-i18next";

import { ModalBody, ModalFooter, Button as Button_ } from "flowbite-react";

import type { Popup } from "leaflet";

import Button from "@components/UI/Button";

import type { Incident } from "@/types/Incident";

import { parseISODate } from "@/utils/dateUtils";
import { useModalStore } from "@/stores/useModalStore";

interface IncidentPopupProps {
  incident: Incident;
  popup: Popup;
}

interface IncidentModalProps {
  incident: Incident;
}

const IncidentModal = ({ incident }: IncidentModalProps) => {
  const { t } = useTranslation("global");
  const {
    identifier,
    title,
    created,
    expiry,
    client,
    municipality
  } = incident;

  return (
    <>
      <ModalBody>
        {  }
      </ModalBody>
      <ModalFooter>
        <Button_ color="alternative">
          { t("body.incident.modal.print-button") }
        </Button_>
        <Button_>
          { t("body.incident.modal.share-button") }
        </Button_>
        <Button_ color="red">
          { t("body.incident.modal.close-button") }
        </Button_>
      </ModalFooter>
    </>
  )
}

const IncidentPopup = ({ incident, popup }: IncidentPopupProps) => {
  const { t } = useTranslation("global");

  const {
    setTitle,
    setChildren,
    open
  } = useModalStore((state) => state);

  const {
    identifier,
    title,
    created,
    expiry,
    client,
    municipality
  } = incident;

  const handleClickDetails = () => {
    setTitle(t("body.incident.modal.title"));
    setChildren(<IncidentModal incident={incident} />);
    open();
  }

  return (
    <div className="w-full flex flex-col gap-4 font-bold">
      <nav className="w-full px-4 py-2 bg-primary-400 text-black rounded-t-xl flex gap-4 justify-between items-center">
        <span>{t("body.incident.popup.title")}</span>
        <span>
          { identifier ? identifier : "N/A" }
        </span>
      </nav>
      <div className="px-4 pb-4 flex flex-col gap-4">
        <p className="!m-0 text-sm">{ title ? title : "N/A" }</p>
        <div className="flex flex-col gap-1">
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              {t("body.incident.popup.type")}
            </span>{" "}
            foo
          </p>
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              {t("body.incident.popup.subtype")}
            </span>{" "}
            foo
          </p>
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              {t("body.incident.popup.created")}
            </span>{" "}
            { created ? parseISODate(created) : "N/A" }
          </p>
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              {t("body.incident.popup.expiry")}
            </span>{" "}
            { expiry ? parseISODate(expiry) : "N/A" }
          </p>
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              {t("body.incident.popup.client")}
            </span>{" "}
            { client ? client : "N/A" }
          </p>
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              {t("body.incident.popup.municipality")}
            </span>{" "}
            { municipality ? municipality : "N/A" }
          </p>
        </div>
        <div className="h-7 flex justify-between">
          <Button onClick={handleClickDetails}>
            {t("body.incident.popup.details-button")}
          </Button>
          <Button onClick={() => popup.close()}>
            {t("body.incident.popup.close-button")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentPopup;
