import React, { useState, useEffect } from 'react'
import { LargeIcon } from '../component/shared'
import { ImageUploader } from '../component/icon_upload'
import UserInfoStyle from '../css/user_info.module.css';
import Modal from "react-modal";

export const UserInfo = (props) => {
  return (
    <div className={UserInfoStyle.userInfo}>
      <div className={UserInfoStyle.content}>
        <LargeIcon image="https://d38vrblg2ltm93.cloudfront.net/res/wonder-fe/user_id_46268/work/2021/10/10/image/20211010235446.png" />
        <EditUserInfoBtn showUserId={props.userID} />
        <div className={UserInfoStyle.userName}>{props.userName}</div>
        <div className={UserInfoStyle.introduction}>自己紹介</div>
      </div>
    </div>
  )
}

const EditUserInfoBtn = (props) => {
  const [isSelf, setIsSelf] = useState(false);
  const selfId = parseInt(localStorage.getItem('userID'), 10);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [icon, setIcon] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    handleSaveButtonDisabled()
  }

  function handleIntroductionChange(event) {
    setIntroduction(event.target.value);
    handleSaveButtonDisabled()
  }

  function disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  function enableScroll() {
    document.body.style.overflow = 'auto';
  }

  const handleIconChange = (childIcon) => {
    setIcon(childIcon)
    handleSaveButtonDisabled()
  }

  const fileUpload = () => {
    const formData = new FormData();
    formData.append('file', icon);
    fetch('http://localhost:8080/v1/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
  }

  const updateUser = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/v1/user/update', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        icon: icon.name,
        userName: username,
        introduction: introduction,
      })
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleClickUserInfo = () => {
    handleSaveButtonDisabled()
    if (icon) {
      fileUpload()
      updateUser()
    }
  }

  useEffect(() => {
    if (selfId === props.showUserId) {
      setIsSelf(true);
    } else {
      setIsSelf(false);
    }
  }, [selfId, props.showUserId]);

  const handleSaveButtonDisabled = () => {
    if (icon && username !== '' && introduction !== '') {
      setIsDisabled(false)
    }
  }

  return (
    <div>
      {isSelf && (
        <div>
          <button className={UserInfoStyle.editUser} onClick={() => { setModalIsOpen(true); disableScroll(); }}>
            プロフィールを編集
          </button>
          <div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => { setModalIsOpen(false); enableScroll(); }}
              className={UserInfoStyle.modal}
              overlayClassName={UserInfoStyle.modalOverlay}
              style={{
                content: {
                  position: 'absolute',
                  top: '30%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                },
              }}
            >
              <button className={UserInfoStyle.modalClose} onClick={() => { setModalIsOpen(false); enableScroll(); }}>&times;</button>
              <div className={UserInfoStyle.modalTitle}>プロフィールを編集</div>
              <ImageUploader
                image="https://d38vrblg2ltm93.cloudfront.net/res/wonder-fe/user_id_46268/work/2021/10/10/image/20211010235446.png"
                onImageChange={(file) => { handleIconChange(file) }}
              />
              <form>
                <input className={UserInfoStyle.modalUsername} type="text" placeholder='ユーザ名' value={username} onChange={handleUsernameChange} />
                <br />
                <textarea className={UserInfoStyle.modalIntroduction} type="text" placeholder='自己紹介' value={introduction} onChange={handleIntroductionChange} />
                <br />
                <button disabled={isDisabled} onClick={handleClickUserInfo} className={UserInfoStyle.modalBtn} type="submit">保存</button>
              </form>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}