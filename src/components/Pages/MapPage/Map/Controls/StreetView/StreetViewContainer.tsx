import {
  GoogleMap,
  StreetViewPanorama,
} from "@react-google-maps/api";

import { ModalBody } from "flowbite-react";

interface StreetViewContainerProps {
  center: {
    lat: number;
    lng: number;
  };
}

const StreetViewContainer = ({ center }: StreetViewContainerProps) => {
  return (
    <>
      <ModalBody>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            minHeight: "512px",
            borderRadius: "8px"
          }}
          center={center}
          zoom={14}
        >
          <StreetViewPanorama
            position={center}
            visible={true}
            options={{
              pov: { heading: 100, pitch: 0 },
              zoom: 1,
            }}
          />
        </GoogleMap>
      </ModalBody>
    </>
  );
};

export default StreetViewContainer;
