import Tile from "../Tile"

type PlaceholderProps = {
    name: string
}

const PlaceholderEditMode = ({ name }: PlaceholderProps) => {
    return <Tile style={{ background: "#e9ecef", userSelect: "none" }} classes="d-flex align-items-center justify-content-center flex-column text-center">
        <h2>{name}</h2>
        <span> <b>Kachel pausiert</b>, um Performance zu verbessern.</span>
        Deaktiviere den Bearbeiten-Modus um die Kachel anzuzeigen.
    </Tile>
}
export default PlaceholderEditMode