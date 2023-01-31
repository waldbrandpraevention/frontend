import "leaflet-velocity/dist/leaflet-velocity.css";
import "leaflet-velocity/dist/leaflet-velocity.js";
import { forwardRef, useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const WindLayer = forwardRef((props, ref: any) => {
  const map = useMap();

  let mounted = true;
  let windGlobalLayer: any;

  const { data } = useQuery(["wind"], () => {
    return fetch("https://wind.bp.adriansoftware.de/latest").then(e => e.json())
  }, {
    staleTime: 30 * 60 * 1000,
    onError(err: Error) {
      toast.error("Fehler beim Laden der Winddaten. " + err.message)
    },
  })

  useEffect(() => {
    /* Leaflet map not loaded yet */
    if (!map) return;

    /* component not ready yet */
    if (!mounted) return;

    /* No data available yet */
    if (!data) return;

    /* @ts-ignore velocityLayer doesn't exist */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    windGlobalLayer = L.velocityLayer({
      displayValues: true,
      displayOptions: {
        velocityType: "Wind",
        position: "bottomleft",
        emptyString: "Keine Daten vorhanden",
        angleConvention: "bearingCCW",
        showCardinal: true,
        speedUnit: "m/s",
        directionString: "Richtung",
        speedString: "Geschwindigkeit",
      },
      data: data,
      maxVelocity: 25,
      velocityScale: 0.003,
    });

    if (ref.current && windGlobalLayer)
      ref.current.addOverlay(windGlobalLayer, "<b>Wind</b>");

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mounted = false;
      if (ref && ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current.removeOverlay(windGlobalLayer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, data]);

  return null;
});

export default WindLayer;
