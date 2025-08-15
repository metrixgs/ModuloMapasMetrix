import { useEffect, useState, type ChangeEvent } from "react";

import { useTranslation } from "react-i18next";

import classNames from "classnames";

import { Label } from "flowbite-react";

import type { ToolProps } from "@/types/Tools";
import type { Country } from "@/types/Filters/Country";
import type { State } from "@/types/Filters/State";
import type { Municipality } from "@/types/Filters/Municipality";
import type { Hood } from "@/types/Filters/Hood";
import type { Square } from "@/types/Filters/Square";
import type { Property } from "@/types/Filters/Property";

import ReadCountries from "@/services/Filters/Geographic/Country/ReadCountries";
import ReadCountry from "@/services/Filters/Geographic/Country/ReadCountry";
import ReadStates from "@/services/Filters/Geographic/State/ReadStates";
import ReadState from "@/services/Filters/Geographic/State/ReadState";
import ReadMunicipalities from "@/services/Filters/Geographic/Municipality/ReadMunicipalities";
import ReadMunicipality from "@/services/Filters/Geographic/Municipality/ReadMunicipality";
import ReadHoods from "@/services/Filters/Geographic/Hood/ReadHoods";
import ReadHood from "@/services/Filters/Geographic/Hood/ReadHood";
import ReadSquares from "@/services/Filters/Geographic/Square/ReadSquares";
import ReadSquare from "@/services/Filters/Geographic/Square/ReadSquare";
import ReadProperties from "@/services/Filters/Geographic/Property/ReadProperties";
import ReadProperty from "@/services/Filters/Geographic/Property/ReadProperty";

import SearchableSelect from "@components/UI/SearchableSelect/SearchableSelect";

import { useSpatialFilterStore } from "@/stores/useSpatialFilterStore";

import {
  filtersTargetId,
  filtersCountryId,
  filtersStateId,
  filtersMunicipalityId,
  filtersHoodId,
  filtersSquareId,
  filtersPropertyId,
} from "@/config.id";
import { useMapLayersStore } from "@/stores/useMapLayersStore";
import { useModalErrorStore } from "@/stores/useModalErrorStore";
import ToolDescription from "../ToolDescription";

const PoliticalDivision = ({}: ToolProps) => {
  const { t } = useTranslation("global");
  const tref = "body.tools.pol-division";

  const {
    targetId: target,
    country,
    state,
    municipality,
    hood,
    square,
    property,
    setTargetId: setTarget,
    setCountry,
    setState,
    setMunicipality,
    setHood,
    setSquare,
    setProperty,
  } = useSpatialFilterStore((state) => state);

  const { open, setChildren } = useModalErrorStore((state) => state);

  const { layersAsArray } = useMapLayersStore((state) => state);

  const availableLayers = layersAsArray()
    .filter((l) => l.format === "geojson")
    .filter((l) => l.geometry === "Point");

  const [load, setLoad] = useState(false);

  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [hoods, setHoods] = useState<Hood[]>([]);
  const [squares, setSquares] = useState<Square[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  const showError = (key: string) => {
    setChildren(<span>{t(tref + ".error" + key)}</span>);
    open();
  };

  useEffect(() => {
    const mount = async () => {
      setLoad(true);
      const countriesResult = await ReadCountries();
      setLoad(false);
      if (countriesResult) {
        setCountries(countriesResult);
      } else {
        showError(".not-available");
      }
    };
    mount();
  }, []);

  const handleCountry = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const countryObject = countries.find((item) => item.code === value);
    if (countryObject) {
      setLoad(true);
      const countryFeature = await ReadCountry(countryObject.id);
      setLoad(false);

      if (countryFeature && countryFeature.geometry) {
        const countryResult = await setCountry(
          countryObject.code,
          countryObject.name,
          {
            type: "Feature",
            properties: countryFeature.properties,
            geometry: JSON.parse(countryFeature.geometry),
          }
        );
        !countryResult && showError(".filter");
      } else {
        showError(".not-country");
        return;
      }

      setLoad(true);
      const statesResult = await ReadStates(countryObject.code);
      setLoad(false);
      if (statesResult) {
        setStates(statesResult);
      } else {
        showError(".not-states");
        return;
      }
    } else {
      showError(".unexpected");
      return;
    }
  };

  const handleState = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const stateObject = states.find((item) => item.code === value);
    if (stateObject) {
      setLoad(true);
      const stateFeature = await ReadState(stateObject.id);
      setLoad(false);

      if (stateFeature && stateFeature.geometry) {
        const stateResult = await setState(stateObject.code, stateObject.name, {
          type: "Feature",
          properties: stateFeature.properties,
          geometry: JSON.parse(stateFeature.geometry),
        });
        !stateResult && showError(".filter");
      } else {
        showError(".not-state");
        return;
      }

      setLoad(true);
      const municipalitiesResult = await ReadMunicipalities(stateObject.code);
      setLoad(false);
      if (municipalitiesResult) {
        setMunicipalities(municipalitiesResult);
      } else {
        showError(".not-municipalities");
        return;
      }
    } else {
      showError(".unexpected");
      return;
    }
  };

  const handleMunicipality = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const municipalityObject = municipalities.find(
      (item) => item.code === value
    );
    if (municipalityObject) {
      setLoad(true);
      const municipalityFeature = await ReadMunicipality(municipalityObject.id);
      setLoad(false);

      if (municipalityFeature && municipalityFeature.geometry) {
        const municipalityResult = await setMunicipality(
          municipalityObject.code,
          municipalityObject.name,
          {
            type: "Feature",
            properties: municipalityFeature.properties,
            geometry: JSON.parse(municipalityFeature.geometry),
          }
        );

        !municipalityResult && showError(".filter");
      } else {
        showError(".not-municipality");
        return;
      }

      setLoad(true);
      const hoodsResult = await ReadHoods(municipalityObject.code);
      setLoad(false);
      if (hoodsResult) {
        setHoods(hoodsResult);
      } else {
        showError(".not-hoods");
        return;
      }
    } else {
      showError(".unexpected");
      return;
    }
  };

  const handleHood = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const hoodObject = hoods.find((item) => item.code === value);
    const municipalityObject = municipalities.find(
      (item) => item.code === municipality
    );
    if (hoodObject && municipalityObject) {
      setLoad(true);
      const hoodFeature = await ReadHood(hoodObject.id);
      setLoad(false);

      if (hoodFeature && hoodFeature.geometry) {
        const hoodResult = await setHood(hoodObject.code, hoodObject.name, {
          type: "Feature",
          properties: hoodFeature.properties,
          geometry: JSON.parse(hoodFeature.geometry),
        });

        !hoodResult && showError(".filter");
      } else {
        showError(".not-hood");
        return;
      }

      setLoad(true);
      const squaresResult = await ReadSquares(municipalityObject.code);
      setLoad(false);
      if (squaresResult) {
        setSquares(squaresResult);
      } else {
        showError(".not-squares");
        return;
      }
    } else {
      showError(".unexpected");
      return;
    }
  };

  const handleSquare = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const squareObject = squares.find((item) => item.code === value);
    if (squareObject) {
      setLoad(true);
      const squareFeature = await ReadSquare(squareObject.id);
      setLoad(false);

      if (squareFeature && squareFeature.geometry) {
        const squareResult = await setSquare(
          squareObject.code,
          squareObject.code,
          {
            type: "Feature",
            properties: squareFeature.properties,
            geometry: JSON.parse(squareFeature.geometry),
          }
        );

        !squareResult && showError(".filter");
      } else {
        showError(".not-square");
        return;
      }

      setLoad(true);
      const propertiesResult = await ReadProperties(squareObject.code);
      setLoad(false);
      if (propertiesResult) {
        setProperties(propertiesResult);
      } else {
        showError(".not-properties");
        return;
      }
    } else {
      showError(".unexpected");
      return;
    }
  };

  const handleProperty = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const propertyObject = properties.find((item) => item.code === value);
    if (propertyObject) {
      setLoad(true);
      const propertyFeature = await ReadProperty(propertyObject.id);
      setLoad(false);

      if (propertyFeature && propertyFeature.geometry) {
        setProperty(propertyObject.code, propertyObject.code, {
          type: "Feature",
          properties: propertyFeature.properties,
          geometry: JSON.parse(propertyFeature.geometry),
        });
      } else {
        setChildren(<span>{t(tref + ".error.not-property")}</span>);
        open();
        return;
      }
    } else {
      setChildren(<span>{t(tref + ".error.unexpected")}</span>);
      open();
      return;
    }
  };

  return (
    <div
      className={classNames("max-w-md flex flex-col gap-3", {
        "animate-pulse pointer-events-none select-none": load,
      })}
    >
      <ToolDescription description={t(tref + ".description")} />
      <div>
        <div className="mb-1 block">
          <Label htmlFor={filtersTargetId}>{t(tref + ".layer")}:</Label>
        </div>
        <SearchableSelect
          id={filtersTargetId}
          disabled={availableLayers.length === 0}
          placeholder={t(tref + ".layer").toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          options={availableLayers.map((option) => ({
            title: option.name,
            value: option.id,
          }))}
        />
      </div>
      <div>
        {/* Country */}
        <div className="mb-1 block">
          <Label htmlFor={filtersCountryId}>{t(tref + ".country")}:</Label>
        </div>
        <SearchableSelect
          id={filtersCountryId}
          disabled={countries.length === 0 || !target}
          placeholder={t(tref + ".country").toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          value={country}
          onChange={handleCountry}
          options={countries.map((option) => ({
            title: option.name,
            value: option.code,
          }))}
        />
      </div>
      <div>
        {/* States */}
        <div className="mb-1 block">
          <Label htmlFor={filtersStateId}>{t(tref + ".state")}:</Label>
        </div>
        <SearchableSelect
          id={filtersStateId}
          disabled={!country || states.length === 0}
          placeholder={t(tref + ".state").toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          value={state}
          onChange={handleState}
          options={states.map((option) => ({
            title: option.name,
            value: option.code,
          }))}
        />
      </div>
      <div>
        {/* Municipality */}
        <div className="mb-1 block">
          <Label htmlFor={filtersMunicipalityId}>
            {t(tref + ".municipality")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersMunicipalityId}
          placeholder={t(tref + ".municipality").toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!state || municipalities.length === 0}
          value={municipality}
          onChange={handleMunicipality}
          options={municipalities.map((option) => ({
            title: option.name,
            value: option.code,
          }))}
        />
      </div>
      <div>
        {/* Hood */}
        <div className="mb-1 block">
          <Label htmlFor={filtersHoodId}>{t(tref + ".hood")}:</Label>
        </div>
        <SearchableSelect
          id={filtersHoodId}
          placeholder={t(tref + ".hood").toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!municipality || hoods.length === 0}
          value={hood}
          onChange={handleHood}
          options={hoods.map((option) => ({
            title: option.name,
            value: option.code,
          }))}
        />
      </div>
      <div>
        {/* Square */}
        <div className="mb-1 block">
          <Label htmlFor={filtersSquareId}>{t(tref + ".square")}:</Label>
        </div>
        <SearchableSelect
          id={filtersSquareId}
          placeholder={t(tref + ".square").toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!hood || squares.length === 0}
          value={square}
          onChange={handleSquare}
          options={squares.map((option) => ({
            title: option.code,
            value: option.code,
          }))}
        />
      </div>
      <div>
        {/* Property */}
        <div className="mb-1 block">
          <Label htmlFor={filtersPropertyId}>{t(tref + ".property")}:</Label>
        </div>
        <SearchableSelect
          id={filtersPropertyId}
          placeholder={t(tref + ".property").toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!square || properties.length === 0}
          value={property}
          onChange={handleProperty}
          options={properties.map((option) => ({
            title: option.code,
            value: option.code,
          }))}
        />
      </div>
    </div>
  );
};

export default PoliticalDivision;
