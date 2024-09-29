/*
 * @Author: ZRMYDYCG
 * @Date: 2024-09
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-09-29 22:53:21
 * @Description: 状态仓库（建立一个仓库即可）
 */
import { defineStore } from 'pinia'
import { StreamRequest } from '@/api/streamRequest'
// import { createCompletions } from '@/api/modules/zhipu'
import 'fast-text-encoding'

interface IMessages {
    role: string // 角色
    content: string  // 内容
    finish_reason?: 'start' | 'stop' | 'tool_calls' | 'length' | 'sensitive' | 'network_error' | 'respond' // 模型推理终止的原因
    web_search?: any[] // 网络搜索结果
}

/**
 * 文生文
 */
export const useChatbotMessageStore = defineStore('chatbotMessageStore', {
    state: () => ({
        messages: [] as IMessages[],  // 存储聊天记录
        receiveText: '' as string, // 接收到大模型返回的文本
        inProgress: false, // 是否正在推理中
    }),
    actions: {
        /**
         * @desc 处理服务器端大模型返回的数据
         */
        async handleText(objVal: any) {
            // 服务器开始响应
            this.messages[this.messages.length - 1].finish_reason = 'respond'
            // 将大模型返回的文本追加到 receiveText 中
            this.receiveText += objVal.choices[0].delta.content
            // 把文本追加到大模型的回复中
            this.messages[this.messages.length - 1].content = this.receiveText || ''
            // 判断是否回复完毕
            if (objVal.choices[0].finish_reason) {
                // 存储状态
                this.messages[this.messages.length - 1].finish_reason = objVal.choices[0].finish_reason
                // 存储网络搜索结果
                this.messages[this.messages.length - 1].web_search = objVal.web_search ? objVal.web_search : []
                // 如果回复异常
                const condition = [
                    { type: 'length', content: '到达token上限,请重新开启新会话' },
                    { type: 'sensitive', content: '非常抱歉，我目前无法提供你需要的具体信息' },
                    { type: 'network_error', content: '推理异常，我或许出现了一些问题，你可以重新尝试' },
                ]
                condition.forEach(item => {
                    if (objVal.choices[0].finish_reason === item.type) {
                        this.messages[this.messages.length - 1].content = item.content
                    }
                })
                // 状态流转
                this.inProgress = false
            }
        },
        /**
         * @desc 发送数据到服务器端
         * @param content 发送的内容
         * */
        async startSending(content: string) {
            // 清空上一次的返回结果
            this.receiveText = ''
            // 存储发送的内容
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
            // 处于对话中
            this.inProgress = true
            try {
                const requestTask: any = await StreamRequest({ messages: this.messages })

                // 成功回调 返回流传输信息 返回 arrayBuffer
                requestTask.onChunkReceived((response: any) => {
                    const arrayBuffer: ArrayBuffer = response.data;

                    const decoder = new Uint8Array(arrayBuffer);
                    let string = ''
                    for (let i = 0; i < decoder.length; i++) {  
                        string += String.fromCharCode(decoder[i]);
                    }
                    let buffer = ''
                    buffer += decodeURIComponent(escape(string))
                    
                    // 循环检查 buffer 里面是否包含换行符
                    while (buffer.includes('\n')) {
                        const index = buffer.indexOf('\n');
                        const chunk = buffer.slice(0, index);
                        buffer = buffer.slice(index + 1);

                        // 判断以data:开头并且不含有data: [DONE]
                        if (chunk.startsWith('data: ') && !chunk.includes('[DONE]')) {
                            const jsonString = chunk.replace('data:', '').trim(); // 处理 chunk

                            // 尝试解析 JSON，捕获解析错误
                            try {
                                const jsonData = JSON.parse(jsonString);
                                this.handleText(jsonData);
                            } catch (jsonError) {
                                console.error('JSON 解析错误:', jsonError, '原始数据:', jsonString);
                            }
                        }
                    }
                })
            } catch (err) {
                this.messages[this.messages.length - 1].finish_reason = 'stop'
                this.messages[this.messages.length - 1].content = '回复异常，我或许出现了一些问题，你可以重新尝试'
                // 状态流转
                this.inProgress = false
                console.log(err);
            }
        },
    }
})
