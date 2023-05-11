import React, { useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { LargeIcon } from "../component/icon"

export const ImageUploader = (props) => {
    const [preview, setPreview] = useState(props.iconUrl);

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
                onInput={handleImageChange}
                style={{ display: 'none' }}
            />
            <LargeIcon
                image={preview}
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
