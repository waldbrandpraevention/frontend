//@ts-nocheck
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import React, { useEffect, useRef, useState } from 'react';
import { Data, Layout } from 'react-plotly.js';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js/dist/plotly'
import { Button } from "react-bootstrap";
import styled from "styled-components";


const MyPlot = styled(Plot)`
    height: 100%;
    width: 100%;
`

const Map = () => {
    const [visible, setVisible] = useState(true);
    const data: Data[] = [
        {
            type: "scattermapbox",
            text: ["Value 1", "Value 2", "Value 3"],
            lon: [-77.0323, -73.935242, -78.928],
            lat: [38.913, 40.7128, 37.775],
            marker: { color: "fuchsia", size: 4 }
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
            center: { lat: 38, lon: -90 }, zoom: 4
        },
        margin: { r: 0, t: 0, b: 0, l: 0 },
        showlegend: false
    };


    //const { data, isLoading, isError } = useQuery(["map"], () => {
    //    return axios.get("/map").then(e => e.data);
    //});

    //if (isLoading) return <LoadingTile />

    //if (isError) return <ErrorAlert> Karte konnte nicht geladen werden.</ErrorAlert>;

    const plotRef = useRef<Plotly.Plot>(null);

    const updatePlot = () => {
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
                ]
            }
        };

        // Use the new layout object to update the plot
        console.log(newLayout)
        Plotly.newPlot('MapPlot', data, newLayout)

    };

    return (<Tile>
        <div id='MapPlot'>
            <MyPlot data={data} layout={layout} ref={plotRef} useResizeHandler={true} />
        </div>
        <Button onClick={updatePlot}>Toggle layers</Button>
    </Tile>);

}

export default Map;