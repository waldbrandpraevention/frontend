import { Card } from "react-bootstrap";

type PanelProps = {
    children?: React.ReactNode,
    style?: React.CSSProperties,
    className?: string
}

/* Tile with body only (includes padding) */
const Tile = (props: PanelProps) => {
    return <Card body style={props.style} className={`my-1 shadow-sm border-0 ${props.className}`} >
        {props.children}
    </Card>
}

export default Tile;