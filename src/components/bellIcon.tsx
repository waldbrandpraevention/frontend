import '../assets/styles/icon.css'
import { useState } from "react";
import { BiBell } from 'react-icons/bi'

type BellIconProps = { visible?: boolean }


const BellIcon = (props: BellIconProps) => {
    //console.log(visible)
    return <>
        <BiBell className='Icon Bell'> </BiBell>
        {(props.visible ?? true) && <div className='Icon Notification'></div>}
    </>


};
export default BellIcon