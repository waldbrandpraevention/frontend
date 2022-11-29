import { FunctionComponent } from "react"

type PanelProps = {
    children: React.ReactNode
}

const PanelLayout = (props: PanelProps) => {


    return <>
        
        {props.children}
    </>
}

export default PanelLayout