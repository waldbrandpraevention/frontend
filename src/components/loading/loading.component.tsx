import React from 'react'

import style from './loading.module.scss'
import Logo from "../../assets/img/Logo"

export default function Loading() {
    return (
        <div className={style.loading}>
            <Logo />
        </div>
    )
}
