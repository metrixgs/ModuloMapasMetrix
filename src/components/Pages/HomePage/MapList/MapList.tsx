import classNames from "classnames";

import MapListItem from "./MapListItem";

const MapListItems = [
  {
    id: "12345",
    imageSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fatcoordinates.files.wordpress.com%2F2023%2F07%2Fusgs_topo_header.png%3Fw%3D940&f=1&nofb=1&ipt=48e48b2d2a1a67d621752c32f5692cadfcca57424298e7f756f4fa25d791a842",
    imageAlt: "Texto",
    mapName: "Mapa de prueba 1",
    createdAt: "2025-07-28",
    updatedAt: "2025-07-28"
  }
]

const MapList = () => {
  return (
    <div className={classNames(
      "grow p-6",
      "grid grid-cols-3 gap-6",
      "overflow-auto",
      "bg-white dark:bg-metrixblack-800",
    )}>
      {
        MapListItems.map((mapItem, index) => {
          return (
            <MapListItem
              key={index}
              mapId={mapItem.id}
              createdAt={mapItem.createdAt}
              updatedAt={mapItem.updatedAt}
              mapName={mapItem.mapName}
              imageSrc={mapItem.imageSrc}
              imageAlt={mapItem.imageAlt}

            />
          )
        })
      }
    </div>
  )
}

export default MapList;