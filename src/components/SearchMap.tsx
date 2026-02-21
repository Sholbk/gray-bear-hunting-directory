"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Map, Marker, InfoWindow, useMap } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Listing } from "@/types";
import Link from "next/link";
import MapProvider from "./MapProvider";

const US_CENTER = { lat: 39.8, lng: -98.5 };
const DEFAULT_ZOOM = 4;

interface SearchMapProps {
  listings: Listing[];
}

function MapContent({ listings }: SearchMapProps) {
  const map = useMap();
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const listingsWithCoords = useMemo(
    () => listings.filter((l) => l.coordinates !== null),
    [listings]
  );

  // Fit bounds when listings change
  useEffect(() => {
    if (!map || listingsWithCoords.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    listingsWithCoords.forEach((l) => {
      if (l.coordinates) bounds.extend(l.coordinates);
    });
    map.fitBounds(bounds, 50);
  }, [map, listingsWithCoords]);

  const typeLabels: Record<string, string> = {
    guide: "Guide",
    outfitter: "Outfitter",
    charter: "Charter",
    lodge: "Accommodation",
    boat: "Boats & Vehicles",
    taxidermy: "Taxidermy",
    retailer: "Retailer",
    "dog-trainer": "Gun Dog",
    "shooting-range": "Shooting Range",
    education: "Education",
    processor: "Game Processing",
    land: "Land & Leases",
    photographer: "Photographer",
  };

  return (
    <>
      {listingsWithCoords.map((listing) => (
        <Marker
          key={listing.slug}
          position={listing.coordinates!}
          title={listing.name}
          onClick={() => setSelectedListing(listing)}
        />
      ))}

      {selectedListing && selectedListing.coordinates && (
        <InfoWindow
          position={selectedListing.coordinates}
          onCloseClick={() => setSelectedListing(null)}
        >
          <div className="max-w-[200px]">
            <h3 className="font-bold text-sm mb-1">{selectedListing.name}</h3>
            <p className="text-xs text-gray-600 mb-1">
              {typeLabels[selectedListing.type] || selectedListing.type}
            </p>
            <p className="text-xs text-gray-500 mb-2">
              {selectedListing.location.city}, {selectedListing.location.state}
            </p>
            <Link
              href={`/listing/${selectedListing.slug}`}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              View Details
            </Link>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function SearchMap({ listings }: SearchMapProps) {
  return (
    <MapProvider>
      <div className="rounded-2xl overflow-hidden border border-border h-[600px]">
        <Map
          defaultCenter={US_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          gestureHandling="cooperative"
          disableDefaultUI={false}
          style={{ width: "100%", height: "100%" }}
        >
          <MapContent listings={listings} />
        </Map>
      </div>
    </MapProvider>
  );
}
