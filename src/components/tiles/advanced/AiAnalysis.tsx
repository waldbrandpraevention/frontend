import Plot from 'react-plotly.js';
import { useState } from 'react';
import Tile from "../../Tile";
import { Data } from 'plotly.js';
import styled from 'styled-components';
import ReactResizeDetector from 'react-resize-detector';
import { Card } from 'react-bootstrap';

const MyPlot = styled(Plot)`
  width: 100%;
  height: 100%;
`

const AiAnalysis = () => {
  var x1 = [];
  var x2 = [];
  for (var i = 1; i < 500; i++) {
    x1.push(Math.random() + 1);
    x2.push(Math.random() + 1.1);
  }

  const [data, /* setData */] = useState<Data[]>([
    {
      x: x1,
      type: 'histogram',
      name: 'Fire Detected',
      opacity: 0.7,
      marker: {
        color: 'red',
      },
    },
    {
      x: x2,
      type: 'histogram',
      name: 'Smoke Detected',
      opacity: 0.5,
      marker: {
        color: 'grey',
      },
    }
  ]);


  return (
    <ReactResizeDetector handleWidth handleHeight >
      {() =>
        /* @ts-ignore */
        <Tile>
          <Card.Title className="text-center">KI Analyse</Card.Title>
          <MyPlot
            useResizeHandler
            data={data}
            layout={{
              barmode: 'overlay',
              legend: { "orientation": "h" },
              xaxis: { title: 'Zeit' },
              yaxis: { title: 'Gefahr' },
              autosize: true,
            }}

            style={{ width: '100%', height: '80%' }}
            config={{ responsive: true }}
          />

        </Tile>
      }
    </ReactResizeDetector>
  );
};

export default AiAnalysis;