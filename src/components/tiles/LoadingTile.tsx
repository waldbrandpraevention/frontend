import LoadingSpinner from "../LoadingSpinner";
import Tile from "../Tile";

type LoadingTileProps = {
    className ?: string
}

const LoadingTile = (props: LoadingTileProps) => {
    return <Tile className={props.className} style={{ alignItems: "center" }}><LoadingSpinner /></Tile>
}
export default LoadingTile;