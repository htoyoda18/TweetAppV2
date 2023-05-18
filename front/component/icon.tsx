import React from 'react';
import sharedStyle from '../css/shared.module.css';

const isIcon = (icon: string) => {
    if (icon) {
        return icon
    }

    return 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
}

type IconProps = {
	image: string;
    userID: number
};

export const Icon = ({ image, userID }: IconProps) => {
    const iconUrl = isIcon(image)
    return (
        <a className={sharedStyle.userLink} href={"/user/" + userID}>
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

export const LargeIcon = ({ image }: ImageProps) => {
    const iconUrl = isIcon(image)
    return (
        <img
            className={sharedStyle.largeIcon}
            src={iconUrl} alt=""
        />
    )
}

export const LargeEditIcon = ({ image }: ImageProps) => {
    const iconUrl = isIcon(image)
    return (
        <img
            className={sharedStyle.largeIcon}
            src={iconUrl} alt=""
            style={{ cursor: 'pointer' }}
        />
    )
}

export const GetMimeTypeFromImageData = (data: File) => {
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

export const GenerateImageUrl = (image: File) => {
    const mimeType = GetMimeTypeFromImageData(image);
    const blob = new Blob([image], { type: mimeType });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl
}