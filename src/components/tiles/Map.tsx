import Tile from "../Tile";
import { useRef, useState } from 'react';
/* @ts-ignore */
import { Data, Layout } from 'react-plotly.js';
import Plot from 'react-plotly.js';
/* @ts-ignore */
import Plotly from 'plotly.js/dist/plotly';
import { Button } from "react-bootstrap";
import styled from "styled-components";

import ReactResizeDetector from 'react-resize-detector';

const MyPlot = styled(Plot)`
    height: 100%;
    width: 100%;
`

const Map = () => {
    const [visible, setVisible] = useState(true);
    const data: Data[] = [
        {
            type: "scattermapbox",
            text: ["Drohne-1", "Drohne-2", "Drohne-69"],
            lon: [50.7, 49.88, -78.928],
            lat: [8.63, 5.5, 37.775],
            marker: { color: "fuchsia", size: 1 }
        }
    ];

    const layout: Partial<Layout> = {
        dragmode: "zoom",
        mapbox: {
            style: 'white-bg',
            layers: [
                {
                    "visible": true,
                    "below": 'traces',
                    "sourcetype": "raster",
                    "source": [
                        "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    ]
                }, {
                    "visible": false,
                    "below": 'traces',
                    "sourcetype": "raster",
                    "source": [
                        "https://tile.opentopomap.org/{z}/{x}/{y}.png"
                    ]
                }],
            below: 'traces',
            center: { lat: 50.06, lon: 8.64 }, zoom: 8
        },
        margin: { r: 0, t: 0, b: 0, l: 0 },
        showlegend: false
    };

    const plotRef = useRef<Plotly.Plot>(null);

    const updatePlot = () => {
        var center = plotRef.current.props.layout.mapbox.center
        var zoom = plotRef.current.props.layout.mapbox.zoom
        if (!plotRef.current || !plotRef.current.props || !plotRef.current.props.layout) {
            return;
        }
        setVisible(!visible);

        // Create a new layout object with updated layers array
        const newLayout: Partial<Layout> = {
            ...plotRef.current.props.layout,
            mapbox: {
                ...plotRef.current.props.layout.mapbox,
                layers: [
                    {
                        ...plotRef.current.props.layout.mapbox.layers[0],
                        visible: !visible
                    },
                    {
                        ...plotRef.current.props.layout.mapbox.layers[1],
                        visible: visible
                    }
                ],
                center: center, zoom: zoom
            },
        };

        // Use the new layout object to update the plot
        Plotly.newPlot('MapPlot', data, newLayout)
    };

    /* TODO maybe https://github.com/plotly/react-plotly.js#customizing-the-plotlyjs-bundle */

    return (
        <ReactResizeDetector handleWidth handleHeight>
            {({ height, width, targetRef }) =>
                /* @ts-ignore */
                <Tile classes="p-0" ref={targetRef}>
                    <div id='MapPlot'>
                        <MyPlot data={data} layout={{ ...layout, width, height }} ref={plotRef} /* useResizeHandler={true} */ />
                        <Button style={{ position: "absolute", bottom: 0, left: 0 }} onClick={updatePlot} >Toggle layers</Button>
                    </div>
                </Tile>
            }
        </ReactResizeDetector>
    );
}

export default Map;