export const StreamRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        const response = uni.request({
            url: 'http://localhost:3000/create-completions', // 请求地址
            method: "POST",
            data: data,
            enableChunked: true, // 开启分片模式
            header: {
                "Accept": 'text/event-stream',
                "Content-Type": "application/json;charset=UTF-8;",
            },
            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            },
        })
        // 返回请求的响应
        resolve(response)
    })
}
