//@ts-nocheck
import { useState, useEffect, useRef } from "react";
import { Annotorious } from '@recogito/annotorious';
import '@recogito/annotorious/dist/annotorious.min.css';


const AnnotoriousImage = (props: { image: string | undefined; }) => {
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
                console.log(annotation);

            });

            annotorious.on('updateAnnotation', (annotation, previous) => {

            });

            annotorious.on('deleteAnnotation', annotation => {
            });

        }

        // Keep current Annotorious instance in state
        setAnno(annotorious);

        // Cleanup: destroy current instance
        return () => annotorious && annotorious.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div >
            <img
                style={{ width: '100%', height: '80%' }}
                ref={imgEl}
                src={props.image}
                alt="KI Einschätzung" />
        </div>
    );
};

export default AnnotoriousImage;