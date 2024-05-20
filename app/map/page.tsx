"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import Map, { Source, Layer, Marker, NavigationControl } from "react-map-gl";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

import HeatmapControl from "@/components/heatmap-control";
import { heatmapLayer } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { MarkerDragEvent, LngLat } from "react-map-gl";
import Pin from "@/components/pin";
import PinControl from "@/components/pin-control";

const MAPBOX_TOKEN = "pk.eyJ1IjoiZGV2aW53IiwiYSI6ImNsd2YzbHJidDFydHoyam1uM3NiZXEwdjAifQ.6vm7sx9Bu58wmdF-L1RElA";

function filterFeaturesByDay(
  featureCollection: FeatureCollection<Geometry, GeoJsonProperties>,
  time: number
): FeatureCollection<Geometry, GeoJsonProperties> {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter((feature: any) => {
    const featureDate = new Date(feature.properties.time);
    return featureDate.getFullYear() === year && featureDate.getMonth() === month && featureDate.getDate() === day;
  });
  return { type: "FeatureCollection", features };
}

export default function App() {
  // HEATMAP CONTROLS
  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, selectTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((resp) => resp.json())
      .then((json) => {
        const features = json.features;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        setTimeRange([startTime, endTime]);
        setEarthQuakes(json);
        console.log(json);
        selectTime(endTime);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  const data = useMemo(() => {
    if (!earthquakes) return null;
    return allDays ? earthquakes : filterFeaturesByDay(earthquakes, selectedTime);
  }, [earthquakes, allDays, selectedTime]);

  // MARKER CONTROLS
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = React.useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = React.useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  const onMarkerDragEnd = React.useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  return (
    <main className="h-screen relative">
      <section className="h-[100%] w-[100%] top-0 left-0 absolute">
        <Map
          initialViewState={{
            latitude: 40,
            longitude: -100,
            zoom: 3,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
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
          {data && (
            <Source type="geojson" data={data}>
              <Layer {...heatmapLayer} />
            </Source>
          )}

          <NavigationControl />
        </Map>
      </section>

      <div className="absolute top-0 right-0 m-12">
        <PinControl events={events} />
      </div>

      <div className="absolute top-0 left-0 m-12">
        <Sheet>
          <SheetTrigger className="rounded-md px-4 py-2 bg-background">Open</SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-6">
              <SheetTitle>Control Panel</SheetTitle>
              <SheetDescription>
                Control the map Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate tempore
                cupiditate ipsam dolor autem veniam doloremque magnam.
              </SheetDescription>
            </SheetHeader>

            <HeatmapControl
              startTime={timeRange[0]}
              endTime={timeRange[1]}
              selectedTime={selectedTime}
              allDays={allDays}
              onChangeTime={selectTime}
              onChangeAllDays={useAllDays}
            />
          </SheetContent>
        </Sheet>
      </div>
    </main>
  );
}

export function renderToDom(container: any) {
  createRoot(container).render(<App />);
}
