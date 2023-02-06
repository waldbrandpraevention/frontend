import React, { useState } from 'react';
import Tile from "../../Tile";
import Img from "../../../assets/img/loading/LoadingImage2.webp"
import Card from 'react-bootstrap/esm/Card';




const AiImage = () => {


  return (
    <Tile>
      <Card.Title className="text-center">KI Einschätzung</Card.Title>
      <img
        src={Img}
        style={{ width: "100%", height: "50%" }}
        alt="Image"
      />
    </Tile >
  );
};

export default AiImage;
