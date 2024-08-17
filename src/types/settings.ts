/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-15 23:10:35
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-16 10:52:12
 * @Description: settings.d.tst
 */
export type IMenuList = IMenuListItem[]

export interface IMenuListItem {
    name: string
    id: number
}

export interface IButtonBoundingClientPosition {
    button_height?: string
    button_top?: string
    button_bottom?: string
    button_left?: string
    button_right?: string
    button_width?: string
}