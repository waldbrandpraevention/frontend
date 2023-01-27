import { Container } from "react-bootstrap";
import IncidentOverview from "../components/tiles/IncidentOverview";

const Incidents = () => {
  return (
    <Container className="mt-4">
      <IncidentOverview></IncidentOverview>
    </Container >
  );
}

export default Incidents