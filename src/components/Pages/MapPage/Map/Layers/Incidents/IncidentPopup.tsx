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

  const { close } = useModalStore((state) => state);

  const {
    identifier,
    title,
    created,
    expiry,
    state,
    client,
    municipality,
    hood,
    photo,
    description
  } = incident;

  return (
    <>
      <ModalBody className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="px-3 py-1 rounded-lg bg-primary-500 text-sm text-white font-bold">
            { title ? title.toUpperCase() : "N/A" }
          </span>
          <span className="text-sm font-bold">
            { t("body.incident.date").toUpperCase() }: { created ? parseISODate(created) : "N/A" }
          </span>
        </div>
        <div className="w-full flex flex-col gap-4 p-4 rounded-lg border-2 border-primary-500">
          <div className="flex gap-6 items-center">
            <div className="min-w-28 flex flex-col items-center p-4 rounded-lg bg-primary-500 text-white font-bold">
              <span className="text-xs">
                { t("body.incident.ticket").toUpperCase() }
              </span>
              <span className="text-lg">
                { identifier ? identifier : "N/A" }
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm">
                { t("body.incident.state").toUpperCase() }
              </span>
              <span className="min-w-20 bg-orange-500 px-2 py-1 text-white font-bold text-xs text-center rounded-lg">
                { state ? state.toUpperCase() : "N/A" }
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 text-xs">
            <p>
              <span className="font-bold">
                { t("body.incident.created").toUpperCase() }:
              </span>
              { " " }
              { created ? parseISODate(created) : "N/A" }
            </p>
            <p>
              <span className="font-bold">
                { t("body.incident.expiry").toUpperCase() }:
              </span>
              { " " }
              { expiry ? parseISODate(expiry) : "N/A" }
            </p>
            <p>
              <span className="font-bold">
                { t("body.incident.client").toUpperCase() }:
              </span>
              { " " }
              { client ? client : "N/A" }
            </p>
            <p>
              <span className="font-bold">
                { t("body.incident.attendant").toUpperCase() }:
              </span>
              { " " }
              { "foo" }
            </p>
            <p>
              <span className="font-bold">
                { t("body.incident.state").toUpperCase() }:
              </span>
              { " " }
              { state ? state : "N/A" }
            </p>
            <p>
              <span className="font-bold">
                { t("body.incident.municipality").toUpperCase() }:
              </span>
              { " " }
              { municipality ? municipality.toUpperCase() : "N/A" }
            </p>
            <p>
              <span className="font-bold">
                { t("body.incident.hood").toUpperCase() }:
              </span>
              { " " }
              { hood ? hood.toUpperCase() : "N/A" }
            </p>
            <p>
              <span className="font-bold">
                { t("body.incident.address").toUpperCase() }:
              </span>
              { " " }
              { "foo" }
            </p>
          </div>
          <div className="">
            {
              photo
              ?
                <img src={photo} alt="" className="h-auto max-w-full" />
              :
              <div className="h-32 animate-pulse bg-gray-200 rounded-lg dark:bg-metrixblack-600 w-full"></div>
            }
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold text-xs">
              { t("body.incident.comments") }:
            </span>
            <span className="p-2 text-xs rounded-lg border border-gray-400 dark:border-metrixblack-600">
              { description ? description : "N/A" }
            </span>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button_ color="dark">
          { t("body.incident.modal.print-button").toUpperCase() }
        </Button_>
        <Button_>
          { t("body.incident.modal.share-button").toUpperCase() }
        </Button_>
        <Button_ color="red" onClick={close}>
          { t("body.incident.modal.close-button").toUpperCase() }
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
    setSize,
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
    setSize("2xl");
    setTitle(t("body.incident.modal.title"));
    setChildren(<IncidentModal incident={incident} />);
    open();
  }

  return (
    <div className="w-full flex flex-col gap-4 font-bold">
      <nav className="w-full px-4 py-2 bg-primary-400 text-black rounded-t-xl flex gap-4 justify-between items-center">
        <span>{t("body.incident.ticket")}</span>
        <span>
          { identifier ? identifier : "N/A" }
        </span>
      </nav>
      <div className="px-4 pb-4 flex flex-col gap-4">
        <p className="!m-0 text-sm">{ title ? title : "N/A" }</p>
        <div className="flex flex-col gap-1">
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              { t("body.incident.type").toUpperCase() }:
            </span>{" "}
            foo
          </p>
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              { t("body.incident.subtype").toUpperCase() }:
            </span>{" "}
            foo
          </p>
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              { t("body.incident.created").toUpperCase() }:
            </span>{" "}
            { created ? parseISODate(created) : "N/A" }
          </p>
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              { t("body.incident.expiry").toUpperCase() }:
            </span>{" "}
            { expiry ? parseISODate(expiry) : "N/A" }
          </p>
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              { t("body.incident.client").toUpperCase() }:
            </span>{" "}
            { client ? client : "N/A" }
          </p>
          <p className="!m-0">
            <span className="text-primary-700 dark:text-primary-400">
              { t("body.incident.municipality").toUpperCase() }:
            </span>{" "}
            { municipality ? municipality : "N/A" }
          </p>
        </div>
        <div className="h-7 flex justify-between">
          <Button onClick={handleClickDetails}>
            { t("body.incident.popup.details-button") }
          </Button>
          <Button onClick={() => popup.close()}>
            { t("body.incident.popup.close-button") }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentPopup;
