import React from 'react'
import { LargeIcon } from '../component/shared'
import UserInfoStyle from '../css/user_info.module.css';

export const UserInfo = (props) => {
  return (
    <div className={UserInfoStyle.userInfo}>
      <div className={UserInfoStyle.content}>
        <LargeIcon image="https://d38vrblg2ltm93.cloudfront.net/res/wonder-fe/user_id_46268/work/2021/10/10/image/20211010235446.png" />
        <div className={UserInfoStyle.userName}>{props.userName}</div>
        <div className={UserInfoStyle.introduction}>自己紹介</div>
      </div>
    </div>
  )
}
