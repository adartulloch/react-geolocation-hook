import { useState, useEffect } from "react";

type Position = {
  latitude: number;
  longitude: number;
  altitude?: number;
  altitudeAccuracy?: number;
  accuracy: number;
  heading?: number;
  speed?: number;
  timestamp: Date;
};

type Error = {
  message: String;
};

type GeolocationHook = {
  position: Position | null;
  error: Error | null;
};

const useGeolocation = (): GeolocationHook => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const onSucess = (position: GeolocationPosition) => {
    setPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude ?? undefined,
      altitudeAccuracy: position.coords.altitudeAccuracy ?? undefined,
      accuracy: position.coords.accuracy,
      heading: position.coords.heading ?? undefined,
      speed: position.coords.speed ?? undefined,
      timestamp: new Date(position.timestamp),
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setError({ message: `Error retrieving location: ${error.message}` });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSucess, onError);
    } else {
      setError({ message: "Geolocation is not supported by this browswer" });
    }
  });

  return { position, error };
};

export default useGeolocation;
