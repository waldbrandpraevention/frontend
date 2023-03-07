import { LayerGroup, LayersControl, MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import Tile from "../Tile";
import ReactResizeDetector from 'react-resize-detector';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from "react";
import { useMapStore } from "../../stores/MapStore";
import "../../assets/styles/leafletmap.scss";

/**
 * fixes https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-410450387 
 */
import L from 'leaflet';
import { getPolygonStyle, useZones } from "../../utils/zones";
import { useNavigate } from "react-router-dom";
import DronesContainer from "../map/DronesContainer";
import WindLayer from "../map/WindLayer";
import DroneEventsContainer from "../map/DroneEventsContainer";
/* @ts-ignore */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const LeafletMapContainer = () => {
  const updateCenter = useMapStore(state => state.setCenter)
  const updateZoom = useMapStore(state => state.setZoom)
  const activeZone = useMapStore(state => state.activeZone)
  const setShowDroneRoutes = useMapStore(state => state.setShowDroneRoutes)

  const { data: zonesData, isSuccess: isZonesReady } = useZones()

  const layersRef = useRef(null)

  const navigate = useNavigate();

  const m = useMap()
  useEffect(() => {
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

  m.on("contextmenu", (e) => console.log(e.latlng))

  const [showWindBg, setShowWindBg] = useState(false);

  m.on("overlayadd", (e) => {
    if (e.name === "<b>Drohnenrouten</b>") { setShowDroneRoutes(true); }
    if (e.name === "<b>Wind</b>") { setShowWindBg(true); }
  })

  m.on("overlayremove", (e) => {
    if (e.name === "<b>Drohnenrouten</b>") { setShowDroneRoutes(false) }
    if (e.name === "<b>Wind</b>") { setShowWindBg(false) }
  })

  return <LayersControl position="topright" ref={layersRef}>
    <LayersControl.Overlay checked name="<b>Standard</b>">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="<b>Topografie</b>">
      <LayerGroup>
        <TileLayer
          url="https://tile.opentopomap.org/{z}/{x}/{y}.png"
        />
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
    <LayersControl.Overlay name="Standard Schwarz">
      <TileLayer
        url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Standard Weiß">
      <TileLayer
        url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay checked={true} name="Standard Grau (für Wind)">
      {showWindBg && <TileLayer
        url="https://c.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png"
      />}
    </LayersControl.Overlay>
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
    <LayersControl.Overlay name="<i>- Wind</i>" >
      <WindLayer ref={layersRef}></WindLayer>
    </LayersControl.Overlay>
    <LayersControl.Overlay checked={true} name={`<b>Zonen</b>`}>
      <LayerGroup>
        {isZonesReady && zonesData.filter(z => activeZone === -1 || activeZone === z.id).map(z => <GeoJSON data={z.geo_json} onEachFeature={(feature, layer) => {
          layer.on({
            click: () => navigate(`/zones/${z.id}`)
          });
        }} style={getPolygonStyle(z)} />)}
      </LayerGroup>
    </LayersControl.Overlay>
    <LayersControl.Overlay checked={false} name={`<b>Drohnenrouten</b>`}>
      <LayerGroup>
        {/* TODO */}
      </LayerGroup>
    </LayersControl.Overlay>
    <LayersControl.Overlay checked={true} name={`<b>Drohnen</b>`}>
      <LayerGroup>
        <DronesContainer />
      </LayerGroup>
    </LayersControl.Overlay>
    <LayersControl.Overlay checked={true} name={`<b>Events</b>`}>
      <LayerGroup>
        <DroneEventsContainer />
      </LayerGroup>
    </LayersControl.Overlay>
  </LayersControl>
}

const LeafletMap = () => {
  const center = useMapStore(state => state.center)
  const zoom = useMapStore(state => state.zoom)

  return <ReactResizeDetector handleWidth handleHeight>
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