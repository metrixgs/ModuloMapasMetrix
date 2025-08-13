import type { FeatureCollection } from "geojson";
import type { ToolProps } from "@/types/Tools";
import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";

import { useState, type ChangeEvent } from "react";

import { useTranslation } from "react-i18next";

import Papa from "papaparse";

import { FileInput, Label, TextInput, HelperText } from "flowbite-react";
import { BiUpload } from "react-icons/bi";

import ToolDescription from "../ToolDescription";
import SearchableSelect from "@components/UI/SearchableSelect/SearchableSelect";
import Button from "@components/UI/Button";

import { json2geojsonPoint } from "@/utils/geometryUtils";
import AddLayer from "../../Layers/AddLayer/AddLayer";

import { TEMPORAL_GROUP } from "@/config.map";

type CSVRow = { [key: string]: string };

const LoadCSVFile = ({ onExecuteEnd }: ToolProps) => {
  const { t } = useTranslation("global");
  const tref = "body.tools.upload-csv-file";

  const fileInputId = crypto.randomUUID();
  const nameInputId = crypto.randomUUID();
  const latitudeInputId = crypto.randomUUID();
  const longitudeInputId = crypto.randomUUID();

  const [error, setError] = useState<string | null>();
  const [layerName, setLayerName] = useState("");

  const [headers, setHeaders] = useState<string[]>();
  const [data, setData] = useState<CSVRow[]>();

  const [latitude, setLatitude] = useState<string | null>();
  const [longitude, setLongitude] = useState<string | null>();

  const latitudeHeaders = headers?.filter((header) => header !== longitude);
  const longitudeHeaders = headers?.filter((header) => header !== latitude);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError(t(tref + ".error.not-csv"));
      return;
    }

    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(t(tref + ".csv-error"));
          console.log(results.errors);
        } else {
          setData(results.data);
          setHeaders(results.meta.fields || []);
        }
      },
    });
  };

  const handleExecute = async () => {
    if (!data) {
      setError(t(tref + ".not-csv"));
      return;
    }

    if (!latitude) {
      setError(t(tref + ".not-latitude"));
      return;
    }

    if (!longitude) {
      setError(t(tref + ".not-longitude"));
      return;
    }

    if (!layerName) {
      setError(t(tref + ".not-name"));
      return;
    }

    try {
      const geojson = json2geojsonPoint(data, latitude, longitude);

      const layerItem: GeoJSONLayerItem = {
        id: crypto.randomUUID(),
        name: layerName,
        active: true,
        format: "geojson",
        type: "layer",
        source: {
          sourceType: "generated",
          geojson: geojson as FeatureCollection,
        },
        geometry: "Point",
        renamed: true,
        temp: true,
      };

      const result = await AddLayer({
        layer: layerItem,
        group: TEMPORAL_GROUP,
      });

      if (!result.status) {
        throw new Error(result.message);
      }

      if (onExecuteEnd) {
        onExecuteEnd();
      }
    } catch (error) {
      setError(t(tref + ".error.global-error"));
      return;
    }
  };

  return (
    <div className="p-4">
      <ToolDescription description={t(tref + ".description")} />
      <div className="mt-2 flex flex-col items-center gap-2">
        <div className="w-full">
          <Label htmlFor={fileInputId}>{t(tref + ".file-input-label")}:</Label>
          <FileInput
            id={fileInputId}
            sizing="sm"
            accept=".csv"
            onChange={handleFileUpload}
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={latitudeInputId}>
              {t(tref + ".latitude-input-label")}
            </Label>
            <SearchableSelect
              id={latitudeInputId}
              sizing="sm"
              searchPlaceholder={t(tref + ".latitude-input-label")}
              noResultPlaceholder={t(tref + ".no-result-placeholder")}
              options={latitudeHeaders?.map((header) => ({
                title: header,
                value: header,
              }))}
              disabled={!data}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={longitudeInputId}>
              {t(tref + ".longitude-input-label")}
            </Label>
            <SearchableSelect
              id={longitudeInputId}
              sizing="sm"
              searchPlaceholder={t(tref + ".longitude-input-label")}
              noResultPlaceholder={t(tref + ".no-result-placeholder")}
              options={longitudeHeaders?.map((header) => ({
                title: header,
                value: header,
              }))}
              disabled={!data}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor={nameInputId}>{t(tref + ".name-input-label")}:</Label>
          <TextInput
            id={nameInputId}
            sizing="sm"
            value={layerName}
            onChange={(e) => setLayerName(e.target.value)}
            disabled={!data || !latitude || !longitude}
          />
        </div>
        {error && (
          <div className="w-full">
            <HelperText className="text-sm">{error}</HelperText>
          </div>
        )}
        <Button
          disabled={!data || !latitude || !longitude || !layerName}
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

export default LoadCSVFile;
