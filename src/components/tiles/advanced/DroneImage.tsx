//@ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import Tile from "../../Tile";
import Img from "../../../assets/img/loading/LoadingImage2.webp";
import Card from "react-bootstrap/Card";
//import Carousel from "react-bootstrap/Carousel";
//import ReactResizeDetector from "react-resize-detector";

import { Annotorious } from '@recogito/annotorious';
import '@recogito/annotorious/dist/annotorious.min.css';

const DroneImage: React.FC = () => {

  // Ref to the image DOM element
  const imgEl = useRef();

  // The current Annotorious instance
  const [anno, setAnno] = useState();

  // Current drawing tool name
  const [tool, setTool] = useState('rect');

  // Init Annotorious when the component
  // mounts, and keep the current 'anno'
  // instance in the application state
  useEffect(() => {
    let annotorious = null;

    if (imgEl.current) {
      // Init
      annotorious = new Annotorious({
        image: imgEl.current
      });

      // Attach event handlers here
      annotorious.on('createAnnotation', annotation => {

      });

      annotorious.on('updateAnnotation', (annotation, previous) => {
      });

      annotorious.on('deleteAnnotation', annotation => {
      });
    }

    // Keep current Annotorious instance in state
    setAnno(annotorious);

    // Cleanup: destroy current instance
    return () => annotorious.destroy();
  }, []);


  return (
    <Tile>
      <Card.Title className="text-center">Drohnenbild</Card.Title>
      <div>
        <img
          style={{ width: "90%", height: "10%" }}
          ref={imgEl}
          src={Img}
          alt="Hallstatt Town Square" />
      </div>
      <div>

      </div>
    </Tile >
  );
};

export default DroneImage;
