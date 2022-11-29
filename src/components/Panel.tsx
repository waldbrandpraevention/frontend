import { useState } from "react"
import { Card } from "react-bootstrap";

type PanelProps = { visible?: boolean, children: React.ReactNode }

/* Boxen */
const Panel = (props: PanelProps) => {
    /* Kacheln sollen aktiviert/deaktivert werden können */
    const [visible, setVisible] = useState(props.visible || true);

    return <> {visible && <Card className="m-2">
        {props.children}
    </Card>}</>
}

export default Panel