import Tile from "../../Tile"
import Img from "../../../assets/img/loading/LoadingImage2.webp"
import Card from 'react-bootstrap/esm/Card';

const DroneImage = () => {
  return (
    <Tile>
      <Card.Title className="text-center">Orginalaufnahme</Card.Title>
      <img
        src={Img}
        style={{ width: "100%", height: "60%" }}
        alt="Image"
      />
    </Tile>
  )
}

export default DroneImage