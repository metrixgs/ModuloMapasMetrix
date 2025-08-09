import { icon, divIcon } from "leaflet";

import primaryCircleMarkerHTML from "./primary-circle-marker.html?raw";
import plantasTratamientoMarkerHTML from "./plantas-tratamiento-marker.html?raw";

export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// export const customMarker = icon({
//   iconUrl: "/icons/circle.svg",
//   iconSize: [16, 16],
//   className: "bg-primary-400"
// });

export const primaryCircleMarker = divIcon({
  className:
    "rounded-full bg-red-500 text-white border border-red-700 flex justify-center items-center",
  iconSize: [18, 18],
  html: primaryCircleMarkerHTML,
});

export const plantasTratamientoMarker = divIcon({
  className:
    "rounded-full bg-sky-500 dark:bg-sky-400 text-white border border-sky-700 flex justify-center items-center",
  iconSize: [18, 18],
  html: plantasTratamientoMarkerHTML,
});

export const secondaryCircleMarker = divIcon({
  className: "h-6 w-6 rounded-full bg-sky-500 dark:bg-sky-400",
});

export const randomColorCircleMarker = () => {
  const randomColor = getRandomColor();
  return divIcon({
    className: "h-6 w-6 rounded-full",
    html: `<div style="background-color:${randomColor};width:100%;height:100%;border-radius:9999px;"></div>`,
  });
};

export const definedColorCircleMarker = (color: string) => {
  return divIcon({
    className: "h-6 w-6 rounded-full",
    html: `<div style="background-color:${color};width:100%;height:100%;border-radius:9999px;"></div>`,
  });
}
