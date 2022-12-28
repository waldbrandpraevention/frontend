import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css'
import Tile from '../../Tile';
import L from 'leaflet';

const MyMapContainer = styled(MapContainer)`
    height: 1000px;
    width : 1000px;
`

var position = L.latLng(50.067, 8.633);

function FireHydrantsMap() {
  return (
    <Tile>
      <MyMapContainer center={position} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.opentopomap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MyMapContainer>
    </Tile>

  );
}

export default FireHydrantsMap;