import React, { useState } from 'react';
import sharedStyle from '../css/shared.module.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export const ImageUploader = (props) => {
    const [preview, setPreview] = useState(props.image);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            props.onImageChange(file);
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
            <img
                alt=''
                className={sharedStyle.largeIcon}
                src={preview}
                onClick={() => document.getElementById('fileInput').click()}
                style={{ cursor: 'pointer' }}
            />
            <CameraAltIcon
                onClick={() => document.getElementById('fileInput').click()}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    fontSize: 35,
                }}
            />
        </div>
    );
};

export default ImageUploader;
