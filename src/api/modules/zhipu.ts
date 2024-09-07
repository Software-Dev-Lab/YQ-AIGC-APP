/*
 * @Author: ZRMYDYCG
 * @Date: 2024-09
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-09
 * @Description: 智谱 API
 */
import { http } from '../request'

/**
 * 文生文接口
 * */
export const createCompletions = (params: any) => {
    return http<any>({
        url: '/create-completions',
        method: 'POST',
        data: params,
        enableChunked: true,
    })
}