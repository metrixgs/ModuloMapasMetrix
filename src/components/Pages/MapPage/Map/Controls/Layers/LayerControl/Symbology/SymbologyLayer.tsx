import type { GeoJSONLayerItem } from "@/types/Stores/LayersManager";
import classNames from "classnames";

interface SymbologyLayerProps {
  layer: GeoJSONLayerItem;
  active: boolean;
  onSetLayer: (layerId: string) => void;
}

const SymbologyLayer = ({ layer, active, onSetLayer }: SymbologyLayerProps) => {
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
              <span
                className={classNames("h-6 w-6", {
                  "rounded-full scale-[0.6]": geometry === "Point",
                  "border-3 bg-opacity-0 rounded": geometry === "LineString",
                  "border-3 bg-opacity-100 rounded": geometry === "Polygon",
                })}
                style={{
                  borderColor: symbology.symbology.color,
                  backgroundColor: symbology.symbology.fillColor,
                }}
              ></span>
              <span className="max-w-52 truncate font-semibold text-sm dark:text-white">
                {name}
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="max-w-52 truncate font-semibold text-sm dark:text-white">
                {name}
              </span>
              {symbology.symbology.classes &&
                symbology.symbology.classes.map((c, i) => (
                  <div key={i} className="w-full flex items-center gap-4">
                    <span
                      className={classNames("h-6 w-6", {
                        "rounded-full scale-[0.6]": geometry === "Point",
                        "border-3 bg-opacity-0 rounded":
                          geometry === "LineString",
                        "border-3 bg-opacity-100 rounded":
                          geometry === "Polygon",
                      })}
                      style={{
                        borderColor: c.options.color,
                        backgroundColor: c.options.fillColor,
                      }}
                    ></span>
                    <span className="text-sm dark:text-white">
                      {c.fieldValue}
                    </span>
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
