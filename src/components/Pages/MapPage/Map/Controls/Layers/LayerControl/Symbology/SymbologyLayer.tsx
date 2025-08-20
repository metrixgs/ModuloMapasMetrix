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
        "min-h-8 py-1 px-4",
        "flex gap-4 items-center justify-items-start",
        "text-sm",
        "hover:cursor-pointer",
        "transition-colors duration-200",
        "rounded-lg",
        {
          "hover:bg-gray-200 dark:hover:bg-metrixblack-700": !active,
          "bg-primary-400/70 dark:bg-primary-400/50": active,
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
            <div className="flex items-center gap-2">
              <span
                className={classNames({
                  "h-3 w-3 rounded-full": geometry === "Point",
                  "h-6 w-6 border-3 bg-opacity-0 rounded":
                    geometry === "LineString",
                  "h-6 w-6 border-3 bg-opacity-100 rounded":
                    geometry === "Polygon",
                })}
                style={{
                  borderColor: symbology.symbology.color,
                  backgroundColor: symbology.symbology.fillColor,
                }}
              ></span>
              <span className="font-semibold text-sm dark:text-white">{name}</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sm dark:text-white">{name}</span>
              {symbology.symbology.classes &&
                symbology.symbology.classes.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className={classNames({
                        "h-3 w-3 rounded-full": geometry === "Point",
                        "h-6 w-6 border-3 bg-opacity-0 rounded":
                          geometry === "LineString",
                        "h-6 w-6 border-3 bg-opacity-100 rounded":
                          geometry === "Polygon",
                      })}
                      style={{
                        borderColor: c.options.color,
                        backgroundColor: c.options.fillColor,
                      }}
                    ></span>
                    <span className="dark:text-white">{c.fieldValue}</span>
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
