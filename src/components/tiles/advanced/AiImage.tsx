import Tile from "../../Tile";
import Img from "../../../assets/img/loading/LoadingImage1.webp";
import Card from 'react-bootstrap/esm/Card';
import styled from 'styled-components';
const MyImg = styled.img`
width: 100%;
overflow: hidden;
`;

const AiImage = () => {
  return (
    <Tile>
      <Card.Title className="text-center">KI Einschätzung</Card.Title>
      <MyImg
        src={Img}
        alt="Image"
      />
    </Tile >
  );
};

export default AiImage;
