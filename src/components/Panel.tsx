import { useState } from "react"
import { Card } from "react-bootstrap";

/* visible attribute & children optional */
type PanelProps = { visible?: boolean, children?: React.ReactNode }

/* Boxen */
const Panel = (props: PanelProps) => {
    /* Kacheln sollen aktiviert/deaktivert werden können */
    const [visible, setVisible] = useState(props.visible ?? true);

    return <> {visible && <Card className="m-1">
        {props.children}
    </Card>}</>
}

export default Panel