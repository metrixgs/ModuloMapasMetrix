import type { FeatureCollection } from "geojson";

import { useTranslation } from "react-i18next";

import { Popover } from "flowbite-react";

import { BiChevronUp } from "react-icons/bi";

import { bboxPolygon, booleanIntersects } from "@turf/turf";

import Button from "@components/UI/Button";

import { useMapLayersStore } from "@/stores/useMapLayersStore";
import { useMapStateStore } from "@/stores/useMapStateStore";

import { visiblePointsId } from "@/config.id";

const VisiblePointsContent = () => {
  const { layers } = useMapLayersStore((state) => state);

  const bounds = useMapStateStore((state) => state.bounds);

  const pointLayers = Object.keys(layers)
    .map((k) => layers[k])
    .filter((i) => i.format === "geojson")
    .filter((i) => i.geometry === "Point");

  return (
    <div className="max-w-72 py-3 px-4 flex flex-col">
      <div className="flex flex-col gap-1 text-xs dark:text-white">
        {pointLayers.map((l) => {
          const total = l.layer
            ? (l.layer.toGeoJSON() as FeatureCollection).features.length
            : 0;

          let count: number;

          if (l.active) {
            if (l.layer && bounds) {
              const collection = l.layer.toGeoJSON() as FeatureCollection;
              const bboxPolygon_ = bboxPolygon([
                bounds.getWest(),
                bounds.getSouth(),
                bounds.getEast(),
                bounds.getNorth(),
              ]);
              const intersection = collection.features.filter((feature) =>
                booleanIntersects(feature, bboxPolygon_)
              );
              count = intersection.length;
            } else {
              count = 0;
            }
          } else {
            count = 0;
          }

          return (
            <span>
              <span className="font-semibold">{l.name}:</span>{" "}
              <span>
                {count} / {total}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

const VisiblePoints = () => {
  const { t } = useTranslation("global");

  const { layers } = useMapLayersStore((state) => state);

  const bounds = useMapStateStore((state) => state.bounds);

  const pointLayers = Object.keys(layers)
    .map((k) => layers[k])
    .filter((i) => i.format === "geojson")
    .filter((i) => i.geometry === "Point");

  
  let total = 0;
  let count = 0;

  pointLayers.forEach((l) => {
    const subTotal = l.layer
      ? (l.layer.toGeoJSON() as FeatureCollection).features.length
      : 0;

    let subCount: number;

    if (l.active) {
      if (l.layer && bounds) {
        const collection = l.layer.toGeoJSON() as FeatureCollection;
        const bboxPolygon_ = bboxPolygon([
          bounds.getWest(),
          bounds.getSouth(),
          bounds.getEast(),
          bounds.getNorth(),
        ]);
        const intersection = collection.features.filter((feature) =>
          booleanIntersects(feature, bboxPolygon_)
        );
        subCount = intersection.length;
      } else {
        subCount = 0;
      }
    } else {
      subCount = 0;
    }

    total = total + subTotal;
    count = count + subCount;
  });

  return (
    <div className="min-w-48 flex items-center justify-between">
      <div className="text-xs dark:text-white">
        <span className="font-bold">
          {t("body.footer.visible-incidents.title")}:
        </span>{" "}
        <span>
          {count} / {total}
        </span>
      </div>
      <Popover content={<VisiblePointsContent />}>
        <Button>
          <BiChevronUp className="w-5 h-5" />
        </Button>
      </Popover>
    </div>
  );
};

export default VisiblePoints;
