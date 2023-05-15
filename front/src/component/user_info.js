import React, { useState, useEffect } from 'react'
import { LargeIcon } from '../component/icon'
import { ImageUploader } from '../component/icon_upload'
import UserInfoStyle from '../css/user_info.module.css';
import Modal from "react-modal";
import { client } from '../libs/axios'

export const UserInfo = (props) => {
  return (
    <div className={UserInfoStyle.userInfo}>
      <div className={UserInfoStyle.content}>
        <LargeIcon image={props.userIcon} />
        <EditUserInfoBtn showUserId={props.userID} userName={props.userName} userIntroduction={props.userIntroduction} iconUrl={props.userIcon} />
        <div className={UserInfoStyle.userName}>{props.userName}</div>
        <div className={UserInfoStyle.introduction}>{props.userIntroduction}</div>
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
  const [isDisabled, setIsDisabled] = useState(false);

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

  const fileUpload = async () => {
    const formData = new FormData();
    formData.append('file', icon);
    try {
      const response = await fetch('http://localhost:8080/v1/upload', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.fileName; // 返されたファイル名
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateUser = (uploadedIconName) => {
    const token = localStorage.getItem('token');
    const body = {
      icon: uploadedIconName,
      userName: username,
      introduction: introduction,
    };
    client
      .post('v1/user/update', body, { headers: { Authorization: token } })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("err", err)
      });
  };
  
  const handleClickUserInfo = async (event) => {
    event.preventDefault();
    try {
      const uploadedIconName = await fileUpload();
      if (uploadedIconName) {
        updateUser(uploadedIconName);
      } else {
        console.error('Failed to update user due to file upload error');
      }
    } catch (error) {
      console.error('Error in handleClickUserInfo:', error);
    }
  };

  const handleClickUserInfoEdit = () => {
    setUsername(props.userName)
    setIntroduction(props.userIntroduction)
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
    } else {
      setIsDisabled(true)
    }
  }

  return (
    <div>
      {isSelf && (
        <div>
          <button className={UserInfoStyle.editUser} onClick={() => { setModalIsOpen(true); disableScroll(); handleClickUserInfoEdit(); }}>
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
                iconUrl={props.iconUrl}
                onImageChange={(file) => { handleIconChange(file) }}
              />
              <form>
                <input className={UserInfoStyle.modalUsername} type="text" placeholder='ユーザ名' value={username} onChange={handleUsernameChange} />
                <br />
                <textarea className={UserInfoStyle.modalIntroduction} type="text" placeholder='自己紹介' value={introduction} onChange={handleIntroductionChange} />
                <br />
                <button disabled={isDisabled} onClick={(e) => handleClickUserInfo(e)} className={UserInfoStyle.modalBtn} type="submit">保存</button>
              </form>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}