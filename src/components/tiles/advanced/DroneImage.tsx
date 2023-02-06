import React, { useState } from 'react';
import Tile from "../../Tile";
import Img from "../../../assets/img/loading/LoadingImage2.webp";
import Card from "react-bootstrap/Card";


const DroneImage = () => {




  return (
    <Tile>
      <Card.Title className="text-center">Drohnenbild</Card.Title>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          style={{ width: '100%', maxHeight: '80%' }}
          src={Img}
          alt="KI Einschaezung" />
      </div>
      <Card.Text >Position: lan lot  Zone: Radioactiv Zone Zeitpunkt: 1.1.23 12:23</Card.Text>
    </Tile >
  );
};



export default DroneImage;
