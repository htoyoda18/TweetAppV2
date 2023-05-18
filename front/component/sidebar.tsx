import React from 'react'
import { SidebarData } from './sidebar_data'
import SidebarStyle from '../css/sidebar.module.css';
import { useRouter } from 'next/router'

export default function sidebar() {
    let name = ""
    const router = useRouter()
    const pathname = router.pathname
    return (
        <div className={SidebarStyle.Sidebar}>
            <div className={SidebarStyle.title}>TweetApp</div>
            <ul className={SidebarStyle.SidebarList}>
                {SidebarData.map((value, key) => {
                    return (
                        <li key={key}
                            id={pathname === value.link ? name = SidebarStyle.active : name = SidebarStyle.row}
                            className={name}
                            onClick={() => {
                                router.push(value.link)
                            }}>
                            <div id="icon">{value.icon}</div>
                            <div id="title">{value.title}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
