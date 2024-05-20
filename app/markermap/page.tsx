"use client";

import Pin from "@/components/pin";
import * as React from "react";
import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Map, { Marker, NavigationControl } from "react-map-gl";

import type { MarkerDragEvent, LngLat } from "react-map-gl";

const MAPBOX_TOKEN = "pk.eyJ1IjoiZGV2aW53IiwiYSI6ImNsd2YzbHJidDFydHoyam1uM3NiZXEwdjAifQ.6vm7sx9Bu58wmdF-L1RElA";

const initialViewState = {
  latitude: 40,
  longitude: -100,
  zoom: 3.5,
};

export default function App() {
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  return (
    <>
      <div className="h-content">
        <Map
          initialViewState={initialViewState}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: "100vw", height: "100vh" }}
        >
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
            draggable
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}
          >
            <Pin size={20} />
          </Marker>

          <NavigationControl />
        </Map>
      </div>
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
