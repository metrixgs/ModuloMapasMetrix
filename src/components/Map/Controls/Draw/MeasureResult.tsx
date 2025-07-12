import classNames from "classnames";

import { area as tArea, length as tLength } from "@turf/turf";

import Clipboard from "@components/Clipboard";

import { useDrawStore } from "@/stores/useDrawStore";

import { layers2features } from "@/utils/geometryUtils";

const MeasureResult = () => {
  const { features, mode, shape } = useDrawStore((state) => state);

  const active = mode === "measure";

  let area;
  let length;
  if (features && active) {
    const featureCollection = layers2features(features);
    area = tArea(featureCollection);
    length = tLength(featureCollection, { units: "meters" });
  }

  let content;

  if (shape === "Line") {
    content = (
      <div className="h-full p-4 flex items-center gap-4 text-black dark:text-white text-sm font-bold">
        <div className="min-w-20 flex flex-col text-center">
          <span>Distancia</span>
          <span className="font-normal">{length ? parseFloat(length.toFixed(2)).toLocaleString("en-US") + " m" : "N/A"}</span>
        </div>
        <Clipboard value={`${length ? length.toLocaleString("en-US") + " m" : "N/A"}`} />
      </div>
    );
  } else if (shape === "Rectangle") {
    content = (
      <div className="h-full p-4 flex items-center gap-4 text-black dark:text-white text-sm font-bold">
        <div className="min-w-20 flex flex-col text-center">
          <span>Área</span>
          <span className="font-normal">{area ? parseFloat(area.toFixed(2)).toLocaleString("en-US") + " m²" : "N/A"}</span>
        </div>
        <Clipboard value={`${area ? area.toLocaleString("en-US") + " m²" : "N/A"}`} />
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "fixed left-1/2 -translate-x-1/2 bottom-12 h-20 w-auto",
        "bg-white dark:bg-metrixblack-800 shadow rounded-lg",
        {
          hidden: !active,
        }
      )}
    >
      {content}
    </div>
  );
};

export default MeasureResult;
