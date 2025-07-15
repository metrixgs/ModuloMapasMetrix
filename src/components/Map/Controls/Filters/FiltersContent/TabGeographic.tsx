import type { ChangeEvent } from "react";

import { useTranslation } from "react-i18next";

import { Label } from "flowbite-react";

import { BiSolidTrash } from "react-icons/bi";

import Button from "@components/UI/Button";
import SearchableSelect from "@components/UI/SearchableSelect/SearchableSelect";

import ReadGeojson from "@/services/Filters/Geographic/ReadGeojson";

import { useSpatialFilterStore } from "@/stores/useSpatialFilterStore";

import type {
  level_1,
  level_2,
  level_3,
  level_4,
  level_5,
  level_6,
  level_7,
  level_8,
} from "@/types/GeographicFilter";

import level1 from "@/assets/geographic/level_1.json";
import level2 from "@/assets/geographic/level_2.json";
import level3 from "@/assets/geographic/level_3.json";
import level4 from "@/assets/geographic/level_4.json";
import level5 from "@/assets/geographic/level_5.json";
import level6 from "@/assets/geographic/level_6.json";
import level7 from "@/assets/geographic/level_7.json";
import level8 from "@/assets/geographic/level_8.json";

import {
  filtersCountryId,
  filtersStateId,
  filtersMunicipalityId,
  filtersDelegationId,
  filtersZipcodeId,
  filtersHoodId,
  filtersSquareId,
  filtersPropertyId,
} from "@/config.id";

const TabGeographic = () => {
  const { t } = useTranslation("global");

  const {
    country,
    state,
    municipality,
    delegation,
    zip,
    hood,
    square,
    property,
    setCountry,
    setState,
    setMunicipality,
    setDelegation,
    setZip,
    setHood,
    setSquare,
    setProperty,
    clear,
  } = useSpatialFilterStore((state) => state);

  const countries = level1 as level_1[];
  const states = (level2 as level_2[]).filter(
    (item) => item.level_1 === country
  );
  const municipalities = (level3 as level_3[]).filter(
    (item) => item.level_1 === country && item.level_2 === state
  );
  const delegations = (level4 as level_4[]).filter(
    (item) =>
      item.level_1 === country &&
      item.level_2 === state &&
      item.level_3 === municipality
  );
  const zips = (level5 as level_5[]).filter(
    (item) =>
      item.level_1 === country &&
      item.level_2 === state &&
      item.level_3 === municipality &&
      (delegation === undefined ||
        (item.level_4 !== undefined && item.level_4 === delegation))
  );
  const hoods = (level6 as level_6[]).filter(
    (item) =>
      item.level_1 === country &&
      item.level_2 === state &&
      item.level_3 === municipality &&
      (zip === undefined ||
        (item.level_5 !== undefined && item.level_5 === zip))
  );
  const squares = (level7 as level_7[]).filter(
    (item) =>
      item.level_1 === country &&
      item.level_2 === state &&
      item.level_3 === municipality &&
      (delegation === undefined ||
        (item.level_4 !== undefined && item.level_4 === delegation)) &&
      (zip === undefined ||
        (item.level_5 !== undefined && item.level_5 === zip)) &&
      item.level_6 === hood
  );
  const properties = (level8 as level_8[]).filter(
    (item) =>
      item.level_1 === country &&
      item.level_2 === state &&
      item.level_3 === municipality &&
      (delegation === undefined ||
        (item.level_4 !== undefined && item.level_4 === delegation)) &&
      (zip === undefined ||
        (item.level_5 !== undefined && item.level_5 === zip)) &&
      item.level_6 === hood &&
      item.level_7 === square
  );

  const handleCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setCountry();
    } else {
      setCountry(parseInt(value));
    }
  };

  const handleState = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setState();
    } else {
      const id = parseInt(value);
      const item = states.find(
        (target) => target.id === id && target.level_1 === country
      );

      const geojson = await ReadGeojson("level_2", item?.geom);
      setState(parseInt(value), geojson);
    }
  };

  const handleMunicipality = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setMunicipality();
    } else {
      const id = parseInt(value);
      const item = municipalities.find(
        (target) =>
          target.id === id &&
          target.level_1 === country &&
          target.level_2 === state
      );

      const geojson = await ReadGeojson("level_3", item?.geom);
      setMunicipality(parseInt(value), geojson);
    }
  };

  // TODO: handleDelegation

  // TODO: handleZip

  const handleHood = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setHood();
    } else {
      const id = parseInt(value);
      const item = hoods.find(
        (target) =>
          target.id === id &&
          target.level_1 === country &&
          target.level_2 === state &&
          target.level_3 === municipality
      );

      const geojson = await ReadGeojson("level_6", item?.geom);
      setHood(parseInt(value), geojson);
    }
  };

  const handleSquare = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setSquare();
    } else {
      const id = parseInt(value);
      const item = squares.find(
        (target) =>
          target.id === id &&
          target.level_1 === country &&
          target.level_2 === state &&
          target.level_3 === municipality &&
          target.level_6 === hood
      );

      const geojson = await ReadGeojson("level_7", item?.geom);
      setSquare(parseInt(value), geojson);
    }
  };

  const handleProperty = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setProperty();
    } else {
      // const id = parseInt(value);
      const item = properties.find(
        (target) =>
          target.id === value &&
          target.level_1 === country &&
          target.level_2 === state &&
          target.level_3 === municipality &&
          target.level_6 === hood &&
          target.level_7 === square
      );

      const geojson = await ReadGeojson("level_8", item?.geom);
      setProperty(value, geojson);
    }
  };

  return (
    <div className="max-w-md flex flex-col gap-3">
      <div>
        <div className="mb-1 block">
          <Label htmlFor={filtersCountryId}>
            {t("body.controls.filters.tabs.geographic.country")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersCountryId}
          placeholder={t(
            "body.controls.filters.tabs.geographic.country"
          ).toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          value={country?.toString()}
          onChange={handleCountry}
          options={countries.map((option) => ({
            title: option.name,
            value: option.id.toString(),
          }))}
        />
      </div>
      <div>
        <div className="mb-1 block">
          <Label htmlFor={filtersStateId}>
            {t("body.controls.filters.tabs.geographic.state")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersStateId}
          placeholder={t(
            "body.controls.filters.tabs.geographic.state"
          ).toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!country}
          value={state?.toString()}
          onChange={handleState}
          options={states.map((option) => ({
            title: option.name,
            value: option.id.toString(),
          }))}
        />
      </div>
      <div>
        <div className="mb-1 block">
          <Label htmlFor={filtersMunicipalityId}>
            {t("body.controls.filters.tabs.geographic.municipality")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersMunicipalityId}
          placeholder={t(
            "body.controls.filters.tabs.geographic.municipality"
          ).toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!state}
          value={municipality?.toString()}
          onChange={handleMunicipality}
          options={municipalities.map((option) => ({
            title: option.name,
            value: option.id.toString(),
          }))}
        />
      </div>
      <div>
        <div className="mb-1 block">
          <Label htmlFor={filtersDelegationId}>
            {t("body.controls.filters.tabs.geographic.delegation")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersDelegationId}
          placeholder={t(
            "body.controls.filters.tabs.geographic.delegation"
          ).toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!municipality}
          value={delegation?.toString()}
          onChange={(e) =>
            !e.target.value
              ? setDelegation(undefined)
              : setDelegation(parseInt(e.target.value))
          }
          options={delegations.map((option) => ({
            title: option.name,
            value: option.id.toString(),
          }))}
        />
      </div>
      <div>
        <div className="mb-1 block">
          <Label htmlFor={filtersZipcodeId}>
            {t("body.controls.filters.tabs.geographic.zip")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersZipcodeId}
          placeholder={t(
            "body.controls.filters.tabs.geographic.zip"
          ).toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!municipality}
          value={zip?.toString()}
          onChange={(e) =>
            !e.target.value
              ? setZip(undefined)
              : setZip(parseInt(e.target.value))
          }
          options={zips.map((option) => ({
            title: option.name,
            value: option.id.toString(),
          }))}
        />
      </div>
      <div>
        <div className="mb-1 block">
          <Label htmlFor={filtersHoodId}>
            {t("body.controls.filters.tabs.geographic.hood")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersHoodId}
          placeholder={t(
            "body.controls.filters.tabs.geographic.hood"
          ).toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!municipality}
          value={hood?.toString()}
          onChange={handleHood}
          options={hoods.map((option) => ({
            title: option.name,
            value: option.id.toString(),
          }))}
        />
      </div>
      <div>
        <div className="mb-1 block">
          <Label htmlFor={filtersSquareId}>
            {t("body.controls.filters.tabs.geographic.square")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersSquareId}
          placeholder={t(
            "body.controls.filters.tabs.geographic.square"
          ).toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!hood}
          value={square?.toString()}
          onChange={handleSquare}
          options={squares.map((option) => ({
            title: option.name,
            value: option.id.toString(),
          }))}
        />
      </div>
      <div>
        <div className="mb-1 block">
          <Label htmlFor={filtersPropertyId}>
            {t("body.controls.filters.tabs.geographic.property")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersPropertyId}
          placeholder={t(
            "body.controls.filters.tabs.geographic.property"
          ).toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!square}
          value={property?.toString()}
          onChange={handleProperty}
          options={properties.map((option) => ({
            title: option.name,
            value: option.id.toString(),
          }))}
        />
      </div>
      <Button className="h-9 justify-center" onClick={clear}>
        <BiSolidTrash className="h-5 w-5 mr-2" />
        {t("body.controls.filters.clean-button")}
      </Button>
    </div>
  );
};

export default TabGeographic;
