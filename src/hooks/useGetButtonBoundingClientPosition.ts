/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-16 08:24:14
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-17 10:29:55
 * @Description: 获取胶囊按钮的位置
 */
import { reactive } from "vue"
import type { IButtonBoundingClientPosition } from "../types/settings"

// 获取胶囊按钮的位置
export const useGetButtonBoundingClientPosition = (): IButtonBoundingClientPosition => {
    // 存储要使用的胶囊按钮的位置数据
    const buttonPositionData: IButtonBoundingClientPosition = reactive({
        button_height: '0px',
        button_top: '0px',
        button_bottom: '0px',
    })
    const { height, top, bottom, left, right, width } = uni.getStorageSync('buttonBoundingClientPosition')
    buttonPositionData.button_top = top + 'px' // 胶囊按钮的顶部距离页面顶部的距离
    buttonPositionData.button_bottom = bottom + 10 + 'px' // 胶囊按钮的底部距离页面顶部的距离
    buttonPositionData.button_height = height + 'px' // 胶囊按钮的高度

    return {
        button_height: buttonPositionData.button_height,
        button_top: buttonPositionData.button_top,
        button_bottom: buttonPositionData.button_bottom,
    }
}