import React, { useState, useEffect } from 'react';
import { LargeIcon } from './icon';
import { ImageUploader } from './icon_upload';
import UserInfoStyle from '../css/user_info.module.css';
import Modal from "react-modal";
import { client } from '../libs/axios';
import { GetToken, GetUserID } from '../shared/localStorage';

export const UserInfo = ({ iconUrl, userID, userName, userIntroduction, userIconFileName }) => {
    return (
        <div className={UserInfoStyle.userInfo}>
            <div className={UserInfoStyle.content}>
                <LargeIcon image={iconUrl} />
                <EditUserInfoBtn
                    showUserId={userID}
                    userName={userName}
                    userIntroduction={userIntroduction}
                    iconUrl={iconUrl}
                    userIconFileName={userIconFileName}
                />
                <div className={UserInfoStyle.userName}>{userName}</div>
                <div className={UserInfoStyle.introduction}>{userIntroduction}</div>
            </div>
        </div>
    )
}

const EditUserInfoBtn = ({ userName, userIntroduction, showUserId, iconUrl, userIconFileName }) => {
    const [isSelf, setIsSelf] = useState(false);
    const selfId = GetUserID();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [IconFileName, setIconFileName] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        setIconFileName(userIconFileName)
    }, [userIconFileName]);

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
        setIconFileName(childIcon)
        handleSaveButtonDisabled()
    }

    const fileUpload = async () => {
        const formData = new FormData();
        formData.append('file', IconFileName);
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
        const token = GetToken();
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
        if (username === '') {
            setIsDisabled(true)
            return
        }
        if (userIconFileName !== IconFileName) {
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
            return
        } else {
            try {
                updateUser(userIconFileName);
            } catch (error) {
                console.error('Error in handleClickUserInfo:', error);
            }
            return
        }
    };

    const handleClickUserInfoEdit = () => {
        setUsername(userName)
        setIntroduction(userIntroduction)
    }

    useEffect(() => {
        if (selfId === showUserId) {
            setIsSelf(true);
        } else {
            setIsSelf(false);
        }
    }, [selfId, showUserId]);

    const handleSaveButtonDisabled = () => {
        if (username !== '') {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }

    return (
        <div>
            {isSelf && (
                <div>
                    <button
                        className={UserInfoStyle.editUser}
                        onClick={() => {
                            setModalIsOpen(true); disableScroll(); handleClickUserInfoEdit();
                        }}>
                        プロフィールを編集
                    </button>
                    <div>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => { setModalIsOpen(false); enableScroll(); }}
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
                            <button
                                className={UserInfoStyle.modalClose}
                                onClick={() => {
                                    setModalIsOpen(false);
                                    enableScroll();
                                }}
                            >
                                &times;
                            </button>
                            <div className={UserInfoStyle.modalTitle}>プロフィールを編集</div>
                            <ImageUploader
                                iconUrl={iconUrl}
                                onImageChange={(file) => { handleIconChange(file) }}
                            />
                            <form>
                                <input
                                    className={UserInfoStyle.modalUsername}
                                    type="text"
                                    placeholder='ユーザ名'
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                                <br />
                                <div className={UserInfoStyle.isUsernameEmpty}>{isDisabled ? 'ユーザ名を入力してください' : ''}</div>
                                <textarea
                                    className={UserInfoStyle.modalIntroduction}
                                    placeholder='自己紹介'
                                    value={introduction}
                                    onChange={handleIntroductionChange}
                                />
                                <br />
                                <button
                                    disabled={isDisabled}
                                    onClick={(e) => handleClickUserInfo(e)}
                                    className={UserInfoStyle.modalBtn}
                                    type="submit"
                                >
                                    保存
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>
            )}
        </div>
    );
}