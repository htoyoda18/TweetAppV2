import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import TwitterIcon from '@mui/icons-material/Twitter';
import PersonIcon from '@mui/icons-material/Person';
import { GetUserID } from '../shared/localStorage'

let profileURL: string

if (typeof window !== 'undefined') {
    profileURL = "/user/" + GetUserID()
}

export const SidebarData = [
	{
		title: "ホーム",
		icon: <HomeIcon />,
		link: "/",
	},
	{
		title: "ツイートする",
		icon: <TwitterIcon />,
		link: "/tweet",
	},
	{
		title: "プロフィール",
		icon: <PersonIcon />,
		link: profileURL,
	},
]