import type { GeoJSONLayerItem, Geometry } from "@/types/Stores/LayersManager";
import { type PathOptions } from "leaflet";

import { useTranslation } from "react-i18next";

import classNames from "classnames";
import { formatNumber } from "@/utils/numberUtils";

interface SymbologyLayerProps {
  layer: GeoJSONLayerItem;
  active: boolean;
  onSetLayer: (layerId: string) => void;
}

interface SymbolOptions {
  options: PathOptions;
  geometry: Geometry;
}

function pathOptionsToSvgAttrs(options: PathOptions) {
  return {
    stroke: options.color || "none",
    strokeWidth: options.weight || 1,
    strokeOpacity: options.opacity ?? 1,
    strokeLinecap: options.lineCap || "butt",
    strokeLinejoin: options.lineJoin || "miter",
    strokeDasharray: options.dashArray || undefined,
    strokeDashoffset: options.dashOffset || undefined,
    fill: options.fill ? options.fillColor || options.color || "none" : "none",
    fillOpacity: options.fillOpacity ?? 1,
    fillRule: options.fillRule || "evenodd",
  };
}

export const Symbol = ({ options, geometry }: SymbolOptions) => {
  return (
    <div className="h-7 w-7">
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        {
          {
            Point: (
              <circle
                cx="50"
                cy="50"
                r="25"
                vectorEffect="non-scaling-stroke"
                {...pathOptionsToSvgAttrs(options)}
              ></circle>
            ),
            LineString: (
              <path
                d="M 20 50 Q 35 20, 50 50 T 80 50 T 110 50"
                vectorEffect="non-scaling-stroke"
                {...pathOptionsToSvgAttrs(options)}
              ></path>
            ),
            Polygon: (
              <rect
                x="25"
                y="25"
                width="50"
                height="50"
                vectorEffect="non-scaling-stroke"
                {...pathOptionsToSvgAttrs(options)}
              ></rect>
            ),
          }[geometry]
        }
      </svg>
    </div>
  );
};

const SymbologyLayer = ({ layer, active, onSetLayer }: SymbologyLayerProps) => {
  const { t } = useTranslation("global");
  const tref =
    "body.controls.layers.tabs.symbology.controller.type-categorized";

  const { id, name, symbology, geometry } = layer;

  return (
    <div
      className={classNames(
        "min-h-8 py-2 px-4",
        "flex gap-4 items-center justify-items-start",
        "text-sm",
        "hover:cursor-pointer",
        "transition-colors duration-200",
        "rounded-lg",
        {
          "hover:bg-gray-200 dark:hover:bg-metrixblack-700": !active,
          "bg-primary-400/20 dark:bg-primary-400/30": active,
          "text-primary-950 dark:text-primary-100": active,
        }
      )}
      onClick={() => {
        onSetLayer(id);
      }}
    >
      {symbology ? (
        <div>
          {symbology.type === "simple" ? (
            <div className="w-full flex items-center gap-4">
              <Symbol geometry={geometry} options={symbology.symbology} />
              <span className="max-w-52 truncate font-semibold text-sm dark:text-white">
                {name}
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span>
                <span className="max-w-52 truncate font-semibold text-sm dark:text-white">
                  {name}
                </span>{" "}
                <span className="text-xs">
                  {symbology.symbology.classes &&
                    (symbology.symbology.classes.length > 1
                      ? `(${formatNumber(symbology.symbology.classes.length, {
                          maximumFractionDigits: 0,
                        })} ${t(tref + ".classes")})`
                      : `(${formatNumber(symbology.symbology.classes.length, {
                          maximumFractionDigits: 0,
                        })} ${t(tref + ".class")})`)}
                </span>
              </span>

              {symbology.symbology.classes &&
                symbology.symbology.classes.map((c, i) => (
                  <div key={i} className="w-full flex items-center gap-4">
                    <Symbol geometry={geometry} options={c.options} />
                    <div className="text-sm dark:text-white flex flex-col">
                      <span>{c.fieldValue}</span>
                      <span className="text-xs">
                        {c.quantity &&
                          formatNumber(c.quantity, {
                            maximumFractionDigits: 0,
                          })}{" "}
                        {t(tref + ".features")}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : (
        <span className="font-semibold text-sm dark:text-white">{name}</span>
      )}
    </div>
  );
};

export default SymbologyLayer;
