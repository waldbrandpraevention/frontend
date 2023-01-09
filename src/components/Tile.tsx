import { Card } from "react-bootstrap";

type PanelProps = {
    children?: React.ReactNode,
    style?: React.CSSProperties,
    classes?: string
}

/* Tile with body only (includes padding) */
const Tile = (props: PanelProps) => {
    return <Card style={{ ...props.style, ...{ width: "100%", height: "100%" } }} className={`my-1 shadow-sm border-0`} >
        <Card.Body className={`${props.classes}`}>
            {props.children}
        </Card.Body>
    </Card>
}

export default Tile;