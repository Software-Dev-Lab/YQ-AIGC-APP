/*
 * @Author: ZRMYDYCG
 * @Date: 2024-09
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-09-28 13:50:09
 * @Description: 网络请求
 */
const baseURL = 'http://localhost:3000/'

type Data<T> = {
    code: string
    msg: string
    result: T
}
  
// 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
    // 返回 Promise 对象
    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({
            ...options,
            header: {},
            url: baseURL + options.url,
            success(res) {
                const status = res.statusCode
                if (typeof res.data === 'object' && res.data !== null) {
                switch (status) {
                    case 200:
                    console.log(res)
                    resolve(res.data as Data<T>)
                    break
                    case 404:
                    console.error('404 Not Found')
                    reject(new Error('404 Not Found'))
                    break
                    case 401:
                    console.error('401 Unauthorized')
                    reject(new Error('401 Unauthorized'))
                    break
                    case 400: // 提示开发者
                    console.error(res.data)
                    reject(new Error('400 Bad Request'))
                    break
                    case 422: // 提示用户
                    console.error('422 Bad Request')
                    uni.showToast({
                        icon: 'none',
                        title: (res.data as Data<T>).msg
                    }).then()
                    break
                    case 500:
                    case 501:
                    case 502:
                    case 503:
                    console.error('服务器错误')
                    uni.showToast({
                        icon: 'none',
                        title: '服务器错误, 请联系管理员'
                    }).then()
                    reject(new Error('出现异常'))
                    break
                }
                } else {
                    console.error('Invalid response data type')
                    reject(new Error('Invalid response data type'))
                }
            },
            fail(err) {
                reject(err)
            },
        })
    })
}
  