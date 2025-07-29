import classNames from "classnames";
import { Link } from "react-router-dom";

interface MapListItemProps {
  mapId: string;
  imageSrc: string;
  imageAlt: string;
  mapName: string;
  createdAt: string;
  updatedAt: string;
}

const MapListItem = ({
  mapId,
  imageSrc,
  imageAlt,
  mapName,
  createdAt,
  updatedAt,
}: MapListItemProps) => {
  return (
    <Link
      to={`/map/${mapId}`}
      className={classNames(
        "h-64 w-72",
        "transition-transform duration-300 hover:scale-105 hover:cursor-pointer",
        "border border-gray-300 dark:border-gray-600",
        "rounded-lg"
      )}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="rounded-t-lg w-full h-2/3 object-cover"
      />
      <div className="h-1/3 py-4 px-3 tracking-tight text-md dark:text-white flex flex-col">
        <h5 className="font-semibold">
          {mapName}
        </h5>
        <span className="text-xs">
          <span className="font-semibold">Actualizado:</span>{" "}
          <time>{ updatedAt }</time>
        </span>
        <span className="text-xs">
          <span className="font-semibold">Creado:</span>{" "}
          <time>{ createdAt }</time>
        </span>
      </div>
    </Link>
  );
};

export default MapListItem;
