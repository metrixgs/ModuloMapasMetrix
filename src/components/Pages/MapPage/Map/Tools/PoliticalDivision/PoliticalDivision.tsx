import { useEffect, useState, type ChangeEvent } from "react";

import { useTranslation } from "react-i18next";

import { Label } from "flowbite-react";

import { BiSolidTrash } from "react-icons/bi";

import type { Country } from "@/types/Filters/Country";
import type { State } from "@/types/Filters/State";
import type { Municipality } from "@/types/Filters/Municipality";
// import type { Delegation } from "@/types/Filters/Delegation";
// import type { Zip } from "@/types/Filters/Zip";
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

import Button from "@components/UI/Button";
import SearchableSelect from "@components/UI/SearchableSelect/SearchableSelect";

import { useSpatialFilterStore } from "@/stores/useSpatialFilterStore";

import {
  filtersCountryId,
  filtersStateId,
  filtersMunicipalityId,
  // filtersDelegationId,
  // filtersZipcodeId,
  filtersHoodId,
  filtersSquareId,
  filtersPropertyId,
} from "@/config.id";

const PoliticalDivision = () => {
  const { t } = useTranslation("global");

  const {
    country,
    state,
    municipality,
    // delegation,
    // zip,
    hood,
    square,
    property,
    setCountry,
    setState,
    setMunicipality,
    // setDelegation,
    // setZip,
    setHood,
    setSquare,
    setProperty,
    clear,
  } = useSpatialFilterStore((state) => state);

  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  // const [delegations, setDelegations] = useState<Delegation[]>([]);
  // const [zips, setZips] = useState<Zip[]>([]);
  const [hoods, setHoods] = useState<Hood[]>([]);
  const [squares, setSquares] = useState<Square[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const mount = async () => {
      const countriesResult = await ReadCountries();
      if (countriesResult) {
        setCountries(countriesResult);
      }
    };
    mount();
  }, []);

  const handleCountry = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const countryObject = countries.find((item) => item.code === value);
    if (countryObject) {
      const countryFeature = await ReadCountry(countryObject.id);

      if (countryFeature && countryFeature.geometry) {
        setCountry(countryObject.code, countryObject.name, {
          type: "Feature",
          properties: countryFeature.properties,
          geometry: JSON.parse(countryFeature.geometry),
        });
      } else {
        // TODO
      }

      const statesResult = await ReadStates(countryObject.code);
      if (statesResult) {
        setStates(statesResult);
      } else {
        // TODO
      }
    } else {
      // TODO
    }
  };

  const handleState = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const stateObject = states.find((item) => item.code === value);
    if (stateObject) {
      const stateFeature = await ReadState(stateObject.id);

      if (stateFeature && stateFeature.geometry) {
        setState(stateObject.code, stateObject.name, {
          type: "Feature",
          properties: stateFeature.properties,
          geometry: JSON.parse(stateFeature.geometry),
        });
      } else {
        // TODO
      }

      const municipalitiesResult = await ReadMunicipalities(stateObject.code);
      if (municipalitiesResult) {
        setMunicipalities(municipalitiesResult);
      } else {
        // TODO
      }
    } else {
      // TODO
    }
  };

  const handleMunicipality = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const municipalityObject = municipalities.find(
      (item) => item.code === value
    );
    if (municipalityObject) {
      const municipalityFeature = await ReadMunicipality(municipalityObject.id);

      if (municipalityFeature && municipalityFeature.geometry) {
        setMunicipality(municipalityObject.code, municipalityObject.name, {
          type: "Feature",
          properties: municipalityFeature.properties,
          geometry: JSON.parse(municipalityFeature.geometry),
        });
      } else {
        // TODO
      }

      const hoodsResult = await ReadHoods(municipalityObject.code);
      if (hoodsResult) {
        setHoods(hoodsResult);
      } else {
        // TODO
      }
    } else {
      // TODO
    }
  };

  // const handleDelegation = async (e: ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   setDelegation(value)
  // }

  // const handleZip = async (e: ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   setZip(value);
  // }

  const handleHood = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const hoodObject = hoods.find((item) => item.code === value);
    const municipalityObject = municipalities.find(
      (item) => item.code === municipality
    );
    if (hoodObject && municipalityObject) {
      const hoodFeature = await ReadHood(hoodObject.id);

      if (hoodFeature && hoodFeature.geometry) {
        setHood(hoodObject.code, hoodObject.name, {
          type: "Feature",
          properties: hoodFeature.properties,
          geometry: JSON.parse(hoodFeature.geometry),
        });
      } else {
        // TODO
      }

      const squaresResult = await ReadSquares(municipalityObject.code);
      if (squaresResult) {
        setSquares(squaresResult);
      } else {
        // TODO
      }
    } else {
      // TODO
    }
  };

  const handleSquare = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const squareObject = squares.find((item) => item.code === value);
    if (squareObject) {
      const squareFeature = await ReadSquare(squareObject.id);

      if (squareFeature && squareFeature.geometry) {
        setSquare(squareObject.code, squareObject.code, {
          type: "Feature",
          properties: squareFeature.properties,
          geometry: JSON.parse(squareFeature.geometry),
        });
      } else {
        // TODO
      }

      const propertiesResult = await ReadProperties(squareObject.code);
      if (propertiesResult) {
        setProperties(propertiesResult);
      } else {
        // TODO
      }
    } else {
      // TODO
    }
  };

  const handleProperty = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const propertyObject = properties.find((item) => item.code === value);
    if (propertyObject) {
      const propertyFeature = await ReadProperty(propertyObject.id);

      if (propertyFeature && propertyFeature.geometry) {
        setProperty(propertyObject.code, propertyObject.code, {
          type: "Feature",
          properties: propertyFeature.properties,
          geometry: JSON.parse(propertyFeature.geometry),
        });
      } else {
        // TODO
      }
    } else {
      // TODO
    }
  };

  return (
    <div className="max-w-md flex flex-col gap-3">
      <div>
        {/* Country */}
        <div className="mb-1 block">
          <Label htmlFor={filtersCountryId}>
            {t("body.tools.pol-division.country")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersCountryId}
          disabled={countries.length === 0}
          placeholder={t("body.tools.pol-division.country").toUpperCase()}
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
          <Label htmlFor={filtersStateId}>
            {t("body.tools.pol-division.state")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersStateId}
          disabled={!country || states.length === 0}
          placeholder={t("body.tools.pol-division.state").toUpperCase()}
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
            {t("body.tools.pol-division.municipality")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersMunicipalityId}
          placeholder={t("body.tools.pol-division.municipality").toUpperCase()}
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
        {/* Delegation */}
        {/* <div className="mb-1 block">
          <Label htmlFor={filtersDelegationId}>
            {t("body.tools.pol-division.delegation")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersDelegationId}
          placeholder={t(
            "body.tools.pol-division.delegation"
          ).toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!municipality}
          value={delegation?.toString()}
          onChange={handleDelegation}
          options={delegations.map((option) => ({
            title: option.name,
            value: option.id.toString(),
          }))}
        /> */}
      </div>
      <div>
        {/* Zip */}
        {/* <div className="mb-1 block">
          <Label htmlFor={filtersZipcodeId}>
            {t("body.tools.pol-division.zip")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersZipcodeId}
          placeholder={t(
            "body.tools.pol-division.zip"
          ).toUpperCase()}
          searchPlaceholder={t("body.controls.filters.search.title") + "..."}
          noResultPlaceholder={t("body.controls.filters.search.no-results")}
          sizing="sm"
          disabled={!municipality}
          value={zip?.toString()}
          onChange={handleZip}
          options={zips.map((option) => ({
            title: option.name,
            value: option.id.toString(),
          }))}
        /> */}
      </div>
      <div>
        {/* Hood */}
        <div className="mb-1 block">
          <Label htmlFor={filtersHoodId}>
            {t("body.tools.pol-division.hood")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersHoodId}
          placeholder={t("body.tools.pol-division.hood").toUpperCase()}
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
          <Label htmlFor={filtersSquareId}>
            {t("body.tools.pol-division.square")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersSquareId}
          placeholder={t("body.tools.pol-division.square").toUpperCase()}
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
          <Label htmlFor={filtersPropertyId}>
            {t("body.tools.pol-division.property")}:
          </Label>
        </div>
        <SearchableSelect
          id={filtersPropertyId}
          placeholder={t("body.tools.pol-division.property").toUpperCase()}
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
      <Button className="h-9 justify-center" onClick={clear}>
        <BiSolidTrash className="h-5 w-5 mr-2" />
        {t("body.controls.filters.clean-button")}
      </Button>
    </div>
  );
};

export default PoliticalDivision;
