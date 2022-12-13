import { Alert } from "react-bootstrap"
import { TbAlertTriangle } from "react-icons/tb"

type ErrorType = {
    children: React.ReactNode
}

const ErrorAlert = ({ children }: ErrorType) => {
    return <Alert variant="danger" className="shadow-sm border-0"><TbAlertTriangle /> {children}</Alert>
}

export default ErrorAlert;