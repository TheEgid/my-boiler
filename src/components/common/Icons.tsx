import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import {
    faFontAwesomeFlag,
    faFolderPlus,
    faPencilAlt,
    faTrashAlt,
    faEye,
    faEyeSlash,
    faEnvelopeOpenText,
    faHomeLgAlt,
    faBookBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTelegramPlane } from "@fortawesome/free-brands-svg-icons";

export const HomeUserIcon = (icon: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon={faHomeLgAlt} {...icon} />
);

export const BookIcon = (icon: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon={faBookBookmark} {...icon} />
);

export const InstIcon = (icon: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon={faInstagram} {...icon} />
);

export const FlagIcon = (icon: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon={faFontAwesomeFlag} {...icon} />
);

export const TelegaIcon = (icon: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon={faTelegramPlane} {...icon} />
);

export const EyeSlashIcon = (icon: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon={faEyeSlash} {...icon} />
);

export const EyeIcon = (icon: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon={faEye} {...icon} />
);

export const MailBoxIcon = (icon: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon={faEnvelopeOpenText} {...icon} />
);

export const FolderIcon = (icon: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon={faFolderPlus} {...icon} />
);

export const PenIcon = (icon: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon={faPencilAlt} {...icon} />
);

export const TrashIcon = (icon: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon={faTrashAlt} {...icon} />
);
