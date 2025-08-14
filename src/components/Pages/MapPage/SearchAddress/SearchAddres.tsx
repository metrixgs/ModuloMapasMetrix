import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Search, { type SearchOption } from "@components/UI/Search/Search";

import ReadPlaces from "@/services/GooglePlacesAPI/ReadPlaces";
import type { ViewPort } from "@/types/GooglePlaces/Place";
import { useMapStore } from "@/stores/useMapStore";
import { latLngBounds } from "leaflet";

const SearchAddress = () => {
  const { t } = useTranslation("global");
  const tref = "body.search-address";

  const map = useMapStore((state) => state.map);

  const [query, setQuery] = useState<string>();
  const [debounceQuery, setDebounceQuery] = useState(query);
  const [options, setOptions] = useState<SearchOption<ViewPort>[]>();

  const handleSelectOption = (op: ViewPort) => {
    const bounds = latLngBounds(
      {lat: op.low.latitude, lng: op.low.longitude},
      {lat: op.high.latitude, lng: op.high.longitude}
    )
    map?.flyToBounds(bounds);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(query);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (!debounceQuery) {
      setOptions(undefined);
      return;
    }

    const request = async () => {
      const response = await ReadPlaces({ query: debounceQuery });

      if (response) {
        const newOptions: SearchOption<ViewPort>[] = response.places
          ? response.places.map((place) => ({
              title: place.displayName.text + "\n" + place.formattedAddress,
              value: place.viewport,
            }))
          : [];
        setOptions(newOptions);
      } else {
        setOptions(undefined);
      }
    };

    request();
  }, [debounceQuery]);

  return (
    <div className="w-72 fixed left-1/2 -translate-x-1/2 top-3 z-[1000]">
      <Search<ViewPort>
        sizing="sm"
        placeholder={t(tref + ".placeholder") + "..."}
        noResultPlaceholder={t(tref + ".noresult-placeholder") + "."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        makeSearch={false}
        options={options}
        onSelectOption={handleSelectOption}
      />
    </div>
  );
};

export default SearchAddress;
