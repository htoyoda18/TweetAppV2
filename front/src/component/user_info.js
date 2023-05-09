import React, { useState, useEffect } from 'react'
import { LargeIcon } from '../component/shared'
import UserInfoStyle from '../css/user_info.module.css';

export const UserInfo = (props) => {
  return (
    <div className={UserInfoStyle.userInfo}>
      <div className={UserInfoStyle.content}>
        <LargeIcon image="https://d38vrblg2ltm93.cloudfront.net/res/wonder-fe/user_id_46268/work/2021/10/10/image/20211010235446.png" />
        <EditUserInfoBtn showUserId={props.userID}/>
        <div className={UserInfoStyle.userName}>{props.userName}</div>
        <div className={UserInfoStyle.introduction}>自己紹介</div>
      </div>
    </div>
  )
}

const EditUserInfoBtn = (showUserId) => {
  const [isSelf, setIsSelf] = useState(false);
  const selfId =  parseInt(localStorage.getItem('userID'), 10);
  useEffect(() => {
    if (selfId === showUserId.showUserId) {
      setIsSelf(true);
    } else {
      setIsSelf(false);
    }
  }, [selfId, showUserId]);

  return (
    <div>
      {isSelf && (
        <button className={UserInfoStyle.editUser} onClick={() => { /* プロフィール編集処理 */ }}>
          プロフィールを編集
        </button>
      )}
    </div>
  );
}