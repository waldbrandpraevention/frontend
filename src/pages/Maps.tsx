import { Container } from "react-bootstrap";
import { useAuth } from "../service/auth";
import Map from '../components/tiles/Maps/NormalMap';
import Topo from '../components/tiles/Maps/TopographicMap';


const Maps = () => {
    const { user } = useAuth();

    return (<div className="App">
        <Container>
            <Map />
        </Container>
        <Container>
            <Topo />
        </Container>


    </div >)
}
export default Maps;