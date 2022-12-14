import { Alert } from "react-bootstrap"
import { TbAlertOctagon } from "react-icons/tb"

type ErrorType = {
    children: React.ReactNode
}

const ErrorAlert = ({ children }: ErrorType) => {
    return <Alert variant="danger" className="shadow-sm border-0"><TbAlertOctagon /> {children}</Alert>
}

export default ErrorAlert;