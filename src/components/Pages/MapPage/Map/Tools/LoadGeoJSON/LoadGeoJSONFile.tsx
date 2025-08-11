import { useState, type ChangeEvent, type FormEvent } from "react";
import type { FeatureCollection } from "geojson";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useTranslation } from "react-i18next";

import { FileInput, HelperText, Label, TextInput } from "flowbite-react";

import { BiUpload } from "react-icons/bi";

import AddLayer from "../../Layers/AddLayer/AddLayer";

import Button from "@components/UI/Button";

import { extractGeoJSONGeometry } from "@/utils/geometryUtils";

import { TEMPORAL_GROUP } from "@/config.map";

interface LoadGeoJSONFileProps {
  onExecuteEnd?: () => void;
}

const LoadGeoJSONFile = ({ onExecuteEnd }: LoadGeoJSONFileProps) => {
  const { t } = useTranslation("global");
  const tref = "body.tools.upload-geojson-file";

  const fileInputId = crypto.randomUUID();
  const nameInputId = crypto.randomUUID();

  const [error, setError] = useState<string | null>();

  const [fileContent, setFileContent] = useState<FeatureCollection | null>();
  const [name, setName] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["application/json", "application/geo+json"];
    const allowedExtensions = [".json", ".geojson"];
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
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
  };

  return (
    <form
      className="p-4 flex flex-col items-center gap-2"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <Label htmlFor={fileInputId}>{t(tref + ".file-input-label")}:</Label>
        <FileInput
          id={fileInputId}
          sizing="sm"
          accept=".json, .geojson"
          onChange={handleFileChange}
        />
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
      <Button className="h-8 w-fit text-sm justify-center" type="submit">
        <BiUpload className="mr-2" />
        {t(tref + ".execute")}
      </Button>
    </form>
  );
};

export default LoadGeoJSONFile;
