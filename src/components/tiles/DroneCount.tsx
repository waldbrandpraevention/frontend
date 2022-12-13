import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Tile from "../Tile";

const DroneCount = () => {
    const { data, isLoading, isError } = useQuery(["dronecount"], () => {
        return axios.get("/test?input=69").then(e => e.data);
    });

    return <Tile>
        {isLoading ? <>Laden... coole lade animation hier</>
            : isError ? <>Etwas ist schiefgelaufen :/</>
                : <>Anzahl Drohnen {data.message}</>}
    </Tile>
}

export default DroneCount;