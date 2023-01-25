import { GeoJSON as LeafletGeoJSON } from "leaflet";
import { LayerGroup, LayersControl, MapContainer, TileLayer, useMap, GeoJSON, GeoJSONProps } from 'react-leaflet';
import Tile from "../Tile";
import ReactResizeDetector from 'react-resize-detector';
import 'leaflet/dist/leaflet.css';
import { useEffect, ReactElement, useRef } from "react";
import { useMapStore } from "../../stores/MapStore";
import "../../assets/styles/leafletmap.scss";

/**
 * fixes https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-410450387 
 */
import L from 'leaflet';
import { useZones } from "../../utils/zones";
/* @ts-ignore */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

/**
 * fixes https://github.com/PaulLeCam/react-leaflet/issues/332#issuecomment-849679887
 * GeoJsonWithUpdates is a wrapper around react-leaflet's GeoJSON component to support data changes
 * See https://github.com/PaulLeCam/react-leaflet/issues/332
 *
 * It accepts the same props like react-leaflet's GeoJSON component.
 * However, updates are only support
 */
const GeoJsonWithUpdates = (props: GeoJSONProps): ReactElement => {
  const geoJsonLayerRef = useRef<LeafletGeoJSON | null>(null);

  useEffect(() => {
    const layer = geoJsonLayerRef.current;
    if (layer) {
      layer.clearLayers().addData(props.data);
      // clearLayers() seems to remove the `pathOptions`, `style` and `interactive` prop as well
      // Resetting it here
      if (props.pathOptions) {
        layer.setStyle(props.pathOptions);
      } else if (props.style) {
        layer.setStyle(props.style);
      }
    }
  }, [props.data, props.pathOptions, props.style]);

  return <GeoJSON {...props} ref={geoJsonLayerRef} />;
}

const LeafletMapContainer = () => {
  const updateCenter = useMapStore(state => state.setCenter)
  const updateZoom = useMapStore(state => state.setZoom)
  // const center = useMapStore(state => state.center)
  const activeZone = useMapStore(state => state.activeZone)

  const { data: zonesData, isSuccess: isZonesReady } = useZones()

  const m = useMap()
  useEffect(() => {
    // window.addEventListener("resize", () => {
    //   m.invalidateSize()
    // })
    const t = setInterval(() => { /* invalidate container dimension from time to time */
      m.invalidateSize()
    }, 300)
    return () => clearInterval(t)
  }, [m])

  m.on("moveend", (e) => {
    const moved = m.getCenter()
    updateCenter([moved.lat, moved.lng])
  })

  m.on("zoomend", (e) => {
    const zoom = m.getZoom()
    updateZoom(zoom)
  })

  // m.on('contextmenu', function (e) {
  //   console.log(center);
  // });

  return <LayersControl position="topright">

    <LayersControl.Overlay checked name="<b>Standard</b>">
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*  <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </LayersControl.Overlay>
    <LayersControl.Overlay name="<b>Topografie</b>">
      <LayerGroup>
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        {/* <Circle
          center={center}
          pathOptions={{ fillColor: 'blue' }}
          radius={200}
        />
        <Circle
          center={center}
          pathOptions={{ fillColor: 'red' }}
          radius={100}
          stroke={false}
        />
        <LayerGroup>
          <Circle
            center={[51.51, -0.08]}
            pathOptions={{ color: 'green', fillColor: 'green' }}
            radius={100}
          />
        </LayerGroup> */}
      </LayerGroup>
    </LayersControl.Overlay>

    <LayersControl.Overlay name="<b>Satellit</b>">
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg"
      />
    </LayersControl.Overlay>

    <LayersControl.Overlay name="Standard Weich">
      <TileLayer
        url="https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Standard Dunkel">
      <TileLayer
        url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Standard Grau">
      <TileLayer
        url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    {/* <LayersControl.Overlay name="Topografie (ESRI)">
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.jpg"
      />
    </LayersControl.Overlay> */}
    <LayersControl.Overlay name="<i>- Feuerwehr</i>">
      <TileLayer
        url="https://openfiremap.de/hytiles/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="<i>- Schienenverkehr</i>">
      <TileLayer
        url="http://c.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="<i>- Wanderwege</i>">
      <TileLayer
        url="http://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="<i>- Labels</i>">
      <TileLayer
        url="https://basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.jpg"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay checked={activeZone === -1} name={`<b class="text-decoration-underline">Alle Zonen</b>`}>
      <LayerGroup>
        {isZonesReady && zonesData.map((z: any) => <GeoJsonWithUpdates data={z.geo_json} style={{ fillColor: "#2196F3", color: "#2196F3" }} />)}
      </LayerGroup>
    </LayersControl.Overlay>
    {isZonesReady && zonesData.map((z: any) => (
      <LayersControl.Overlay checked={activeZone === z.id} name={`<span class="fw-bold">${z.name}</span>`}>
        <LayerGroup>
          <GeoJsonWithUpdates data={z.geo_json} style={{ fillColor: "#2196F3", color: "#2196F3" }} />
        </LayerGroup>
      </LayersControl.Overlay>
    ))}
  </LayersControl>
}

const LeafletMap = () => {
  const center = useMapStore(state => state.center)
  const zoom = useMapStore(state => state.zoom)

  return <ReactResizeDetector handleWidth handleHeight >
    {({ height, width, targetRef }) =>
      /* @ts-ignore */
      <Tile classes="p-0" style={{ zIndex: 111 }}>
        {/* @ts-ignore */}
        <MapContainer attributionControl={false} ref={targetRef} center={center} zoom={zoom} doubleClickZoom={true} boxZoom={true} scrollWheelZoom={true} style={{ width: width ?? "100%", height: height ?? "100%" }} /* style={{ width: "100%", height: "100%" }} */>
          <LeafletMapContainer></LeafletMapContainer>
        </MapContainer>
      </Tile>
    }
  </ReactResizeDetector>
}
export default LeafletMap