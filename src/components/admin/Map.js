/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useAppError } from "@/context/ErrorContext";
import { Box } from "@mui/material";
import "@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css";

import { useEffect, useRef, useState } from "react";

export default function Map({ plan, setPlan }) {
  const mapRef = useRef();
  const [mapLng, setMapLng] = useState(
    !plan.markers.length
      ? -121.91599
      : plan.markers
          .map((l) => l.lng)
          .reduce((partialSum, a) => partialSum + a, 0) / plan.markers.length,
  );
  const [mapLat, setMapLat] = useState(
    !plan.markers.length
      ? 37.36765
      : plan.markers
          .map((l) => l.lat)
          .reduce((partialSum, a) => partialSum + a, 0) / plan.markers.length,
  );
  const mapZoom = 13;
  const [map, setMap] = useState({});

  const { setMessage, setSeverity, setOpen } = useAppError();

  useEffect(() => {
    // Set current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setMapLng(pos.coords.longitude);
        setMapLat(pos.coords.latitude);
      });
    } else {
      setMessage("Geolocation not supported !");
      setSeverity("error");
      setOpen(true);
    }
  }, [setMessage, setOpen, setSeverity]);

  useEffect(() => {
    let markers = [];
    const initTT = async () => {
      const tt = await import("@tomtom-international/web-sdk-maps");
      const tt_s = await import("@tomtom-international/web-sdk-services");
      const { default: SearchBoxPlugin } = await import(
        "@tomtom-international/web-sdk-plugin-searchbox"
      );
      const m = tt.map({
        key: "PU1iOYOvXi4jz47NHESb32KFfRreuQ7I",
        container: mapRef.current,
        center: [mapLng, mapLat],
        zoom: mapZoom,
      });

      const searchBox = new SearchBoxPlugin(tt_s.services, {
        searchOptions: {
          key: "PU1iOYOvXi4jz47NHESb32KFfRreuQ7I",
          language: "en-GB",
        },
        autocompleteOptions: {
          key: "PU1iOYOvXi4jz47NHESb32KFfRreuQ7I",
          language: "en-GB",
        },
        units: "kilometers",
      });

      searchBox.on("tomtom.searchbox.resultselected", (result) => {
        setMapLng(result.data.result.position.lng);
        setMapLat(result.data.result.position.lat);
      });
      m.addControl(searchBox, "top-left");
      m.on("click", (event) => {
        const marker = new tt.Marker()
          .setLngLat(event.lngLat)
          .setDraggable(true)
          .addTo(m);
        const lngLat = { lng: event.lngLat.lng, lat: event.lngLat.lat };
        marker.on("dragstart", (marker_event) => {
          console.log("Clicked on marker !");
          marker.remove();
          markers = markers.filter((m) => m !== marker);
          setPlan((current) => {
            return {
              ...current,
              markers: current.markers.filter(
                (m) => JSON.stringify(m) !== JSON.stringify(lngLat),
              ),
            };
          });
        });
        console.log("Map clicked !");
        console.log(markers);
        setPlan((current) => {
          return { ...current, markers: [...current.markers, lngLat] };
        });
        markers.push(marker);
      });

      if (!plan) return;
      plan.markers.forEach((marker) => {
        const mkr = new tt.Marker()
          .setLngLat([marker.lng, marker.lat])
          .setDraggable(true)
          .addTo(m);
        console.log("Drawing markers from plan");
        mkr.on("dragstart", (marker_event) => {
          console.log("Clicked on marker !");
          mkr.remove();
          markers = markers.filter((m) => m !== mkr);
          setPlan((current) => {
            return {
              ...current,
              markers: current.markers.filter(
                (m) => JSON.stringify(m) !== JSON.stringify(marker),
              ),
            };
          });
        });
        markers.push(mkr);
      });
      setMap(m);
    };

    initTT();
    return () => {
      markers.forEach((m) => m.remove());
      if (map && map.remove) map.remove();
    };
  }, [mapLng, mapLat, mapZoom]);

  return <Box sx={{ height: "50vh" }} id="mapDiv" ref={mapRef}></Box>;
}
