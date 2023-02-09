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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          style={{ width: '100%', maxHeight: 'auto' }}
          ref={imgEl}
          src={Img}
          alt="KI Einschätzung" />
      </div>
      <Card.Text >Position: lan,lot;  Zone: Brandenburg; Zeitpunkt: 1.1.23 12:23</Card.Text>
    </Tile >
  );
};

export default AiImage;
