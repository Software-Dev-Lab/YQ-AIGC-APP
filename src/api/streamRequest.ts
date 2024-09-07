export const StreamRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        const response = uni.request({
            url: 'http://192.168.220.45:3000/create-completions', // 请求地址
            method: "POST",
            data: data,
            enableChunked: true, // 开启分片模式
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
        })
        // 返回请求的响应
        resolve(response)
    })
}
