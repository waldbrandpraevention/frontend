import { FunctionComponent, useState } from "react"
import { Card } from "react-bootstrap";

type PanelProps = { visible?: boolean }

const Panel = (props: PanelProps) => {
    const [visible, setVisible] = useState(props.visible || false);

    return <> {visible && <Card className="m-2">
        <p>Lol</p>
    </Card>}</>
}

export default Panel