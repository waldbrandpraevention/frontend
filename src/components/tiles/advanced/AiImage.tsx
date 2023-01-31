import React, { useState } from 'react';
import Tile from "../../Tile";
import Img from "../../../assets/img/loading/LoadingImage1.webp"
import Card from 'react-bootstrap/esm/Card';
import styled from 'styled-components';
const MyImg = styled.img`
max-width: 100%;
max-height: 100%;
margin: auto;
display: block;
`;


const AiImage = () => {


  return (
    <Tile>
      <Card.Title className="text-center">KI-System Einschatzung</Card.Title>
      <MyImg
        src={Img}
        alt="Image"
      />
    </Tile>
  );
};

export default AiImage;
