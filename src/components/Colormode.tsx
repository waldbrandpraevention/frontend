import { useEffect, useState } from "react"
import { MdDarkMode, MdLightMode } from "react-icons/md"
import styled from "styled-components"
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
} from 'darkreader';

const DarkIcon = styled(MdDarkMode)`
    :hover {
        cursor: pointer
    }
`

const LightIcon = styled(MdLightMode)`
    :hover {
        cursor: pointer
    }
`

const Colormode = ({ iconDark = true }: { iconDark: boolean }) => {
    const [mode, setMode] = useState(localStorage.getItem("mode") ?? "light");

    const updateColor = () => {
        setMode(mode === "dark" ? "light" : "dark")
    }

    useEffect(() => {
        if (mode === "dark") enableDarkMode({ brightness: 100, contrast: 100, sepia: 0, }); else disableDarkMode();
        localStorage.setItem("mode", mode);
    }, [mode])

    return <>{mode === "dark" ?
        <DarkIcon size={"1.5em"} className={iconDark ? "text-dark" : "text-white"} onClick={updateColor} />
        : <LightIcon size={"1.5em"} className={iconDark ? "text-dark" : "text-white"} onClick={updateColor} />}</>
}

export default Colormode;