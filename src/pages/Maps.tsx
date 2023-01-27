import Map from "../components/tiles/Map";
import { useMapStore } from "../stores/MapStore";

const Maps = () => {
    useMapStore(state => state.setActiveZone)(-1) /* show all zones */
    
    return (
        <div style={{height: "calc(100vh - 32px)"}}>
            <Map />
        </div>
    );
}

export default Maps;