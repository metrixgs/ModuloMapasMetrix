import {
  useState,
  type ChangeEventHandler,
  type DragEventHandler,
} from "react";
import type { ToolProps } from "@/types/Tools";
import type { FeatureCollection } from "geojson";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useTranslation } from "react-i18next";

import { FileInput, HelperText, Label, TextInput } from "flowbite-react";

import { BiUpload, BiCloudUpload } from "react-icons/bi";

import classNames from "classnames";

import AddLayer from "../../Layers/AddLayer/AddLayer";

import ToolDescription from "../ToolDescription";
import Button from "@components/UI/Button";

import { extractGeoJSONGeometry } from "@/utils/geometryUtils";

import { TEMPORAL_GROUP } from "@/config.map";

const LoadGeoJSONFile = ({ onExecuteEnd }: ToolProps) => {
  const { t } = useTranslation("global");
  const tref = "body.tools.upload-geojson-file";

  const fileInputId = crypto.randomUUID();
  const nameInputId = crypto.randomUUID();

  const [error, setError] = useState<string | null>();

  const [fileContent, setFileContent] = useState<FeatureCollection | null>();
  const [name, setName] = useState("");

  const [fileName, setFileName] = useState<string | undefined>();

  const [isDragging, setIsDragging] = useState(false);

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    handleFileContent(file);
  };

  const handleDrop: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files[0];
    handleFileContent(file);
  };

  const handleExecute = async () => {
    if (!fileContent) {
      setError(t(tref + ".error.not-json-loaded"));
      return;
    }

    if (!name) {
      setError(t(tref + ".error.not-name"));
      return;
    }

    const geometry = extractGeoJSONGeometry(fileContent);
    if (!geometry) {
      setError(t(tref + ".error.invalid-geom"));
      return;
    }

    const layerItem: GeoJSONLayerItem = {
      id: fileInputId,
      active: true,
      format: "geojson",
      geometry: geometry,
      name: name,
      renamed: true,
      source: {
        sourceType: "generated",
        geojson: fileContent,
      },
      temp: true,
      type: "layer",
    };

    const result = await AddLayer({
      layer: layerItem,
      group: TEMPORAL_GROUP,
    });

    if (!result.status) {
      console.log(result.message);
    }

    if (onExecuteEnd) {
      onExecuteEnd();
    }
  };

  const handleFileContent = (file?: File) => {
    if (!file) return;

    setFileName(file.name);

    const allowedTypes = ["application/json", "application/geo+json"];
    const allowedExtensions = [".json", ".geojson"];
    const fileExtension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension)
    ) {
      setError(t(tref + ".error.not-json"));
      setFileContent(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const jsonData = JSON.parse(text);
        setFileContent(jsonData);
        setError(null);
      } catch (err) {
        setError(t(tref + ".error.not-json-valid"));
      }
    };
    reader.readAsText(file);
    setError(undefined);
  };

  return (
    <div className="p-4">
      <ToolDescription description={t(tref + ".description")} />
      <div className="mt-2 flex flex-col items-center gap-2">
        <div className="w-full">
          <Label
            htmlFor={fileInputId}
            className={classNames(
              "h-52 w-full",
              "flex flex-col items-center justify-center",
              "cursor-pointer",
              "rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 dark:hover:border-gray-500",
              "hover:bg-gray-100 dark:hover:bg-metrixblack-600",
              {
                "bg-gray-50 dark:bg-metrixblack-700": !isDragging,
                "!bg-gray-100 dark:!bg-metrixblack-600": isDragging,
              }
            )}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <BiCloudUpload className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-bold">
                  {t(tref + ".file-input-label.click")}
                </span>{" "}
                {t(tref + ".file-input-label.dragdrop")}
              </p>
              {fileName && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {fileName}
                </p>
              )}
            </div>
            <FileInput
              id={fileInputId}
              className="hidden"
              sizing="sm"
              accept=".geojson, .json"
              onChange={handleFileInput}
            />
          </Label>
        </div>
        <div className="w-full">
          <Label htmlFor={nameInputId}>{t(tref + ".name-input-label")}:</Label>
          <TextInput
            sizing="sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {error && (
          <div className="w-full">
            <HelperText className="text-sm">{error}</HelperText>
          </div>
        )}
        <Button
          disabled={!fileContent || !name}
          className="h-8 w-fit text-sm justify-center"
          onClick={handleExecute}
        >
          <BiUpload className="mr-2" />
          {t(tref + ".execute")}
        </Button>
      </div>
    </div>
  );
};

export default LoadGeoJSONFile;
