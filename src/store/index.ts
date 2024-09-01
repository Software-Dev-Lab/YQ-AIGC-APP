/*
 * @Author: ZRMYDYCG
 * @Date: 2024-09
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-09
 * @Description: 状态仓库（建立一个仓库即可）
 */

import { defineStore } from 'pinia'
// stop代表推理自然结束或触发停止词。
// tool_calls 代表模型命中函数。
// length代表到达 tokens 长度上限。
// sensitive 代表模型推理内容被安全审核接口拦截。请注意，针对此类内容，请用户自行判断并决定是否撤回已公开的内容。
// network_error 代表模型推理异常。
interface IMessages {
    role: string // 角色
    content: string  // 内容
    finish_reason?: 'start' | 'stop' | 'tool_calls' | 'length' | 'sensitive' | 'network_error' // 模型推理终止的原因
    web_search?: any[] // 网络搜索结果
}

/**
 * 文生文
*/
export const useChatbotMessage = defineStore('chatbotMessageStore', {
    state: () => ({
        // {"role": "user", "content": "你好"},
        messages: [] as IMessages[]
    }),
    actions: {
        /**
         * @desc 处理服务器端大模型返回的数据
        */
       async handleText() {},
       /**
        * @desc 发送数据到服务器端
        * @param content 发送的内容
        * */
       async startSending(content: IMessages) {
        this.messages.push({
            role: 'user',
            content: content.content,
        })
        this.messages.push({
            role: 'assistant',
            content: "",
            finish_reason: 'start',
            web_search: []
        })
       }
    }
})
