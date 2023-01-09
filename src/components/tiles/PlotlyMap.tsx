import Tile from "../Tile";
import { useRef, useState } from 'react';
/* @ts-ignore */
import { Data, Layout } from 'react-plotly.js';
import Plot from 'react-plotly.js';
/* @ts-ignore */
import Plotly from 'plotly.js/dist/plotly';
import { Button, Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";

import ReactResizeDetector from 'react-resize-detector';
import { PlotRelayoutEvent } from "plotly.js";
import { TbLayersIntersect, TbMenu2, TbX } from "react-icons/tb";

const MyPlot = styled(Plot)`
    height: 100%;
    width: 100%;
`

const PlotlyMap = () => {
    const [visible, setVisible] = useState(true);
    const [zoomState, setZoomState] = useState(8);
    const [centerState, setCenterState] = useState({ lat: 50.06, lon: 8.64 });
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
            center: centerState, zoom: zoomState
            // center: { lat: 50.06, lon: 8.64 }, zoom: 8
        },
        margin: { r: 0, t: 0, b: 0, l: 0 },
        showlegend: false
    };

    const plotRef = useRef<Plotly.Plot>(null);

    const updatePlot = () => {
        // var center = plotRef.current.props.layout.mapbox.center
        // var zoom = plotRef.current.props.layout.mapbox.zoom


        if (!plotRef.current || !plotRef.current.props || !plotRef.current.props.layout) {
            return;
        }
        setVisible(v => !v);

        // console.log("read " + );

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
                center: centerState, zoom: zoomState
                // center: center, zoom: zoom
            },
        };

        // Use the new layout object to update the plot
        Plotly.newPlot('MapPlot', data, newLayout)
    };

    // var center = plotRef.current.props.layout.mapbox.center
    // var zoom = plotRef.current.props.layout.mapbox.zoom


    const relayout = (event?: Readonly<PlotRelayoutEvent>) => {
        const newZoom = plotRef.current.props.layout.mapbox.zoom /* event.mapbox?.zoom */
        const newCenter = plotRef.current.props.layout.mapbox.center/* event.mapbox?.center */
        /* if (newZoom !== undefined) */ setZoomState(newZoom)
        /* if (newCenter !== undefined) */ setCenterState({ lat: newCenter.lat ?? 50.06, lon: newCenter.lon ?? 8.64 })
        // console.table([JSON.stringify(newZoom), JSON.stringify(newCenter)]);
        // console.table([JSON.stringify(zoomState), JSON.stringify(centerState)]);
    }

    /* TODO maybe https://github.com/plotly/react-plotly.js#customizing-the-plotlyjs-bundle */

    const [menu, setShowMenu] = useState(false)

    return (
        <ReactResizeDetector handleWidth handleHeight>
            {({ height, width, targetRef }) =>
                /* @ts-ignore */
                <Tile classes="p-0" ref={targetRef}>
                    <div id='MapPlot'>
                        <MyPlot onRelayout={relayout} data={data} layout={{ ...layout, width, height, }} ref={plotRef} useResizeHandler={true} />
                        <Form style={{ position: "absolute", bottom: 0, left: 0 }}>
                            <InputGroup size="sm" style={{ opacity: 0.7 }}>
                                <Button className="rounded-0" variant="primary" onClick={updatePlot} ><TbLayersIntersect size={18} /></Button>
                                {menu && <>
                                    <InputGroup.Text className="rounded-0">Zoom</InputGroup.Text>
                                    <Form.Control value={zoomState} />
                                    <InputGroup.Text>Lat</InputGroup.Text>
                                    <Form.Control value={centerState.lat} />
                                    <InputGroup.Text>Lon</InputGroup.Text>
                                    <Form.Control value={centerState.lon} className="rounded-0" />
                                </>}
                                {<Button className="rounded-0" variant="outline-primary" onClick={() => setShowMenu(v => !v)} >
                                    {!menu ? <TbMenu2 size={18} /> : <TbX size={18} />}
                                </Button>}
                            </InputGroup>
                        </Form>
                    </div>
                </Tile>
            }
        </ReactResizeDetector>
    );
}

export default PlotlyMap;