import { Alert } from "react-bootstrap"
import { TbCheck } from "react-icons/tb"

type OkType = {
    children: React.ReactNode
}

const OkAlert = ({ children }: OkType) => {
    return <Alert variant="success" className="shadow-sm border-0"><TbCheck /> {children}</Alert>
}

export default OkAlert;