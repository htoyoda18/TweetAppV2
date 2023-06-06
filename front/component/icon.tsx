import React from 'react';
import sharedStyle from '../css/shared.module.css';
import { url } from '../shared/url'

const isIcon = (icon: string) => {
    if (icon) {
        return icon
    }

    return url.IconNotFound
}

type IconProps = {
    image: string;
    userID: number
};

export const Icon: React.FC<IconProps> = ({ image, userID }) => {
    const iconUrl = isIcon(image)
    return (
        <a className={sharedStyle.userLink} href={`/user/${userID}`}>
            <img
                className={sharedStyle.icon}
                src={iconUrl}
                alt=""
            />
        </a>
    )
}

type ImageProps = {
    image: string;
};

export const LargeIcon: React.FC<ImageProps> = ({ image }) => {
    const iconUrl = isIcon(image)
    return (
        <img
            className={sharedStyle.largeIcon}
            src={iconUrl} alt=""
        />
    )
}

export const LargeEditIcon: React.FC<ImageProps> = ({ image }) => {
    const iconUrl = isIcon(image)
    return (
        <img
            className={sharedStyle.largeIcon}
            src={iconUrl} alt=""
            style={{ cursor: 'pointer' }}
        />
    )
}

export const GetMimeTypeFromImageData = (data: ArrayBuffer) => {
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

export const GenerateImageUrl = (image: ArrayBuffer) => {
    const mimeType = GetMimeTypeFromImageData(image);
    const blob = new Blob([image], { type: mimeType });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl
}