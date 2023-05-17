import React, { useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { LargeEditIcon } from "../component/icon"

export const ImageUploader = ({ iconUrl, onImageChange }) => {
    const [preview, setPreview] = useState(iconUrl);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onImageChange(file);
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                onInput={handleImageChange}
                style={{ display: 'none' }}
            />
            <LargeEditIcon
                image={preview}
                onClick={() => document.getElementById('fileInput').click()}
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
