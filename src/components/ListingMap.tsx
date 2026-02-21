"use client";

import { Map, Marker } from "@vis.gl/react-google-maps";
import MapProvider from "./MapProvider";

interface ListingMapProps {
  name: string;
  coordinates: { lat: number; lng: number };
  city: string;
  state: string;
}

export default function ListingMap({
  name,
  coordinates,
  city,
  state,
}: ListingMapProps) {
  return (
    <MapProvider>
      <div className="rounded-2xl overflow-hidden border border-border h-64">
        <Map
          defaultCenter={coordinates}
          defaultZoom={10}
          gestureHandling="cooperative"
          disableDefaultUI={false}
          style={{ width: "100%", height: "100%" }}
        >
          <Marker position={coordinates} title={name} />
        </Map>
      </div>
      <p className="text-text-muted text-xs mt-2 text-center">
        Approximate location: {city}, {state}
      </p>
    </MapProvider>
  );
}
