import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";
import { TbInfoSquare } from "react-icons/tb";
import DangerLevel from "../DangerLevel";
import { useFirerisk } from "../../utils/zones";
import { useMapStore } from "../../stores/MapStore";

const Firerisk = () => {
  // const { /* data ,*/ isLoading, isError } = useQuery(["firerisk"], () => {
  //   return axios.get("/test?test_input=420").then((e) => e.data);
  // }, { refetchInterval });

  const zoneId = useMapStore(state => state.activeZone)
  const { data, isLoading, isError } = useFirerisk();

  if (isLoading) return <LoadingTile />;

  if (isError)
    return <ErrorAlert> Brandrisiko konnte nicht geladen werden.</ErrorAlert>;

  console.log(data)
  /*   get fire risk from zone data   */
  const fireRisk = zoneId !== -1 ? data.find(z => z.id === zoneId)?.dwd_fire_risk : 0;

  return (
    <Tile>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="icontooltip">
            Zeigt die Waldbrandgefahr des betrachteten Überwachungsgebietes in 5
            Gefahrenstufen an: 1 = sehr geringe Gefahr bis 5 = sehr hohe Gefahr.
          </Tooltip>
        }
      >
        <div style={{ float: "right" }}>
          <TbInfoSquare></TbInfoSquare>
        </div>
      </OverlayTrigger>
      <Card.Title className="text-center">Brandrisiko</Card.Title>
      <Card.Subtitle className="text-center">gemäß DWD Stufen</Card.Subtitle>
      <div
        className="mt-1"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DangerLevel level={fireRisk ?? -1} />
      </div>
    </Tile>
  );
};

export default Firerisk;
