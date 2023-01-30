import Plot from 'react-plotly.js';
import React, { useState } from 'react';
import Tile from "../../Tile";
import { Data } from 'plotly.js';

const AiAnalysis = () => {
  var x1 = [];
  var x2 = [];
  for (var i = 1; i < 500; i++) {
    x1.push(Math.random() + 1);
    x2.push(Math.random() + 1.1);
  }

  const [data, setData] = useState<Data[]>([
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
    <Tile>
      <Plot
        data={data}
        layout={{
          barmode: 'overlay',
          title: 'Analyse',
          legend: { "orientation": "h" },
          xaxis: { title: 'Time' },
          yaxis: { title: 'Detection Value' },
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </Tile>
  );
};

export default AiAnalysis;

