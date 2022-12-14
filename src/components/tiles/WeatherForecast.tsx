import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import Tile from "../Tile";
import LoadingTile from "./LoadingTile";

const WeatherForecast = () => {
    const { data, isLoading, isError } = useQuery(["weatherforecast"], () => {
        return axios.get("/test?input=Alles%20sonnig").then(e => e.data);
    });

    if (isLoading) return <LoadingTile/>

    if (isError) return <ErrorAlert> Wettervorhersage konnte nicht geladen werden.</ErrorAlert>;

    return <Tile >
        Wettervorhersage {data.message}
    </Tile>
}

export default WeatherForecast;