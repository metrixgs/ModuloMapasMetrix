import { useEffect, useState } from "react";

import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";

import { MapControl } from "@components/Pages/MapPage/Map/Controls/MapControl";

const Fullscreen = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(detectFullscreen());

  useEffect(() => {
    const handleFullscreen = () => {
      setFullscreen(detectFullscreen());
    };

    document.addEventListener("fullscreenchange", handleFullscreen);

    return () => {
      document.addEventListener("fullscreenchange", handleFullscreen);
    };
  }, []);

  return (
    <MapControl onClick={toggleFullscreen}>
      {fullscreen ? (
        <BiExitFullscreen className="h-4 w-4" />
      ) : (
        <BiFullscreen className="h-4 w-4" />
      )}
    </MapControl>
  );
};

const detectFullscreen = (): boolean => {
  return !!document.fullscreenElement;
};

const toggleFullscreen = () => {
  const isFullscreen = detectFullscreen();
  if (isFullscreen) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
};

export default Fullscreen;
