import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import TwitterIcon from '@mui/icons-material/Twitter';
import SettingsIcon from '@mui/icons-material/Settings';

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
		title: "詳細設定",
		icon: <SettingsIcon />,
		link: "/settings",
	},
]
