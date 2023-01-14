import { LatLngTuple } from "leaflet";
import { LayerGroup, LayersControl, MapContainer, TileLayer, useMap } from 'react-leaflet';
import Tile from "../Tile";
import ReactResizeDetector from 'react-resize-detector';
import 'leaflet/dist/leaflet.css';
import { useEffect } from "react";
import { useMapStore } from "../../service/stores";

const LeafletMapContainer = ({ center, zoom }: { center: LatLngTuple, zoom: number }) => {
  const updateCenterStore = useMapStore(state => state.setCenter)

  const m = useMap()
  useEffect(() => {
    // window.addEventListener("resize", () => {
    //   m.invalidateSize()
    // })
    const t = setInterval(() => { /* invalidate container dimension fromt time to time */
      m.invalidateSize()
    }, 300)
    return () => clearInterval(t)
  }, [m])

  m.on("moveend", (e) => {
    const moved = m.getCenter()
    updateCenterStore([moved.lat, moved.lng])
  })

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
    <LayersControl.Overlay name="Standard Grau">
      <TileLayer
        url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="Topografie (ESRI)">
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.jpg"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="* Feuerwehr">
      <TileLayer
        url="http://www.openfiremap.de/hytiles/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="* Schienenverkehr">
      <TileLayer
        url="http://c.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
    <LayersControl.Overlay name="* Wanderwege">
      <TileLayer
        url="http://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png"
      />
    </LayersControl.Overlay>
  </LayersControl>
}

const LeafletMap = () => {
  const center = useMapStore(state => state.center)
  // const center = [50.06, 8.64] as LatLngTuple

  return <ReactResizeDetector handleWidth handleHeight >
    {({ height, width, targetRef }) =>
      /* @ts-ignore */
      <Tile classes="p-0" style={{zIndex: 111}}>
        {/* @ts-ignore */}
        <MapContainer attributionControl={false} ref={targetRef} center={center} zoom={8} scrollWheelZoom={true} style={{ width: width ?? "100%", height: height ?? "100%" }} /* style={{ width: "100%", height: "100%" }} */>
          <LeafletMapContainer center={center} zoom={8}></LeafletMapContainer>
        </MapContainer>
      </Tile>
    }
  </ReactResizeDetector>
}
export default LeafletMap