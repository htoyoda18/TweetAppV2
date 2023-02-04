import React from 'react'
import { SidebarData } from './sidebar_data'
import SidebarStyle from '../css/sidebar.module.css';

export default function sidebar() {
  let name = ""
  return (
    <div className={SidebarStyle.Sidebar}>
      <ul className={SidebarStyle.SidebarList}>
        {SidebarData.map((value, key) => {
          return (
            <li key={key}
              id={window.location.pathname === value.link ? name=SidebarStyle.active : name=SidebarStyle.row}
              className = {name}
              onClick={() => {
                window.location.pathname = value.link
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
