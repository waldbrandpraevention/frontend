import LoadingSpinner from "../LoadingSpinner";
import Tile from "../Tile";

type LoadingTileProps = {
    className ?: string
}

const LoadingTile = (props: LoadingTileProps) => {
    return <Tile classes={props.className + "  align-items-center d-flex justify-content-center"}><LoadingSpinner size={32} /></Tile>
}
export default LoadingTile;