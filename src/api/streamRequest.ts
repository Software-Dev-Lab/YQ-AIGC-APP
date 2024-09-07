export const StreamRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        const response = uni.request({
            url: 'http://192.168.80.45:3000/create-completions', // 请求地址
            method: "POST", // 你的请求方法
            data: data,
            enableChunked: true, // 开启流传输
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
