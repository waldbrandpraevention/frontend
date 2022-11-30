import { useState } from "react"
import { Card } from "react-bootstrap";

/* visible attribute & children optional */
type PanelProps = { visible?: boolean, children?: React.ReactNode }

/* Boxen */
const Panel = (props: PanelProps) => {
    /* Kacheln sollen aktiviert/deaktivert werden können */
    return <> {(props.visible ?? true) && <Card className="m-1">
        {props.children}
    </Card>}</>
}

export default Panel