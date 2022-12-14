import { Alert } from "react-bootstrap"
import { TbAlertTriangle } from "react-icons/tb"

type WarningType = {
    children: React.ReactNode
}

const WarnAlert = ({ children }: WarningType) => {
    return <Alert variant="warning" className="shadow-sm border-0"><TbAlertTriangle /> {children}</Alert>
}

export default WarnAlert;