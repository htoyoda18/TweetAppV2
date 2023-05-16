import React from 'react';
import sharedStyle from '../css/shared.module.css';

const isIcon = (icon) => {
    if (icon) {
        return icon
    }

    return 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
}

export const Icon = ({ image, userID }) => {
    const iconUrl = isIcon(image)
    return (
        <a className={sharedStyle.userLink} href={"/user/" + userID}>
            <img className={sharedStyle.icon} src={iconUrl} alt="" />
        </a>
    )
}

export const LargeIcon = ({ image }) => {
    const iconUrl = isIcon(image)
    return (
        <img className={sharedStyle.largeIcon} src={iconUrl} alt="" />
    )
}

export const GetMimeTypeFromImageData = (data) => {
    const firstByte = data[0];
    switch (firstByte) {
        case 0xff:
            return 'image/jpeg';
        case 0x89:
            return 'image/png';
        case 0x47:
            return 'image/gif';
        case 0x42:
            return 'image/bmp';
        case 0x49:
        case 0x4d:
            return 'image/tiff';
        default:
            return 'application/octet-stream';
    }
}

export const GenerateImageUrl = (image) => {
    const mimeType = GetMimeTypeFromImageData(image);
    const blob = new Blob([image], { type: mimeType });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl
}