//@ts-nocheck
import Tile from "../../Tile";
import Img from "../../../assets/img/loading/LoadingImage2.webp"
import Card from 'react-bootstrap/esm/Card';
//import Carousel from "react-bootstrap/Carousel";
//import ReactResizeDetector from "react-resize-detector";
import { useState, useEffect, useRef } from "react";
import { Annotorious } from '@recogito/annotorious';
import '@recogito/annotorious/dist/annotorious.min.css';


const AiImage = () => {
  const Labels = ['Feuer', 'Rauch'];

  // The current Annotorious instance
  const [/* anno */, setAnno] = useState();

  // Ref to the image DOM element
  const imgEl = useRef();

  // Init Annotorious when the component
  // mounts, and keep the current 'anno'
  // instance in the application state
  useEffect(() => {
    let annotorious = null;

    if (imgEl.current) {
      // Init
      annotorious = new Annotorious({
        image: imgEl.current,
        editor: 'fixed',
        editorOptions: {
          labels: Labels,
          hideComment: true
        }
      });

      // Attach event handlers here
      annotorious.on('createAnnotation', annotation => {
        annotation.label = Labels;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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