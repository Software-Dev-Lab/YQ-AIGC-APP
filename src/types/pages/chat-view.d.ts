/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-17 12:17:06
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-17 21:58:41
 * @Description: chat-view.d.ts
 */
export interface IProblemDataItem {
    icon?: string
    title?: string
    description?: string
}

export type IProblemData = IProblemDataItem[]

export interface IGenerateStylesDataItem {
    icon?: string
    style?: string
    color?: string 
}

export type IGenerateStylesData = IGenerateStylesDataItem[]
