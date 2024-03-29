import React, { useState, useEffect } from 'react';
import { LargeIcon } from './icon';
import { ImageUploader } from './icon_upload';
import UserInfoStyle from '../styles/user_info.module.css';
import Modal from "react-modal";
import { publicClient, privateClient } from '../api/client/axios';
import { GetSelfUserID } from '../shared/localStorage';
import { UserUpdateReqest } from '../api/type/user'

type UserInfoProps = {
    iconUrl: string;
    userID: number,
    userName: string,
    userIntroduction: string,
    userIconFileName: string,
};

export const UserInfo: React.FC<UserInfoProps> = ({ userID, userName, userIntroduction, userIconFileName, iconUrl }) => {
    return (
        <div className={UserInfoStyle.userInfo}>
            <div className={UserInfoStyle.content}>
                <LargeIcon image={iconUrl} />
                <EditUserInfoBtn
                    userID={userID}
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

const EditUserInfoBtn = ({ iconUrl, userID, userName, userIntroduction, userIconFileName }: UserInfoProps) => {
    const [isSelf, setIsSelf] = useState(false);
    const selfId = GetSelfUserID();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [IconFileName, setIconFileName] = useState('');
    const [IconFile, setIconFile] = useState<File>();
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        setIconFileName(userIconFileName)
    }, [userIconFileName]);

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setUsername(event.target.value);
        handleSaveButtonDisabled()
    }

    function handleIntroductionChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        setIntroduction(event.target.value);
        handleSaveButtonDisabled()
    }

    function disableScroll(): void {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll(): void {
        document.body.style.overflow = 'auto';
    }

    const handleIconChange = (childIcon: File): void => {
        setIconFileName(childIcon.name)
        setIconFile(childIcon)
        handleSaveButtonDisabled()
    }

    const fileUpload = async () => {
        const formData = new FormData();
        formData.append('file', IconFile);
        try {
            const response = await publicClient.post('/v1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                return response.data.fileName; // 返されたファイル名
            } else {
                throw new Error('File upload failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateUser = (uploadedIconName: string): void => {
        const body: UserUpdateReqest = {
            icon: uploadedIconName,
            userName: username,
            introduction: introduction,
        };
        privateClient
            .post('v1/user/update', body)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log("err", err)
            });
    };

    const handleClickUserInfo = async (event: React.MouseEvent<HTMLButtonElement>) => {
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

    const handleClickUserInfoEdit = (): void => {
        setUsername(userName)
        setIntroduction(userIntroduction)
    }

    useEffect(() => {
        if (selfId === userID) {
            setIsSelf(true);
        } else {
            setIsSelf(false);
        }
    }, [selfId, userID]);

    const handleSaveButtonDisabled = (): void => {
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