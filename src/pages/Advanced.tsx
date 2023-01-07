import { Container } from "react-bootstrap";
import "../assets/styles/App.css";
import AlertEmergencyUnits from "../components/tiles/AlertEmergencyUnits";
import Area from "../components/tiles/Area";
import Map from "../components/tiles/Map";
import AlertDrone from "../components/tiles/AlertDrone";
import DroneInfo from "../components/tiles/DroneInfo";
import FireDetection from "../components/tiles/FireDetection";
import PotentialFiresite from "../components/tiles/PotentialFiresite";
import { Responsive, WidthProvider } from "react-grid-layout";
import styled from "styled-components";

const MyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const ResponsiveGridLayout = WidthProvider(Responsive);

const Advanced = () => {
  return (
    <div className="App">

      <Container>
        <ResponsiveGridLayout
          className="layout"
          rowHeight={30}
          layouts={{
            lg: [
              { i: "a", x: 0, y: 0, w: 8, h: 5 },
              { i: "b", x: 8, y: 0, w: 8, h: 5 },
              { i: "c", x: 16, y: 0, w: 8, h: 5 },
              { i: "g", x: 0, y: 4, w: 16, h: 10 },
              { i: "d", x: 18, y: 4, w: 8, h: 10 },
              { i: "e", x: 0, y: 15, w: 12, h: 12 },
              { i: "f", x: 12, y: 12, w: 12, h: 12 },
            ],
            xs: [
              // { i: "a", x: 0, y: 0, w: 8, h: 5 },
              // { i: "b", x: 8, y: 0, w: 8, h: 5 },
              // { i: "c", x: 16, y: 0, w: 8, h: 5 },
              // { i: "g", x: 0, y: 4, w: 18, h: 10 },
              // { i: "d", x: 18, y: 4, w: 6, h: 10 },
              // { i: "e", x: 0, y: 15, w: 12, h: 12 },
              // { i: "f", x: 12, y: 12, w: 12, h: 12 },
            ],
          }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 24, md: 24, sm: 24, xs: 16, xxs: 8 }}
        >
          <MyDiv key="a">
            <DroneInfo />
          </MyDiv>
          <MyDiv key="b" >
            <Area />
          </MyDiv>
          <MyDiv key="c" >
            <FireDetection />
          </MyDiv>
          <MyDiv key="g" >
            <Map />
          </MyDiv>
          <MyDiv key="d" >
            <PotentialFiresite />
          </MyDiv>
          <MyDiv key="e">
            <AlertDrone />
          </MyDiv>
          <MyDiv key="f">
            <AlertEmergencyUnits />
          </MyDiv>
        </ResponsiveGridLayout>
      </Container>
    </div>
  );
};

export default Advanced;
