/*
 * @Author: ZRMYDYCG
 * @Date: 2024-09
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-09-07 21:53:16
 * @Description: 状态仓库（建立一个仓库即可）
 */

import { defineStore } from 'pinia'

// import { createCompletions } from '@/api/modules/zhipu'
import { StreamRequest } from '@/api/streamRequest'

interface IMessages {
    role: string // 角色
    content: string  // 内容
    finish_reason?: 'start' | 'stop' | 'tool_calls' | 'length' | 'sensitive' | 'network_error' // 模型推理终止的原因
    web_search?: any[] // 网络搜索结果
}

/**
 * 文生文
*/
export const useChatbotMessageStore = defineStore('chatbotMessageStore', {
    state: () => ({
        // {"role": "user", "content": "你好"},
        messages: [] as IMessages[]
    }),
    actions: {
        /**
         * @desc 处理服务器端大模型返回的数据
        */
       async handleText(objVal) {
           
        },
       /**
        * @desc 发送数据到服务器端
        * @param content 发送的内容
        * */
       async startSending(content: string) {
        this.messages.push({
            role: 'user',
            content: content,
        })
        this.messages.push({
            role: 'assistant',
            content: "",
            finish_reason: 'start',
            web_search: []
        })
       /**
        * stop代表推理自然结束或触发停止词。
        * tool_calls 代表模型命中函数。
        * length代表到达 tokens 长度上限。
        * sensitive 代表模型推理内容被安全审核接口拦截。请注意，针对此类内容，请用户自行判断并决定是否撤回已公开的内容。
        * network_error 代表模型推理异常。
       */
       try {
            const requestTask: any = await StreamRequest({ messages: this.messages })
            // 返回请求头信息
            requestTask.onHeadersReceived((e: any)=>{
                console.log(e);
            })
            
            // 成功回调 返回流传输信息 返回 arrayBuffer
            requestTask.onChunkReceived((response: any)=> {
                // 解析返回数据
                let arrayBuffer = response.data
                let string = ''
                const arrayBuffers = new Uint8Array(arrayBuffer)
                for (let i = 0; i < arrayBuffers.length; i++) {
                    // unicode字符
                     string += String.fromCharCode(arrayBuffers[i])
                }

                // 编码与解码
                let buffer = ''
                buffer += decodeURIComponent(encodeURIComponent(string))
                
                // 循环检查 buffer 里面是否包含换行符
                while(buffer.includes('\n')) {
                    const index = buffer.indexOf('\n')
                    const chunk = buffer.slice(0, index)
                    buffer = buffer.slice(index + 1)
                    // 判断以data:开头并且不含有data: [DONE]
                    if(chunk.startsWith('data: ') && !chunk.includes('[DONE]')){
                        const jsonData = JSON.parse(chunk.replace('data: ',''))
                        this.handleText(jsonData)
                    }
                }
            })
        } catch (err) {
            console.log(err);
        }
        },
    }
})
