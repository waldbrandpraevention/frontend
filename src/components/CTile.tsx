import { Card } from "react-bootstrap";

type PanelProps = {
    children?: React.ReactNode,
    style?: React.CSSProperties,
    className ?: string
}

/* Tiles without padding */
const CTile = (props: PanelProps) => {
    return <Card style={props.style} className={`my-1 shadow-sm border-0 ${props.className}`} >
        {props.children}
    </Card>
}

export default CTile