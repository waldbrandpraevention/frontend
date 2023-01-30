import "leaflet-velocity/dist/leaflet-velocity.css";
import "leaflet-velocity/dist/leaflet-velocity.js";
import { forwardRef, useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

const WindLayer = forwardRef((props, ref: any) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    let mounted = true;
    let windGlobalLayer: any;

    // fetch("https://onaci.github.io/leaflet-velocity/wind-global.json")
    // fetch("https://raw.githubusercontent.com/onaci/leaflet-velocity/master/demo/wind-global.json")
    // fetch("http://localhost:7000/latest")
    fetch("https://wind.bp.adriansoftware.de/latest")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted) return;

        /* @ts-ignore velocityLayer doesn't exist */
        windGlobalLayer = L.velocityLayer({
          displayValues: true,
          displayOptions: {
            velocityType: "Wind",
            position: "bottomleft",
            emptyString: "Keine Daten vorhanden",
            angleConvention: "bearing",
            // display cardinal direction alongside degrees
            showCardinal: true,
            // one of: ['ms', 'k/h', 'mph', 'kt']
            // speedUnit: "km/h",
            speedUnit: "m/s",
            directionString: "Richtung",
            speedString: "Geschwindigkeit",
          },
          data: data,
          // minVelocity: 0, // used to align color scale
          // maxVelocity: 10, // used to align color scale
          // velocityScale: 0.005 //0.1 // arbitrary default 0.005
          // maxVelocity: 15,
          
          maxVelocity: 25,
          velocityScale: 0.002,
        });

        if (ref.current && windGlobalLayer)
          ref.current.addOverlay(windGlobalLayer, "Wind");
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
      if (ref && ref.current) {
        // FIXME: uncomment
        // ref.current.removeOverlay(windGlobalLayer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
});

export default WindLayer;
