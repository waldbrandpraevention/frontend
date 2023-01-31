import Tile from "../../Tile"
import Img from "../../../assets/img/loading/LoadingImage2.webp"
import Card from 'react-bootstrap/esm/Card';
import styled from "styled-components";
const MyImg = styled.img`
width: 100%;
overflow: hidden;
`;

const DroneImage = () => {
  return (
    <Tile>
      <Card.Title className="text-center">Drohnenbild</Card.Title>
      <MyImg
        src={Img}
        style={{ width: "100%", height: "60%" }}
        alt="Image"
      />
    </Tile>
  )
}

export default DroneImage