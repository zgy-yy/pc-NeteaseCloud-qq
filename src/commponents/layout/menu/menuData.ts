interface IMenu {
    name: string;
    key: string;
    icon: any;
    theme: 'outline' | 'filled' | 'two-tone' | 'multi-color',
}

interface IMenus {
    name: string,
    menus: IMenu[],
}

export const menus: IMenus[] = [
    {
        name: "在线音乐",
        menus: [
            {
                name: "推荐",
                key: "discover",
                icon: 'icon-yinxianghuanrao',
                theme: 'outline',
            },
            {
                name: "音乐馆",
                key: "music",
                icon: 'icon-yinlechuang',
                theme: 'outline',
            },
            {
                name: "视频",
                key: "video",
                icon: 'icon-luxiangyingpeng',
                theme: 'outline',
            },
            {
                name: "电台",
                key: "dj",
                icon: 'icon-shouyinji',
                theme: 'outline',
            },
        ]
    },
    {
        name: "我的音乐",
        menus: [
            {
                name: "我喜欢",
                key: "love",
                icon: 'icon-wendangwenjian',
                theme: 'outline',
            },
            {
                name: "本地歌曲",
                key: "local",
                icon: 'icon-diannao',
                theme: 'outline',
            },
            {
                name: "下载歌曲",
                key: "download",
                icon: 'icon-xiazaibendi',
                theme: 'outline',
            },
            {
                name: "最近播放",
                key: "recently",
                icon: 'icon-yinleyinxiang',
                theme: 'outline'
            },
        ]
    }
];
