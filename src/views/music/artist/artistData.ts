
interface ArtistData{
    name: string,
    key: string,
    type:number
    list: {
        key: string ,
        name: string,
    }[]
}

export const artistData:ArtistData[] =  [
    {
        name: '语种',
        key: 'area',
        type:0,
        list: [
            {key: '-1', name: '全部'},
            {key: '7', name: '华语'},
            {key: '96', name: '欧美'},
            {key: '8', name: '日本'},
            {key: '16', name: '韩国'},
            {key: '0', name: '其他'},
        ]
    },
    {
        name: '分类',
        key: 'type',
        type:1,
        list: [
            {key: '-1', name: '所有'},
            {key: '1', name: '男歌手'},
            {key: '2', name: '女歌手'},
            {key: '3', name: '乐队组合'},
        ]
    },
    {
        name: '筛选',
        key: 'initial',
        type:2,
        list: [
            {key: "-1", name: '热门'},
            {key: 'a', name: 'A'},
            {key: 'b', name: 'B'},
            {key: 'c', name: 'C'},
            {key: 'd', name: 'D'},
            {key: 'e', name: 'E'},
            {key: 'f', name: 'F'},
            {key: 'g', name: 'G'},
            {key: 'h', name: 'H'},
            {key: 'i', name: 'I'},
            {key: 'j', name: 'J'},
            {key: 'k', name: 'K'},
            {key: 'l', name: 'L'},
            {key: 'm', name: 'M'},
            {key: 'n', name: 'N'},
            {key: 'o', name: 'O'},
            {key: 'p', name: 'P'},
            {key: 'q', name: 'Q'},
            {key: 'r', name: 'R'},
            {key: 's', name: 'S'},
            {key: 't', name: 'T'},
            {key: 'u', name: 'U'},
            {key: 'v', name: 'V'},
            {key: 'w', name: 'W'},
            {key: 'x', name: 'X'},
            {key: 'y', name: 'Y'},
            {key: 'z', name: 'Z'},
            {key: '#', name: '#'},
        ]
    },
]