import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ErrorAlert from "../alerts/ErrorAlert";
import LoadingSpinner from "../LoadingSpinner";
import Tile from "../Tile";

const WeatherForecast = () => {
    const { data, isLoading, isError } = useQuery(["weatherforecast"], () => {
        return axios.get("/test?input=Alles%20sonnig").then(e => e.data);
    });

    if (isLoading) return <Tile style={{ alignItems: "center" }}><LoadingSpinner /></Tile>

    if (isError) return <ErrorAlert> Wettervorhersage konnte nicht geladen werden.</ErrorAlert>;

    return <Tile >
        Wettervorhersage {data.message}
    </Tile>
}

export default WeatherForecast;