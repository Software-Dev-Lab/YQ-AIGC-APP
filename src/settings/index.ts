/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-15 23:05:45
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-17 22:02:44
 * @Description: 项目配置
 */
import type { IMenuList } from '@/types/settings'
import type { IGenerateStylesData } from '@/types/pages/chat-view'

export const menuList: IMenuList = [
    {
        name: '我的',
        id: 0,
    },
    {
        name: '对话',
        id: 1
    },
    {
        name: 'AI会话',
        id: 2
    }
]

export const generateStylesData: IGenerateStylesData = [
    {
        icon:'/static/fengge/001.png',
        style:'无风格',
        color:'#1F9BE5',
    },
    {
        icon:'/static/fengge/002.png',
        style:'动漫风格',
        color:'#4F965E'
    },
    {
        icon:'/static/fengge/003.png',
        style:'写实',
        color:'#93726F'
    },
    {
        icon:'/static/fengge/004.jpg',
        style:'Q版简绘',
        color:'#204251'
    },
    {
        icon:'/static/fengge/005.png',
        style:'治愈男生',
        color:'#656565'
    },
    {
        icon:'/static/fengge/006.png',
        style:'治愈女生',
        color:'#D49D7D'
    },
    {
        icon:'/static/fengge/007.png',
        style:'卡通手绘',
        color:'#ff9999'
    },
    {
        icon:'/static/fengge/008.png',
        style:'复古动漫',
        color:'#ffcc66'
    },
    {
        icon:'/static/fengge/009.png',
        style:'港风胶片',
        color:'#cc3300'
    }
]