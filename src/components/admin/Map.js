/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useAppError } from "@/context/ErrorContext";
import { Box } from "@mui/material";
import tt from "@tomtom-international/web-sdk-maps";
import tt_s from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
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
    const m = tt.map({
      key: "PU1iOYOvXi4jz47NHESb32KFfRreuQ7I",
      container: mapRef.current,
      center: [mapLng, mapLat],
      zoom: mapZoom,
    });
    const searchBox = new SearchBox(tt_s.services, {
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
    setMap(m);
    console.log("set map !");
    return () => m.remove();
  }, [mapLng, mapLat, mapZoom]);

  useEffect(() => {
    if (!map.on) return;
    let markers = [];
    map.on("click", (event) => {
      const marker = new tt.Marker()
        .setLngLat(event.lngLat)
        .setDraggable(true)
        .addTo(map);
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
        .addTo(map);
      markers.push(mkr);
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
    });

    return () => {
      markers.forEach((m) => m.remove());
    };
  }, [map, plan, setPlan]);

  return (
    // Important! Always set the container height explicitly
    // <>
    //     <TextField label={"Search"}
    //     onChange={(event) => setQuery(event.target.value)}
    //     onKeyUp={(key) => {
    //         if(key.key == "Enter" || key.key == 13){
    //             makeSearch();
    //         }
    //     }}
    //     />
    // <div>
    <Box sx={{ height: "50vh" }} id="mapDiv" ref={mapRef}></Box>
    // </div>
    // </>
  );
}
