import { useState, type ChangeEvent, type FormEvent } from "react";
import type { FeatureCollection } from "geojson";

import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useTranslation } from "react-i18next";

import { FileInput, HelperText, Label, TextInput } from "flowbite-react";

import { BiUpload } from "react-icons/bi";

import { geoJSON } from "leaflet";

import Button from "@components/UI/Button";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

import { extractGeoJSONGeometry } from "@/utils/geometryUtils";

import { TEMPORAL_GROUP } from "@/config.map";

interface LoadGeoJSONFileProps {
  onExecuteEnd?: () => void;
}

const LoadGeoJSONFile = ({ onExecuteEnd }: LoadGeoJSONFileProps) => {
  const { t } = useTranslation("global");
  const tref = "body.tools.upload-geojson-file";

  const {
    append,
    createGroup,
    assignLayerToGroup,
    focusLayer
  } = useMapLayersStore((store) => store);

  const fileInputId = crypto.randomUUID();
  const nameInputId = crypto.randomUUID();

  const [error, setError] = useState<string | null>();

  const [fileContent, setFileContent] = useState<FeatureCollection>();
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
      },
      temp: true,
      type: "layer",
      columns: fileContent.features[0].properties
        ? Object.keys(fileContent.features[0].properties).map((f) => ({
            accessorKey: f,
            header: f,
          }))
        : undefined,
    };

    const load = async () => geoJSON(fileContent);

    await createGroup(TEMPORAL_GROUP);

    const mount = await append(layerItem, load);

    if (mount) {
      assignLayerToGroup(layerItem.id, TEMPORAL_GROUP.id);
      focusLayer(layerItem.id);
    } else {
      // TODO
    }

    if (onExecuteEnd) {
      onExecuteEnd();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar que sea un JSON
    if (file.type !== "application/json") {
      setError(t(tref + ".error.not-json"));
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
          accept=".json"
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
